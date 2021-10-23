import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Tiposolicitud, TiposolicitudRelations} from '../models';

export class TiposolicitudRepository extends DefaultCrudRepository<
  Tiposolicitud,
  typeof Tiposolicitud.prototype.id,
  TiposolicitudRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Tiposolicitud, dataSource);
  }
}
