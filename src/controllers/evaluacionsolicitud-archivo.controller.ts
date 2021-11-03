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
  Archivo,
} from '../models';
import {EvaluacionsolicitudRepository} from '../repositories';

export class EvaluacionsolicitudArchivoController {
  constructor(
    @repository(EvaluacionsolicitudRepository)
    public evaluacionsolicitudRepository: EvaluacionsolicitudRepository,
  ) { }

  @get('/evaluacionsolicituds/{id}/archivo', {
    responses: {
      '200': {
        description: 'Archivo belonging to Evaluacionsolicitud',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Archivo)},
          },
        },
      },
    },
  })
  async getArchivo(
    @param.path.number('id') id: typeof Evaluacionsolicitud.prototype.id,
  ): Promise<Archivo> {
    return this.evaluacionsolicitudRepository.tiene_archivo(id);
  }
}
