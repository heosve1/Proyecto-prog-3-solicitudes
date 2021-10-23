import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Tipovinculacion, TipovinculacionRelations} from '../models';

export class TipovinculacionRepository extends DefaultCrudRepository<
  Tipovinculacion,
  typeof Tipovinculacion.prototype.id,
  TipovinculacionRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Tipovinculacion, dataSource);
  }
}
