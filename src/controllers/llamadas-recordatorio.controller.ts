import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Llamadas,
  Recordatorio,
} from '../models';
import {LlamadasRepository} from '../repositories';

export class LlamadasRecordatorioController {
  constructor(
    @repository(LlamadasRepository)
    public llamadasRepository: LlamadasRepository,
  ) { }

  @get('/llamadas/{id}/recordatorio', {
    responses: {
      '200': {
        description: 'Recordatorio belonging to Llamadas',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Recordatorio)},
          },
        },
      },
    },
  })
  async getRecordatorio(
    @param.path.number('id') id: typeof Llamadas.prototype.id,
  ): Promise<Recordatorio> {
    return this.llamadasRepository.tiene_recordatorio(id);
  }
}
