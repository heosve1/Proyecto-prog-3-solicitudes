import {Entity, model, property} from '@loopback/repository';

@model()
export class Tipovinculacion extends Entity {
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


  constructor(data?: Partial<Tipovinculacion>) {
    super(data);
  }
}

export interface TipovinculacionRelations {
  // describe navigational properties here
}

export type TipovinculacionWithRelations = Tipovinculacion & TipovinculacionRelations;
