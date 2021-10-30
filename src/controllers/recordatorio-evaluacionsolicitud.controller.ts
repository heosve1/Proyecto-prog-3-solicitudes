import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Recordatorio,
  Evaluacionsolicitud,
} from '../models';
import {RecordatorioRepository} from '../repositories';

export class RecordatorioEvaluacionsolicitudController {
  constructor(
    @repository(RecordatorioRepository)
    public recordatorioRepository: RecordatorioRepository,
  ) { }

  @get('/recordatorios/{id}/evaluacionsolicitud', {
    responses: {
      '200': {
        description: 'Evaluacionsolicitud belonging to Recordatorio',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Evaluacionsolicitud)},
          },
        },
      },
    },
  })
  async getEvaluacionsolicitud(
    @param.path.number('id') id: typeof Recordatorio.prototype.id,
  ): Promise<Evaluacionsolicitud> {
    return this.recordatorioRepository.tiene_evaluacionsolicitud(id);
  }
}
