import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Foto,
  Proponente,
} from '../models';
import {FotoRepository} from '../repositories';

export class FotoProponenteController {
  constructor(
    @repository(FotoRepository)
    public fotoRepository: FotoRepository,
  ) { }

  @get('/fotos/{id}/proponente', {
    responses: {
      '200': {
        description: 'Proponente belonging to Foto',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Proponente)},
          },
        },
      },
    },
  })
  async getProponente(
    @param.path.number('id') id: typeof Foto.prototype.id,
  ): Promise<Proponente> {
    return this.fotoRepository.tiene_proponente(id);
  }
}
