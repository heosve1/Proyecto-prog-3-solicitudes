import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Usuarioproponente, UsuarioproponenteRelations} from '../models';

export class UsuarioproponenteRepository extends DefaultCrudRepository<
  Usuarioproponente,
  typeof Usuarioproponente.prototype.id,
  UsuarioproponenteRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Usuarioproponente, dataSource);
  }
}
