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
Areainvestigacion,
JuradoAreaInvestigacion,
Jurado,
} from '../models';
import {AreainvestigacionRepository} from '../repositories';

export class AreainvestigacionJuradoController {
  constructor(
    @repository(AreainvestigacionRepository) protected areainvestigacionRepository: AreainvestigacionRepository,
  ) { }

  @get('/areainvestigacions/{id}/jurados', {
    responses: {
      '200': {
        description: 'Array of Areainvestigacion has many Jurado through JuradoAreaInvestigacion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Jurado)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Jurado>,
  ): Promise<Jurado[]> {
    return this.areainvestigacionRepository.tiene(id).find(filter);
  }

  @post('/areainvestigacions/{id}/jurados', {
    responses: {
      '200': {
        description: 'create a Jurado model instance',
        content: {'application/json': {schema: getModelSchemaRef(Jurado)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Areainvestigacion.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Jurado, {
            title: 'NewJuradoInAreainvestigacion',
            exclude: ['id'],
          }),
        },
      },
    }) jurado: Omit<Jurado, 'id'>,
  ): Promise<Jurado> {
    return this.areainvestigacionRepository.tiene(id).create(jurado);
  }

  @patch('/areainvestigacions/{id}/jurados', {
    responses: {
      '200': {
        description: 'Areainvestigacion.Jurado PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Jurado, {partial: true}),
        },
      },
    })
    jurado: Partial<Jurado>,
    @param.query.object('where', getWhereSchemaFor(Jurado)) where?: Where<Jurado>,
  ): Promise<Count> {
    return this.areainvestigacionRepository.tiene(id).patch(jurado, where);
  }

  @del('/areainvestigacions/{id}/jurados', {
    responses: {
      '200': {
        description: 'Areainvestigacion.Jurado DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Jurado)) where?: Where<Jurado>,
  ): Promise<Count> {
    return this.areainvestigacionRepository.tiene(id).delete(where);
  }
}
