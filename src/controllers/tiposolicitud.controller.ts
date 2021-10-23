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
import {Tiposolicitud} from '../models';
import {TiposolicitudRepository} from '../repositories';

export class TiposolicitudController {
  constructor(
    @repository(TiposolicitudRepository)
    public tiposolicitudRepository : TiposolicitudRepository,
  ) {}

  @post('/tiposolicitudes')
  @response(200, {
    description: 'Tiposolicitud model instance',
    content: {'application/json': {schema: getModelSchemaRef(Tiposolicitud)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tiposolicitud, {
            title: 'NewTiposolicitud',
            exclude: ['id'],
          }),
        },
      },
    })
    tiposolicitud: Omit<Tiposolicitud, 'id'>,
  ): Promise<Tiposolicitud> {
    return this.tiposolicitudRepository.create(tiposolicitud);
  }

  @get('/tiposolicitudes/count')
  @response(200, {
    description: 'Tiposolicitud model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Tiposolicitud) where?: Where<Tiposolicitud>,
  ): Promise<Count> {
    return this.tiposolicitudRepository.count(where);
  }

  @get('/tiposolicitudes')
  @response(200, {
    description: 'Array of Tiposolicitud model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Tiposolicitud, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Tiposolicitud) filter?: Filter<Tiposolicitud>,
  ): Promise<Tiposolicitud[]> {
    return this.tiposolicitudRepository.find(filter);
  }

  @patch('/tiposolicitudes')
  @response(200, {
    description: 'Tiposolicitud PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tiposolicitud, {partial: true}),
        },
      },
    })
    tiposolicitud: Tiposolicitud,
    @param.where(Tiposolicitud) where?: Where<Tiposolicitud>,
  ): Promise<Count> {
    return this.tiposolicitudRepository.updateAll(tiposolicitud, where);
  }

  @get('/tiposolicitudes/{id}')
  @response(200, {
    description: 'Tiposolicitud model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Tiposolicitud, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Tiposolicitud, {exclude: 'where'}) filter?: FilterExcludingWhere<Tiposolicitud>
  ): Promise<Tiposolicitud> {
    return this.tiposolicitudRepository.findById(id, filter);
  }

  @patch('/tiposolicitudes/{id}')
  @response(204, {
    description: 'Tiposolicitud PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tiposolicitud, {partial: true}),
        },
      },
    })
    tiposolicitud: Tiposolicitud,
  ): Promise<void> {
    await this.tiposolicitudRepository.updateById(id, tiposolicitud);
  }

  @put('/tiposolicitudes/{id}')
  @response(204, {
    description: 'Tiposolicitud PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() tiposolicitud: Tiposolicitud,
  ): Promise<void> {
    await this.tiposolicitudRepository.replaceById(id, tiposolicitud);
  }

  @del('/tiposolicitudes/{id}')
  @response(204, {
    description: 'Tiposolicitud DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.tiposolicitudRepository.deleteById(id);
  }
}
