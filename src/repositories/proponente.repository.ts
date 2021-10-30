import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasOneRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Proponente, ProponenteRelations, Tipovinculacion, Usuarioproponente} from '../models';
import {TipovinculacionRepository} from './tipovinculacion.repository';
import {UsuarioproponenteRepository} from './usuarioproponente.repository';

export class ProponenteRepository extends DefaultCrudRepository<
  Proponente,
  typeof Proponente.prototype.id,
  ProponenteRelations
> {

  public readonly tiene_tipovinculacion: BelongsToAccessor<Tipovinculacion, typeof Proponente.prototype.id>;

  public readonly tiene_un: HasOneRepositoryFactory<Usuarioproponente, typeof Proponente.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('TipovinculacionRepository') protected tipovinculacionRepositoryGetter: Getter<TipovinculacionRepository>, @repository.getter('UsuarioproponenteRepository') protected usuarioproponenteRepositoryGetter: Getter<UsuarioproponenteRepository>,
  ) {
    super(Proponente, dataSource);
    this.tiene_un = this.createHasOneRepositoryFactoryFor('tiene_un', usuarioproponenteRepositoryGetter);
    this.registerInclusionResolver('tiene_un', this.tiene_un.inclusionResolver);
    this.tiene_tipovinculacion = this.createBelongsToAccessorFor('tiene_tipovinculacion', tipovinculacionRepositoryGetter,);
    this.registerInclusionResolver('tiene_tipovinculacion', this.tiene_tipovinculacion.inclusionResolver);
  }
}
