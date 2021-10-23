import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
  import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
Jurado,
JuradoInvestigacion,
Areainvestigacion,
} from '../models';
import {JuradoRepository} from '../repositories';

export class JuradoAreainvestigacionController {
  constructor(
    @repository(JuradoRepository) protected juradoRepository: JuradoRepository,
  ) { }

  @get('/jurados/{id}/areainvestigacions', {
    responses: {
      '200': {
        description: 'Array of Jurado has many Areainvestigacion through JuradoInvestigacion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Areainvestigacion)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Areainvestigacion>,
  ): Promise<Areainvestigacion[]> {
    return this.juradoRepository.areainvestigaciones(id).find(filter);
  }

  @post('/jurados/{id}/areainvestigacions', {
    responses: {
      '200': {
        description: 'create a Areainvestigacion model instance',
        content: {'application/json': {schema: getModelSchemaRef(Areainvestigacion)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Jurado.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Areainvestigacion, {
            title: 'NewAreainvestigacionInJurado',
            exclude: ['id'],
          }),
        },
      },
    }) areainvestigacion: Omit<Areainvestigacion, 'id'>,
  ): Promise<Areainvestigacion> {
    return this.juradoRepository.areainvestigaciones(id).create(areainvestigacion);
  }

  @patch('/jurados/{id}/areainvestigacions', {
    responses: {
      '200': {
        description: 'Jurado.Areainvestigacion PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Areainvestigacion, {partial: true}),
        },
      },
    })
    areainvestigacion: Partial<Areainvestigacion>,
    @param.query.object('where', getWhereSchemaFor(Areainvestigacion)) where?: Where<Areainvestigacion>,
  ): Promise<Count> {
    return this.juradoRepository.areainvestigaciones(id).patch(areainvestigacion, where);
  }

  @del('/jurados/{id}/areainvestigacions', {
    responses: {
      '200': {
        description: 'Jurado.Areainvestigacion DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Areainvestigacion)) where?: Where<Areainvestigacion>,
  ): Promise<Count> {
    return this.juradoRepository.areainvestigaciones(id).delete(where);
  }
}
