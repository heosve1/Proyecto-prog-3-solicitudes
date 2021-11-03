import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Recordatorio, RecordatorioRelations, Evaluacionsolicitud, Resultadosolicitud} from '../models';
import {EvaluacionsolicitudRepository} from './evaluacionsolicitud.repository';
import {ResultadosolicitudRepository} from './resultadosolicitud.repository';

export class RecordatorioRepository extends DefaultCrudRepository<
  Recordatorio,
  typeof Recordatorio.prototype.id,
  RecordatorioRelations
> {

  public readonly tiene_evaluacionsolicitud: BelongsToAccessor<Evaluacionsolicitud, typeof Recordatorio.prototype.id>;

  public readonly tiene_resultadosolicitud: BelongsToAccessor<Resultadosolicitud, typeof Recordatorio.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('EvaluacionsolicitudRepository') protected evaluacionsolicitudRepositoryGetter: Getter<EvaluacionsolicitudRepository>, @repository.getter('ResultadosolicitudRepository') protected resultadosolicitudRepositoryGetter: Getter<ResultadosolicitudRepository>,
  ) {
    super(Recordatorio, dataSource);
    this.tiene_resultadosolicitud = this.createBelongsToAccessorFor('tiene_resultadosolicitud', resultadosolicitudRepositoryGetter,);
    this.registerInclusionResolver('tiene_resultadosolicitud', this.tiene_resultadosolicitud.inclusionResolver);
    this.tiene_evaluacionsolicitud = this.createBelongsToAccessorFor('tiene_evaluacionsolicitud', evaluacionsolicitudRepositoryGetter,);
    this.registerInclusionResolver('tiene_evaluacionsolicitud', this.tiene_evaluacionsolicitud.inclusionResolver);
  }
}
