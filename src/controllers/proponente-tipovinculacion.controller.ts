import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Proponente,
  Tipovinculacion,
} from '../models';
import {ProponenteRepository} from '../repositories';

export class ProponenteTipovinculacionController {
  constructor(
    @repository(ProponenteRepository)
    public proponenteRepository: ProponenteRepository,
  ) { }

  @get('/proponentes/{id}/tipovinculacion', {
    responses: {
      '200': {
        description: 'Tipovinculacion belonging to Proponente',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Tipovinculacion)},
          },
        },
      },
    },
  })
  async getTipovinculacion(
    @param.path.number('id') id: typeof Proponente.prototype.id,
  ): Promise<Tipovinculacion> {
    return this.proponenteRepository.tiene_tipovinculacion(id);
  }
}
