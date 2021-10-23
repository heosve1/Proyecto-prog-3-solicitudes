import {Entity, model, property} from '@loopback/repository';

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


  constructor(data?: Partial<Areainvestigacion>) {
    super(data);
  }
}

export interface AreainvestigacionRelations {
  // describe navigational properties here
}

export type AreainvestigacionWithRelations = Areainvestigacion & AreainvestigacionRelations;
