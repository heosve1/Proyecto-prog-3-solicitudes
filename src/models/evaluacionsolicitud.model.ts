import {belongsTo, Entity, model, property} from '@loopback/repository';
import {generateKeyPair, generateKeyPairSync} from 'crypto';
import {Jurado} from './jurado.model';
import {Solicitud} from './solicitud.model';

@model({
  settings: {
    foreignKeys: {
      fk_id_jurado: {
        name: 'fk_id_jurado',
        entity: 'Jurado',
        entityKey: 'id',
        foreignKey: 'id_jurado',
      },
      fk_id_solicitud2: {
        name: 'fk_id_solicitud2',
        entity: 'Solicitud',
        entityKey: 'id',
        foreignKey: 'id_solicitud',
      }
    }
  }
}
)
export class Evaluacionsolicitud extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: false,
  })
  respuesta: string;

  @property({
    type: 'string',
    required: true,
  })
  fecha_invitacion: string;

  @property({
    type: 'string',
    required: true,
  })
  fecha_resultado: string;

  @property({
    type: 'string',
    required: true,
  })
  observaciones: string;

  @property({
    type: 'string',
    required: true,
  })
  Hash:string;

  @belongsTo(() => Jurado, {name: 'tiene_jurado'})
  id_jurado: number;

  @belongsTo(() => Solicitud, {name: 'tiene_solicitud'})
  id_solicitud: number;

  constructor(data?: Partial<Evaluacionsolicitud>) {
    super(data);
  }
}

export interface EvaluacionsolicitudRelations {
  // describe navigational properties here
}

export type EvaluacionsolicitudWithRelations = Evaluacionsolicitud & EvaluacionsolicitudRelations;
