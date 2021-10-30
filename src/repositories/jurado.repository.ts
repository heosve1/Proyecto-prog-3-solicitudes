import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory, HasOneRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Jurado, JuradoRelations, Areainvestigacion, JuradoInvestigacion, Usuariojurado} from '../models';
import {JuradoInvestigacionRepository} from './jurado-investigacion.repository';
import {AreainvestigacionRepository} from './areainvestigacion.repository';
import {UsuariojuradoRepository} from './usuariojurado.repository';

export class JuradoRepository extends DefaultCrudRepository<
  Jurado,
  typeof Jurado.prototype.id,
  JuradoRelations
> {

  public readonly areainvestigaciones: HasManyThroughRepositoryFactory<Areainvestigacion, typeof Areainvestigacion.prototype.id,
          JuradoInvestigacion,
          typeof Jurado.prototype.id
        >;

  public readonly tiene_un: HasOneRepositoryFactory<Usuariojurado, typeof Jurado.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('JuradoInvestigacionRepository') protected juradoInvestigacionRepositoryGetter: Getter<JuradoInvestigacionRepository>, @repository.getter('AreainvestigacionRepository') protected areainvestigacionRepositoryGetter: Getter<AreainvestigacionRepository>, @repository.getter('UsuariojuradoRepository') protected usuariojuradoRepositoryGetter: Getter<UsuariojuradoRepository>,
  ) {
    super(Jurado, dataSource);
    this.tiene_un = this.createHasOneRepositoryFactoryFor('tiene_un', usuariojuradoRepositoryGetter);
    this.registerInclusionResolver('tiene_un', this.tiene_un.inclusionResolver);
    this.areainvestigaciones = this.createHasManyThroughRepositoryFactoryFor('areainvestigaciones', areainvestigacionRepositoryGetter, juradoInvestigacionRepositoryGetter,);
    this.registerInclusionResolver('areainvestigaciones', this.areainvestigaciones.inclusionResolver);
  }
}
