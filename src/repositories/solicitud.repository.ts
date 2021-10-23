import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Solicitud, SolicitudRelations, Modalidad, Tiposolicitud, Areainvestigacion, Proponente, Comite, ComiteSolicitud} from '../models';
import {ModalidadRepository} from './modalidad.repository';
import {TiposolicitudRepository} from './tiposolicitud.repository';
import {AreainvestigacionRepository} from './areainvestigacion.repository';
import {ProponenteRepository} from './proponente.repository';
import {ComiteSolicitudRepository} from './comite-solicitud.repository';
import {ComiteRepository} from './comite.repository';

export class SolicitudRepository extends DefaultCrudRepository<
  Solicitud,
  typeof Solicitud.prototype.id,
  SolicitudRelations
> {

  public readonly tiene_modalidad: BelongsToAccessor<Modalidad, typeof Solicitud.prototype.id>;

  public readonly tiene_tiposolicitud: BelongsToAccessor<Tiposolicitud, typeof Solicitud.prototype.id>;

  public readonly tiene_areainvestigacion: BelongsToAccessor<Areainvestigacion, typeof Solicitud.prototype.id>;

  public readonly tiene_proponente: BelongsToAccessor<Proponente, typeof Solicitud.prototype.id>;

  public readonly comites: HasManyThroughRepositoryFactory<Comite, typeof Comite.prototype.id,
          ComiteSolicitud,
          typeof Solicitud.prototype.id
        >;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ModalidadRepository') protected modalidadRepositoryGetter: Getter<ModalidadRepository>, @repository.getter('TiposolicitudRepository') protected tiposolicitudRepositoryGetter: Getter<TiposolicitudRepository>, @repository.getter('AreainvestigacionRepository') protected areainvestigacionRepositoryGetter: Getter<AreainvestigacionRepository>, @repository.getter('ProponenteRepository') protected proponenteRepositoryGetter: Getter<ProponenteRepository>, @repository.getter('ComiteSolicitudRepository') protected comiteSolicitudRepositoryGetter: Getter<ComiteSolicitudRepository>, @repository.getter('ComiteRepository') protected comiteRepositoryGetter: Getter<ComiteRepository>,
  ) {
    super(Solicitud, dataSource);
    this.comites = this.createHasManyThroughRepositoryFactoryFor('comites', comiteRepositoryGetter, comiteSolicitudRepositoryGetter,);
    this.registerInclusionResolver('comites', this.comites.inclusionResolver);
    this.tiene_proponente = this.createBelongsToAccessorFor('tiene_proponente', proponenteRepositoryGetter,);
    this.registerInclusionResolver('tiene_proponente', this.tiene_proponente.inclusionResolver);
    this.tiene_areainvestigacion = this.createBelongsToAccessorFor('tiene_areainvestigacion', areainvestigacionRepositoryGetter,);
    this.registerInclusionResolver('tiene_areainvestigacion', this.tiene_areainvestigacion.inclusionResolver);
    this.tiene_tiposolicitud = this.createBelongsToAccessorFor('tiene_tiposolicitud', tiposolicitudRepositoryGetter,);
    this.registerInclusionResolver('tiene_tiposolicitud', this.tiene_tiposolicitud.inclusionResolver);
    this.tiene_modalidad = this.createBelongsToAccessorFor('tiene_modalidad', modalidadRepositoryGetter,);
    this.registerInclusionResolver('tiene_modalidad', this.tiene_modalidad.inclusionResolver);
  }
}
