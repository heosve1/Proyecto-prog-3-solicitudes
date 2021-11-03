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
  Resultadosolicitud,
} from '../models';
import {RecordatorioRepository} from '../repositories';

export class RecordatorioResultadosolicitudController {
  constructor(
    @repository(RecordatorioRepository)
    public recordatorioRepository: RecordatorioRepository,
  ) { }

  @get('/recordatorios/{id}/resultadosolicitud', {
    responses: {
      '200': {
        description: 'Resultadosolicitud belonging to Recordatorio',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Resultadosolicitud)},
          },
        },
      },
    },
  })
  async getResultadosolicitud(
    @param.path.number('id') id: typeof Recordatorio.prototype.id,
  ): Promise<Resultadosolicitud> {
    return this.recordatorioRepository.tiene_resultadosolicitud(id);
  }
}
