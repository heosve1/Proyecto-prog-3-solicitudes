import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {Llamadas} from '../models';
import {LlamadasRepository} from '../repositories';

export class LlamadasController {
  constructor(
    @repository(LlamadasRepository)
    public llamadasRepository: LlamadasRepository,
  ) { }

  @post('/llamadas')
  @response(200, {
    description: 'Llamadas model instance',
    content: {'application/json': {schema: getModelSchemaRef(Llamadas)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Llamadas, {
            title: 'NewLlamadas',
            exclude: ['id'],
          }),
        },
      },
    })
    llamadas: Omit<Llamadas, 'id'>,
  ): Promise<Llamadas> {

    return this.llamadasRepository.create(llamadas);
  }

  @get('/llamadas/count')
  @response(200, {
    description: 'Llamadas model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Llamadas) where?: Where<Llamadas>,
  ): Promise<Count> {
    return this.llamadasRepository.count(where);
  }

  @get('/llamadas')
  @response(200, {
    description: 'Array of Llamadas model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Llamadas, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Llamadas) filter?: Filter<Llamadas>,
  ): Promise<Llamadas[]> {
    return this.llamadasRepository.find(filter);
  }

  @patch('/llamadas')
  @response(200, {
    description: 'Llamadas PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Llamadas, {partial: true}),
        },
      },
    })
    llamadas: Llamadas,
    @param.where(Llamadas) where?: Where<Llamadas>,
  ): Promise<Count> {
    return this.llamadasRepository.updateAll(llamadas, where);
  }

  @get('/llamadas/{id}')
  @response(200, {
    description: 'Llamadas model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Llamadas, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Llamadas, {exclude: 'where'}) filter?: FilterExcludingWhere<Llamadas>
  ): Promise<Llamadas> {
    return this.llamadasRepository.findById(id, filter);
  }

  @patch('/llamadas/{id}')
  @response(204, {
    description: 'Llamadas PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Llamadas, {partial: true}),
        },
      },
    })
    llamadas: Llamadas,
  ): Promise<void> {
    await this.llamadasRepository.updateById(id, llamadas);
  }

  @put('/llamadas/{id}')
  @response(204, {
    description: 'Llamadas PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() llamadas: Llamadas,
  ): Promise<void> {
    await this.llamadasRepository.replaceById(id, llamadas);
  }

  @del('/llamadas/{id}')
  @response(204, {
    description: 'Llamadas DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.llamadasRepository.deleteById(id);
  }
}
