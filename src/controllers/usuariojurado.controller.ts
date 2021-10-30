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
import {Usuariojurado} from '../models';
import {UsuariojuradoRepository} from '../repositories';

export class UsuariojuradoController {
  constructor(
    @repository(UsuariojuradoRepository)
    public usuariojuradoRepository : UsuariojuradoRepository,
  ) {}

  @post('/usuariojurados')
  @response(200, {
    description: 'Usuariojurado model instance',
    content: {'application/json': {schema: getModelSchemaRef(Usuariojurado)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuariojurado, {
            title: 'NewUsuariojurado',
            exclude: ['id'],
          }),
        },
      },
    })
    usuariojurado: Omit<Usuariojurado, 'id'>,
  ): Promise<Usuariojurado> {
    return this.usuariojuradoRepository.create(usuariojurado);
  }

  @get('/usuariojurados/count')
  @response(200, {
    description: 'Usuariojurado model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Usuariojurado) where?: Where<Usuariojurado>,
  ): Promise<Count> {
    return this.usuariojuradoRepository.count(where);
  }

  @get('/usuariojurados')
  @response(200, {
    description: 'Array of Usuariojurado model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Usuariojurado, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Usuariojurado) filter?: Filter<Usuariojurado>,
  ): Promise<Usuariojurado[]> {
    return this.usuariojuradoRepository.find(filter);
  }

  @patch('/usuariojurados')
  @response(200, {
    description: 'Usuariojurado PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuariojurado, {partial: true}),
        },
      },
    })
    usuariojurado: Usuariojurado,
    @param.where(Usuariojurado) where?: Where<Usuariojurado>,
  ): Promise<Count> {
    return this.usuariojuradoRepository.updateAll(usuariojurado, where);
  }

  @get('/usuariojurados/{id}')
  @response(200, {
    description: 'Usuariojurado model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Usuariojurado, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Usuariojurado, {exclude: 'where'}) filter?: FilterExcludingWhere<Usuariojurado>
  ): Promise<Usuariojurado> {
    return this.usuariojuradoRepository.findById(id, filter);
  }

  @patch('/usuariojurados/{id}')
  @response(204, {
    description: 'Usuariojurado PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuariojurado, {partial: true}),
        },
      },
    })
    usuariojurado: Usuariojurado,
  ): Promise<void> {
    await this.usuariojuradoRepository.updateById(id, usuariojurado);
  }

  @put('/usuariojurados/{id}')
  @response(204, {
    description: 'Usuariojurado PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() usuariojurado: Usuariojurado,
  ): Promise<void> {
    await this.usuariojuradoRepository.replaceById(id, usuariojurado);
  }

  @del('/usuariojurados/{id}')
  @response(204, {
    description: 'Usuariojurado DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.usuariojuradoRepository.deleteById(id);
  }
}
