import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Resultadosolicitud, ResultadosolicitudRelations, Evaluacionsolicitud} from '../models';
import {EvaluacionsolicitudRepository} from './evaluacionsolicitud.repository';

export class ResultadosolicitudRepository extends DefaultCrudRepository<
  Resultadosolicitud,
  typeof Resultadosolicitud.prototype.id,
  ResultadosolicitudRelations
> {

  public readonly tiene_evaluciaonsolicitud: BelongsToAccessor<Evaluacionsolicitud, typeof Resultadosolicitud.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('EvaluacionsolicitudRepository') protected evaluacionsolicitudRepositoryGetter: Getter<EvaluacionsolicitudRepository>,
  ) {
    super(Resultadosolicitud, dataSource);
    this.tiene_evaluciaonsolicitud = this.createBelongsToAccessorFor('tiene_evaluciaonsolicitud', evaluacionsolicitudRepositoryGetter,);
    this.registerInclusionResolver('tiene_evaluciaonsolicitud', this.tiene_evaluciaonsolicitud.inclusionResolver);
  }
}
