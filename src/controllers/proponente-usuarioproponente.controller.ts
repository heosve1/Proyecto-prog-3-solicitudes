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
  Proponente,
  Usuarioproponente,
} from '../models';
import {ProponenteRepository} from '../repositories';

export class ProponenteUsuarioproponenteController {
  constructor(
    @repository(ProponenteRepository) protected proponenteRepository: ProponenteRepository,
  ) { }

  @get('/proponentes/{id}/usuarioproponente', {
    responses: {
      '200': {
        description: 'Proponente has one Usuarioproponente',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Usuarioproponente),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Usuarioproponente>,
  ): Promise<Usuarioproponente> {
    return this.proponenteRepository.tiene_un(id).get(filter);
  }

  @post('/proponentes/{id}/usuarioproponente', {
    responses: {
      '200': {
        description: 'Proponente model instance',
        content: {'application/json': {schema: getModelSchemaRef(Usuarioproponente)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Proponente.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuarioproponente, {
            title: 'NewUsuarioproponenteInProponente',
            exclude: ['id'],
            optional: ['id_proponente']
          }),
        },
      },
    }) usuarioproponente: Omit<Usuarioproponente, 'id'>,
  ): Promise<Usuarioproponente> {
    return this.proponenteRepository.tiene_un(id).create(usuarioproponente);
  }

  @patch('/proponentes/{id}/usuarioproponente', {
    responses: {
      '200': {
        description: 'Proponente.Usuarioproponente PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuarioproponente, {partial: true}),
        },
      },
    })
    usuarioproponente: Partial<Usuarioproponente>,
    @param.query.object('where', getWhereSchemaFor(Usuarioproponente)) where?: Where<Usuarioproponente>,
  ): Promise<Count> {
    return this.proponenteRepository.tiene_un(id).patch(usuarioproponente, where);
  }

  @del('/proponentes/{id}/usuarioproponente', {
    responses: {
      '200': {
        description: 'Proponente.Usuarioproponente DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Usuarioproponente)) where?: Where<Usuarioproponente>,
  ): Promise<Count> {
    return this.proponenteRepository.tiene_un(id).delete(where);
  }
}
