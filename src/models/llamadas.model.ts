import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Recordatorio} from './recordatorio.model';

@model()
export class Llamadas extends Entity {
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
  fecha: string;

  @property({
    type: 'string',
    required: true,
  })
  texto_explicativo: string;

  @belongsTo(() => Recordatorio, {name: 'tiene_recordatorio'})
  id_recordatorio: number;

  constructor(data?: Partial<Llamadas>) {
    super(data);
  }
}

export interface LlamadasRelations {
  // describe navigational properties here
}

export type LlamadasWithRelations = Llamadas & LlamadasRelations;
