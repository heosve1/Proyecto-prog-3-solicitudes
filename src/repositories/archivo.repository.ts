import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Archivo, ArchivoRelations, Solicitud} from '../models';
import {SolicitudRepository} from './solicitud.repository';

export class ArchivoRepository extends DefaultCrudRepository<
  Archivo,
  typeof Archivo.prototype.id,
  ArchivoRelations
> {

  public readonly tiene_solicitud: BelongsToAccessor<Solicitud, typeof Archivo.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('SolicitudRepository') protected solicitudRepositoryGetter: Getter<SolicitudRepository>,
  ) {
    super(Archivo, dataSource);
    this.tiene_solicitud = this.createBelongsToAccessorFor('tiene_solicitud', solicitudRepositoryGetter,);
    this.registerInclusionResolver('tiene_solicitud', this.tiene_solicitud.inclusionResolver);
  }
}
