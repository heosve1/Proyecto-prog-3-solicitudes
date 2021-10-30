import {Entity, model, property, hasMany} from '@loopback/repository';
import {Jurado} from './jurado.model';
import {JuradoAreaInvestigacion} from './jurado-area-investigacion.model';

@model()
export class Areainvestigacion extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @hasMany(() => Jurado, {through: {model: () => JuradoAreaInvestigacion, keyFrom: 'id_areainvestigacion', keyTo: 'id_jurado'}})
  tiene: Jurado[];

  constructor(data?: Partial<Areainvestigacion>) {
    super(data);
  }
}

export interface AreainvestigacionRelations {
  // describe navigational properties here
}

export type AreainvestigacionWithRelations = Areainvestigacion & AreainvestigacionRelations;
