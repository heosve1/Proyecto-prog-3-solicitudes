import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Tipovinculacion} from '../models';
import {TipovinculacionRepository} from '../repositories';

export class TipovinculacionController {
  constructor(
    @repository(TipovinculacionRepository)
    public tipovinculacionRepository : TipovinculacionRepository,
  ) {}

  @post('/tipovinculaciones')
  @response(200, {
    description: 'Tipovinculacion model instance',
    content: {'application/json': {schema: getModelSchemaRef(Tipovinculacion)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tipovinculacion, {
            title: 'NewTipovinculacion',
            exclude: ['id'],
          }),
        },
      },
    })
    tipovinculacion: Omit<Tipovinculacion, 'id'>,
  ): Promise<Tipovinculacion> {
    return this.tipovinculacionRepository.create(tipovinculacion);
  }

  @get('/tipovinculaciones/count')
  @response(200, {
    description: 'Tipovinculacion model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Tipovinculacion) where?: Where<Tipovinculacion>,
  ): Promise<Count> {
    return this.tipovinculacionRepository.count(where);
  }

  @get('/tipovinculaciones')
  @response(200, {
    description: 'Array of Tipovinculacion model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Tipovinculacion, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Tipovinculacion) filter?: Filter<Tipovinculacion>,
  ): Promise<Tipovinculacion[]> {
    return this.tipovinculacionRepository.find(filter);
  }

  @patch('/tipovinculaciones')
  @response(200, {
    description: 'Tipovinculacion PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tipovinculacion, {partial: true}),
        },
      },
    })
    tipovinculacion: Tipovinculacion,
    @param.where(Tipovinculacion) where?: Where<Tipovinculacion>,
  ): Promise<Count> {
    return this.tipovinculacionRepository.updateAll(tipovinculacion, where);
  }

  @get('/tipovinculaciones/{id}')
  @response(200, {
    description: 'Tipovinculacion model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Tipovinculacion, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Tipovinculacion, {exclude: 'where'}) filter?: FilterExcludingWhere<Tipovinculacion>
  ): Promise<Tipovinculacion> {
    return this.tipovinculacionRepository.findById(id, filter);
  }

  @patch('/tipovinculaciones/{id}')
  @response(204, {
    description: 'Tipovinculacion PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tipovinculacion, {partial: true}),
        },
      },
    })
    tipovinculacion: Tipovinculacion,
  ): Promise<void> {
    await this.tipovinculacionRepository.updateById(id, tipovinculacion);
  }

  @put('/tipovinculaciones/{id}')
  @response(204, {
    description: 'Tipovinculacion PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() tipovinculacion: Tipovinculacion,
  ): Promise<void> {
    await this.tipovinculacionRepository.replaceById(id, tipovinculacion);
  }

  @del('/tipovinculaciones/{id}')
  @response(204, {
    description: 'Tipovinculacion DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.tipovinculacionRepository.deleteById(id);
  }
}
