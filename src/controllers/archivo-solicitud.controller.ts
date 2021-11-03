import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Archivo,
  Solicitud,
} from '../models';
import {ArchivoRepository} from '../repositories';

export class ArchivoSolicitudController {
  constructor(
    @repository(ArchivoRepository)
    public archivoRepository: ArchivoRepository,
  ) { }

  @get('/archivos/{id}/solicitud', {
    responses: {
      '200': {
        description: 'Solicitud belonging to Archivo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Solicitud)},
          },
        },
      },
    },
  })
  async getSolicitud(
    @param.path.number('id') id: typeof Archivo.prototype.id,
  ): Promise<Solicitud> {
    return this.archivoRepository.tiene_solicitud(id);
  }
}
