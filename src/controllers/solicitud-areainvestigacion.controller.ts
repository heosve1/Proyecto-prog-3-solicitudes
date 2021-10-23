import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Solicitud,
  Areainvestigacion,
} from '../models';
import {SolicitudRepository} from '../repositories';

export class SolicitudAreainvestigacionController {
  constructor(
    @repository(SolicitudRepository)
    public solicitudRepository: SolicitudRepository,
  ) { }

  @get('/solicituds/{id}/areainvestigacion', {
    responses: {
      '200': {
        description: 'Areainvestigacion belonging to Solicitud',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Areainvestigacion)},
          },
        },
      },
    },
  })
  async getAreainvestigacion(
    @param.path.number('id') id: typeof Solicitud.prototype.id,
  ): Promise<Areainvestigacion> {
    return this.solicitudRepository.tiene_areainvestigacion(id);
  }
}
