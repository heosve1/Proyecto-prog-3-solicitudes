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
  Foto,
} from '../models';
import {ProponenteRepository} from '../repositories';

export class ProponenteFotoController {
  constructor(
    @repository(ProponenteRepository) protected proponenteRepository: ProponenteRepository,
  ) { }

  @get('/proponentes/{id}/fotos', {
    responses: {
      '200': {
        description: 'Array of Proponente has many Foto',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Foto)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Foto>,
  ): Promise<Foto[]> {
    return this.proponenteRepository.tiene_foto(id).find(filter);
  }

  @post('/proponentes/{id}/fotos', {
    responses: {
      '200': {
        description: 'Proponente model instance',
        content: {'application/json': {schema: getModelSchemaRef(Foto)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Proponente.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Foto, {
            title: 'NewFotoInProponente',
            exclude: ['id'],
            optional: ['id_proponente']
          }),
        },
      },
    }) foto: Omit<Foto, 'id'>,
  ): Promise<Foto> {
    return this.proponenteRepository.tiene_foto(id).create(foto);
  }

  @patch('/proponentes/{id}/fotos', {
    responses: {
      '200': {
        description: 'Proponente.Foto PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Foto, {partial: true}),
        },
      },
    })
    foto: Partial<Foto>,
    @param.query.object('where', getWhereSchemaFor(Foto)) where?: Where<Foto>,
  ): Promise<Count> {
    return this.proponenteRepository.tiene_foto(id).patch(foto, where);
  }

  @del('/proponentes/{id}/fotos', {
    responses: {
      '200': {
        description: 'Proponente.Foto DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Foto)) where?: Where<Foto>,
  ): Promise<Count> {
    return this.proponenteRepository.tiene_foto(id).delete(where);
  }
}
