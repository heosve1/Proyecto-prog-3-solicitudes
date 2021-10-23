import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Resultadosolicitud,
  Evaluacionsolicitud,
} from '../models';
import {ResultadosolicitudRepository} from '../repositories';

export class ResultadosolicitudEvaluacionsolicitudController {
  constructor(
    @repository(ResultadosolicitudRepository)
    public resultadosolicitudRepository: ResultadosolicitudRepository,
  ) { }

  @get('/resultadosolicituds/{id}/evaluacionsolicitud', {
    responses: {
      '200': {
        description: 'Evaluacionsolicitud belonging to Resultadosolicitud',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Evaluacionsolicitud)},
          },
        },
      },
    },
  })
  async getEvaluacionsolicitud(
    @param.path.number('id') id: typeof Resultadosolicitud.prototype.id,
  ): Promise<Evaluacionsolicitud> {
    return this.resultadosolicitudRepository.tiene_evaluciaonsolicitud(id);
  }
}
