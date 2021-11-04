import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Llamadas, LlamadasRelations, Recordatorio} from '../models';
import {RecordatorioRepository} from './recordatorio.repository';

export class LlamadasRepository extends DefaultCrudRepository<
  Llamadas,
  typeof Llamadas.prototype.id,
  LlamadasRelations
> {

  public readonly tiene_recordatorio: BelongsToAccessor<Recordatorio, typeof Llamadas.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('RecordatorioRepository') protected recordatorioRepositoryGetter: Getter<RecordatorioRepository>,
  ) {
    super(Llamadas, dataSource);
    this.tiene_recordatorio = this.createBelongsToAccessorFor('tiene_recordatorio', recordatorioRepositoryGetter,);
    this.registerInclusionResolver('tiene_recordatorio', this.tiene_recordatorio.inclusionResolver);
  }
}
