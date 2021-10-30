import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasOneRepositoryFactory, repository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Jurado, JuradoRelations, Usuariojurado} from '../models';
import {UsuariojuradoRepository} from './usuariojurado.repository';

export class JuradoRepository extends DefaultCrudRepository<
  Jurado,
  typeof Jurado.prototype.id,
  JuradoRelations
> {



  public readonly tiene_un: HasOneRepositoryFactory<Usuariojurado, typeof Jurado.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('UsuariojuradoRepository') protected usuariojuradoRepositoryGetter: Getter<UsuariojuradoRepository>,
  ) {
    super(Jurado, dataSource);
    this.tiene_un = this.createHasOneRepositoryFactoryFor('tiene_un', usuariojuradoRepositoryGetter);
    this.registerInclusionResolver('tiene_un', this.tiene_un.inclusionResolver);
  }
}
