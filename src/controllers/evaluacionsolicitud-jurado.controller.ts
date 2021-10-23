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
  Jurado,
} from '../models';
import {EvaluacionsolicitudRepository} from '../repositories';

export class EvaluacionsolicitudJuradoController {
  constructor(
    @repository(EvaluacionsolicitudRepository)
    public evaluacionsolicitudRepository: EvaluacionsolicitudRepository,
  ) { }

  @get('/evaluacionsolicituds/{id}/jurado', {
    responses: {
      '200': {
        description: 'Jurado belonging to Evaluacionsolicitud',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Jurado)},
          },
        },
      },
    },
  })
  async getJurado(
    @param.path.number('id') id: typeof Evaluacionsolicitud.prototype.id,
  ): Promise<Jurado> {
    return this.evaluacionsolicitudRepository.tiene_jurado(id);
  }
}
