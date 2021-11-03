import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Proponente} from './proponente.model';

@model()
export class Foto extends Entity {
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

  @belongsTo(() => Proponente, {name: 'tiene_proponente'})
  id_proponente: number;

  constructor(data?: Partial<Foto>) {
    super(data);
  }
}

export interface FotoRelations {
  // describe navigational properties here
}

export type FotoWithRelations = Foto & FotoRelations;
