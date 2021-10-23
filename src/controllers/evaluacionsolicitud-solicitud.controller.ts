import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Evaluacionsolicitud,
  Solicitud,
} from '../models';
import {EvaluacionsolicitudRepository} from '../repositories';

export class EvaluacionsolicitudSolicitudController {
  constructor(
    @repository(EvaluacionsolicitudRepository)
    public evaluacionsolicitudRepository: EvaluacionsolicitudRepository,
  ) { }

  @get('/evaluacionsolicituds/{id}/solicitud', {
    responses: {
      '200': {
        description: 'Solicitud belonging to Evaluacionsolicitud',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Solicitud)},
          },
        },
      },
    },
  })
  async getSolicitud(
    @param.path.number('id') id: typeof Evaluacionsolicitud.prototype.id,
  ): Promise<Solicitud> {
    return this.evaluacionsolicitudRepository.tiene_solicitud(id);
  }
}
