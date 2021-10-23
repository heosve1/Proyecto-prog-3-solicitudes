import {
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param
} from '@loopback/rest';
import {
  Solicitud,
  Tiposolicitud
} from '../models';
import {SolicitudRepository} from '../repositories';

export class SolicitudTiposolicitudController {
  constructor(
    @repository(SolicitudRepository)
    public solicitudRepository: SolicitudRepository,
  ) { }

  @get('/solicituds/{id}/tiposolicitud', {
    responses: {
      '200': {
        description: 'Tiposolicitud belonging to Solicitud',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Tiposolicitud)},
          },
        },
      },
    },
  })
  async getTiposolicitud(
    @param.path.number('id') id: typeof Solicitud.prototype.id,
  ): Promise<Tiposolicitud> {
    return this.solicitudRepository.tiene_tiposolicitud(id);
  }
}
