import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Foto, FotoRelations, Proponente} from '../models';
import {ProponenteRepository} from './proponente.repository';

export class FotoRepository extends DefaultCrudRepository<
  Foto,
  typeof Foto.prototype.id,
  FotoRelations
> {

  public readonly tiene_proponente: BelongsToAccessor<Proponente, typeof Foto.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ProponenteRepository') protected proponenteRepositoryGetter: Getter<ProponenteRepository>,
  ) {
    super(Foto, dataSource);
    this.tiene_proponente = this.createBelongsToAccessorFor('tiene_proponente', proponenteRepositoryGetter,);
    this.registerInclusionResolver('tiene_proponente', this.tiene_proponente.inclusionResolver);
  }
}
