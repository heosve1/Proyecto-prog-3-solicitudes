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
import {Usuarioproponente} from '../models';
import {UsuarioproponenteRepository} from '../repositories';

export class UsuarioproponenteController {
  constructor(
    @repository(UsuarioproponenteRepository)
    public usuarioproponenteRepository : UsuarioproponenteRepository,
  ) {}

  @post('/usuarioproponentes')
  @response(200, {
    description: 'Usuarioproponente model instance',
    content: {'application/json': {schema: getModelSchemaRef(Usuarioproponente)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuarioproponente, {
            title: 'NewUsuarioproponente',
            exclude: ['id'],
          }),
        },
      },
    })
    usuarioproponente: Omit<Usuarioproponente, 'id'>,
  ): Promise<Usuarioproponente> {
    return this.usuarioproponenteRepository.create(usuarioproponente);
  }

  @get('/usuarioproponentes/count')
  @response(200, {
    description: 'Usuarioproponente model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Usuarioproponente) where?: Where<Usuarioproponente>,
  ): Promise<Count> {
    return this.usuarioproponenteRepository.count(where);
  }

  @get('/usuarioproponentes')
  @response(200, {
    description: 'Array of Usuarioproponente model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Usuarioproponente, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Usuarioproponente) filter?: Filter<Usuarioproponente>,
  ): Promise<Usuarioproponente[]> {
    return this.usuarioproponenteRepository.find(filter);
  }

  @patch('/usuarioproponentes')
  @response(200, {
    description: 'Usuarioproponente PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuarioproponente, {partial: true}),
        },
      },
    })
    usuarioproponente: Usuarioproponente,
    @param.where(Usuarioproponente) where?: Where<Usuarioproponente>,
  ): Promise<Count> {
    return this.usuarioproponenteRepository.updateAll(usuarioproponente, where);
  }

  @get('/usuarioproponentes/{id}')
  @response(200, {
    description: 'Usuarioproponente model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Usuarioproponente, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Usuarioproponente, {exclude: 'where'}) filter?: FilterExcludingWhere<Usuarioproponente>
  ): Promise<Usuarioproponente> {
    return this.usuarioproponenteRepository.findById(id, filter);
  }

  @patch('/usuarioproponentes/{id}')
  @response(204, {
    description: 'Usuarioproponente PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuarioproponente, {partial: true}),
        },
      },
    })
    usuarioproponente: Usuarioproponente,
  ): Promise<void> {
    await this.usuarioproponenteRepository.updateById(id, usuarioproponente);
  }

  @put('/usuarioproponentes/{id}')
  @response(204, {
    description: 'Usuarioproponente PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() usuarioproponente: Usuarioproponente,
  ): Promise<void> {
    await this.usuarioproponenteRepository.replaceById(id, usuarioproponente);
  }

  @del('/usuarioproponentes/{id}')
  @response(204, {
    description: 'Usuarioproponente DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.usuarioproponenteRepository.deleteById(id);
  }
}
