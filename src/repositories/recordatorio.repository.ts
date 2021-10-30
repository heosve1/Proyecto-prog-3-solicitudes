import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Recordatorio, RecordatorioRelations, Evaluacionsolicitud} from '../models';
import {EvaluacionsolicitudRepository} from './evaluacionsolicitud.repository';

export class RecordatorioRepository extends DefaultCrudRepository<
  Recordatorio,
  typeof Recordatorio.prototype.id,
  RecordatorioRelations
> {

  public readonly tiene_evaluacionsolicitud: BelongsToAccessor<Evaluacionsolicitud, typeof Recordatorio.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('EvaluacionsolicitudRepository') protected evaluacionsolicitudRepositoryGetter: Getter<EvaluacionsolicitudRepository>,
  ) {
    super(Recordatorio, dataSource);
    this.tiene_evaluacionsolicitud = this.createBelongsToAccessorFor('tiene_evaluacionsolicitud', evaluacionsolicitudRepositoryGetter,);
    this.registerInclusionResolver('tiene_evaluacionsolicitud', this.tiene_evaluacionsolicitud.inclusionResolver);
  }
}
