import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Evaluacionsolicitud, EvaluacionsolicitudRelations, Jurado, Solicitud} from '../models';
import {JuradoRepository} from './jurado.repository';
import {SolicitudRepository} from './solicitud.repository';

export class EvaluacionsolicitudRepository extends DefaultCrudRepository<
  Evaluacionsolicitud,
  typeof Evaluacionsolicitud.prototype.id,
  EvaluacionsolicitudRelations
> {

  public readonly tiene_jurado: BelongsToAccessor<Jurado, typeof Evaluacionsolicitud.prototype.id>;

  public readonly tiene_solicitud: BelongsToAccessor<Solicitud, typeof Evaluacionsolicitud.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('JuradoRepository') protected juradoRepositoryGetter: Getter<JuradoRepository>, @repository.getter('SolicitudRepository') protected solicitudRepositoryGetter: Getter<SolicitudRepository>,
  ) {
    super(Evaluacionsolicitud, dataSource);
    this.tiene_solicitud = this.createBelongsToAccessorFor('tiene_solicitud', solicitudRepositoryGetter,);
    this.registerInclusionResolver('tiene_solicitud', this.tiene_solicitud.inclusionResolver);
    this.tiene_jurado = this.createBelongsToAccessorFor('tiene_jurado', juradoRepositoryGetter,);
    this.registerInclusionResolver('tiene_jurado', this.tiene_jurado.inclusionResolver);
  }
}
