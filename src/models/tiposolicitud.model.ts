import {Entity, model, property} from '@loopback/repository';

@model()
export class Tiposolicitud extends Entity {
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

  @property({
    type: 'string',
    required: true,
  })
  formato: string;

  constructor(data?: Partial<Tiposolicitud>) {
    super(data);
  }
}

export interface TiposolicitudRelations {
  // describe navigational properties here
}

export type TiposolicitudWithRelations = Tiposolicitud & TiposolicitudRelations;
