import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Solicitud} from './solicitud.model';

@model({
  settings: {
    foreignKeys: {
      fk_id_solicitud878: {
        name: 'fk_id_solicitud878',
        entity: 'Solicitud',
        entityKey: 'id',
        foreignKey: 'id_solicitud',
      }
    }
  }
})
export class Archivo extends Entity {
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

  @belongsTo(() => Solicitud, {name: 'tiene_solicitud'})
  id_solicitud: number;

  constructor(data?: Partial<Archivo>) {
    super(data);
  }
}

export interface ArchivoRelations {
  // describe navigational properties here
}

export type ArchivoWithRelations = Archivo & ArchivoRelations;
