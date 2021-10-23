import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Jurado, JuradoRelations, Areainvestigacion, JuradoInvestigacion} from '../models';
import {JuradoInvestigacionRepository} from './jurado-investigacion.repository';
import {AreainvestigacionRepository} from './areainvestigacion.repository';

export class JuradoRepository extends DefaultCrudRepository<
  Jurado,
  typeof Jurado.prototype.id,
  JuradoRelations
> {

  public readonly areainvestigaciones: HasManyThroughRepositoryFactory<Areainvestigacion, typeof Areainvestigacion.prototype.id,
          JuradoInvestigacion,
          typeof Jurado.prototype.id
        >;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('JuradoInvestigacionRepository') protected juradoInvestigacionRepositoryGetter: Getter<JuradoInvestigacionRepository>, @repository.getter('AreainvestigacionRepository') protected areainvestigacionRepositoryGetter: Getter<AreainvestigacionRepository>,
  ) {
    super(Jurado, dataSource);
    this.areainvestigaciones = this.createHasManyThroughRepositoryFactoryFor('areainvestigaciones', areainvestigacionRepositoryGetter, juradoInvestigacionRepositoryGetter,);
    this.registerInclusionResolver('areainvestigaciones', this.areainvestigaciones.inclusionResolver);
  }
}
