import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    foreignKeys: {
      fk_id_solicitud1: {
        name: 'fk_id_solicitud1',
        entity: 'Solicitud',
        entityKey: 'id',
        foreignKey: 'id_solicitud',
      },
      fk_id_comite: {
        name: 'fk_id_comite',
        entity: 'Comite',
        entityKey: 'id',
        foreignKey: 'id_comite',
      },
    },
  },
})
export class ComiteSolicitud extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
  })
  id_solicitud?: number;

  @property({
    type: 'number',
  })
  id_comite?: number;

  constructor(data?: Partial<ComiteSolicitud>) {
    super(data);
  }
}

export interface ComiteSolicitudRelations {
  // describe navigational properties here
}

export type ComiteSolicitudWithRelations = ComiteSolicitud & ComiteSolicitudRelations;
