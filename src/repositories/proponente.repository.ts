import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Proponente, ProponenteRelations, Tipovinculacion} from '../models';
import {TipovinculacionRepository} from './tipovinculacion.repository';

export class ProponenteRepository extends DefaultCrudRepository<
  Proponente,
  typeof Proponente.prototype.id,
  ProponenteRelations
> {

  public readonly tiene_tipovinculacion: BelongsToAccessor<Tipovinculacion, typeof Proponente.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('TipovinculacionRepository') protected tipovinculacionRepositoryGetter: Getter<TipovinculacionRepository>,
  ) {
    super(Proponente, dataSource);
    this.tiene_tipovinculacion = this.createBelongsToAccessorFor('tiene_tipovinculacion', tipovinculacionRepositoryGetter,);
    this.registerInclusionResolver('tiene_tipovinculacion', this.tiene_tipovinculacion.inclusionResolver);
  }
}
