import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Areainvestigacion, AreainvestigacionRelations, Jurado, JuradoAreaInvestigacion} from '../models';
import {JuradoAreaInvestigacionRepository} from './jurado-area-investigacion.repository';
import {JuradoRepository} from './jurado.repository';

export class AreainvestigacionRepository extends DefaultCrudRepository<
  Areainvestigacion,
  typeof Areainvestigacion.prototype.id,
  AreainvestigacionRelations
> {

  public readonly tiene: HasManyThroughRepositoryFactory<Jurado, typeof Jurado.prototype.id,
          JuradoAreaInvestigacion,
          typeof Areainvestigacion.prototype.id
        >;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('JuradoAreaInvestigacionRepository') protected juradoAreaInvestigacionRepositoryGetter: Getter<JuradoAreaInvestigacionRepository>, @repository.getter('JuradoRepository') protected juradoRepositoryGetter: Getter<JuradoRepository>,
  ) {
    super(Areainvestigacion, dataSource);
    this.tiene = this.createHasManyThroughRepositoryFactoryFor('tiene', juradoRepositoryGetter, juradoAreaInvestigacionRepositoryGetter,);
    this.registerInclusionResolver('tiene', this.tiene.inclusionResolver);
  }
}
