import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Usuariojurado, UsuariojuradoRelations} from '../models';

export class UsuariojuradoRepository extends DefaultCrudRepository<
  Usuariojurado,
  typeof Usuariojurado.prototype.id,
  UsuariojuradoRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Usuariojurado, dataSource);
  }
}
