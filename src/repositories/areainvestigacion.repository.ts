import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Areainvestigacion, AreainvestigacionRelations} from '../models';

export class AreainvestigacionRepository extends DefaultCrudRepository<
  Areainvestigacion,
  typeof Areainvestigacion.prototype.id,
  AreainvestigacionRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Areainvestigacion, dataSource);
  }
}
