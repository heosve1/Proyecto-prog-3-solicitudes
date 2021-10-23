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
import {Evaluacionsolicitud} from '../models';
import {EvaluacionsolicitudRepository} from '../repositories';

export class EvaluacionSolicitudController {
  constructor(
    @repository(EvaluacionsolicitudRepository)
    public evaluacionsolicitudRepository : EvaluacionsolicitudRepository,
  ) {}

  @post('/evaluacionsolicitudes')
  @response(200, {
    description: 'Evaluacionsolicitud model instance',
    content: {'application/json': {schema: getModelSchemaRef(Evaluacionsolicitud)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Evaluacionsolicitud, {
            title: 'NewEvaluacionsolicitud',
            exclude: ['id'],
          }),
        },
      },
    })
    evaluacionsolicitud: Omit<Evaluacionsolicitud, 'id'>,
  ): Promise<Evaluacionsolicitud> {
    return this.evaluacionsolicitudRepository.create(evaluacionsolicitud);
  }

  @get('/evaluacionsolicitudes/count')
  @response(200, {
    description: 'Evaluacionsolicitud model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Evaluacionsolicitud) where?: Where<Evaluacionsolicitud>,
  ): Promise<Count> {
    return this.evaluacionsolicitudRepository.count(where);
  }

  @get('/evaluacionsolicitudes')
  @response(200, {
    description: 'Array of Evaluacionsolicitud model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Evaluacionsolicitud, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Evaluacionsolicitud) filter?: Filter<Evaluacionsolicitud>,
  ): Promise<Evaluacionsolicitud[]> {
    return this.evaluacionsolicitudRepository.find(filter);
  }

  @patch('/evaluacionsolicitudes')
  @response(200, {
    description: 'Evaluacionsolicitud PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Evaluacionsolicitud, {partial: true}),
        },
      },
    })
    evaluacionsolicitud: Evaluacionsolicitud,
    @param.where(Evaluacionsolicitud) where?: Where<Evaluacionsolicitud>,
  ): Promise<Count> {
    return this.evaluacionsolicitudRepository.updateAll(evaluacionsolicitud, where);
  }

  @get('/evaluacionsolicitudes/{id}')
  @response(200, {
    description: 'Evaluacionsolicitud model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Evaluacionsolicitud, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Evaluacionsolicitud, {exclude: 'where'}) filter?: FilterExcludingWhere<Evaluacionsolicitud>
  ): Promise<Evaluacionsolicitud> {
    return this.evaluacionsolicitudRepository.findById(id, filter);
  }

  @patch('/evaluacionsolicitudes/{id}')
  @response(204, {
    description: 'Evaluacionsolicitud PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Evaluacionsolicitud, {partial: true}),
        },
      },
    })
    evaluacionsolicitud: Evaluacionsolicitud,
  ): Promise<void> {
    await this.evaluacionsolicitudRepository.updateById(id, evaluacionsolicitud);
  }

  @put('/evaluacionsolicitudes/{id}')
  @response(204, {
    description: 'Evaluacionsolicitud PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() evaluacionsolicitud: Evaluacionsolicitud,
  ): Promise<void> {
    await this.evaluacionsolicitudRepository.replaceById(id, evaluacionsolicitud);
  }

  @del('/evaluacionsolicitudes/{id}')
  @response(204, {
    description: 'Evaluacionsolicitud DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.evaluacionsolicitudRepository.deleteById(id);
  }
}
