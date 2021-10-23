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
import {Areainvestigacion} from '../models';
import {AreainvestigacionRepository} from '../repositories';

export class AreaInvestigacionController {
  constructor(
    @repository(AreainvestigacionRepository)
    public areainvestigacionRepository : AreainvestigacionRepository,
  ) {}

  @post('/areainvestigaciones')
  @response(200, {
    description: 'Areainvestigacion model instance',
    content: {'application/json': {schema: getModelSchemaRef(Areainvestigacion)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Areainvestigacion, {
            title: 'NewAreainvestigacion',
            exclude: ['id'],
          }),
        },
      },
    })
    areainvestigacion: Omit<Areainvestigacion, 'id'>,
  ): Promise<Areainvestigacion> {
    return this.areainvestigacionRepository.create(areainvestigacion);
  }

  @get('/areainvestigaciones/count')
  @response(200, {
    description: 'Areainvestigacion model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Areainvestigacion) where?: Where<Areainvestigacion>,
  ): Promise<Count> {
    return this.areainvestigacionRepository.count(where);
  }

  @get('/areainvestigaciones')
  @response(200, {
    description: 'Array of Areainvestigacion model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Areainvestigacion, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Areainvestigacion) filter?: Filter<Areainvestigacion>,
  ): Promise<Areainvestigacion[]> {
    return this.areainvestigacionRepository.find(filter);
  }

  @patch('/areainvestigaciones')
  @response(200, {
    description: 'Areainvestigacion PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Areainvestigacion, {partial: true}),
        },
      },
    })
    areainvestigacion: Areainvestigacion,
    @param.where(Areainvestigacion) where?: Where<Areainvestigacion>,
  ): Promise<Count> {
    return this.areainvestigacionRepository.updateAll(areainvestigacion, where);
  }

  @get('/areainvestigaciones/{id}')
  @response(200, {
    description: 'Areainvestigacion model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Areainvestigacion, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Areainvestigacion, {exclude: 'where'}) filter?: FilterExcludingWhere<Areainvestigacion>
  ): Promise<Areainvestigacion> {
    return this.areainvestigacionRepository.findById(id, filter);
  }

  @patch('/areainvestigaciones/{id}')
  @response(204, {
    description: 'Areainvestigacion PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Areainvestigacion, {partial: true}),
        },
      },
    })
    areainvestigacion: Areainvestigacion,
  ): Promise<void> {
    await this.areainvestigacionRepository.updateById(id, areainvestigacion);
  }

  @put('/areainvestigaciones/{id}')
  @response(204, {
    description: 'Areainvestigacion PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() areainvestigacion: Areainvestigacion,
  ): Promise<void> {
    await this.areainvestigacionRepository.replaceById(id, areainvestigacion);
  }

  @del('/areainvestigaciones/{id}')
  @response(204, {
    description: 'Areainvestigacion DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.areainvestigacionRepository.deleteById(id);
  }
}
