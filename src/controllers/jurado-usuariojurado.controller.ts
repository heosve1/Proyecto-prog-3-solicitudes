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
  Usuariojurado,
} from '../models';
import {JuradoRepository} from '../repositories';

export class JuradoUsuariojuradoController {
  constructor(
    @repository(JuradoRepository) protected juradoRepository: JuradoRepository,
  ) { }

  @get('/jurados/{id}/usuariojurado', {
    responses: {
      '200': {
        description: 'Jurado has one Usuariojurado',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Usuariojurado),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Usuariojurado>,
  ): Promise<Usuariojurado> {
    return this.juradoRepository.tiene_un(id).get(filter);
  }

  @post('/jurados/{id}/usuariojurado', {
    responses: {
      '200': {
        description: 'Jurado model instance',
        content: {'application/json': {schema: getModelSchemaRef(Usuariojurado)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Jurado.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuariojurado, {
            title: 'NewUsuariojuradoInJurado',
            exclude: ['id'],
            optional: ['id_jurado']
          }),
        },
      },
    }) usuariojurado: Omit<Usuariojurado, 'id'>,
  ): Promise<Usuariojurado> {
    return this.juradoRepository.tiene_un(id).create(usuariojurado);
  }

  @patch('/jurados/{id}/usuariojurado', {
    responses: {
      '200': {
        description: 'Jurado.Usuariojurado PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuariojurado, {partial: true}),
        },
      },
    })
    usuariojurado: Partial<Usuariojurado>,
    @param.query.object('where', getWhereSchemaFor(Usuariojurado)) where?: Where<Usuariojurado>,
  ): Promise<Count> {
    return this.juradoRepository.tiene_un(id).patch(usuariojurado, where);
  }

  @del('/jurados/{id}/usuariojurado', {
    responses: {
      '200': {
        description: 'Jurado.Usuariojurado DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Usuariojurado)) where?: Where<Usuariojurado>,
  ): Promise<Count> {
    return this.juradoRepository.tiene_un(id).delete(where);
  }
}
