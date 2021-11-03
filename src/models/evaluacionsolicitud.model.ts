import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Archivo} from './archivo.model';
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
      },
      fk_id_archivo: {
        name: 'fk_id_archivo',
        entity: 'Archivo',
        entityKey: 'id',
        foreignKey: 'id_archivo',
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
    required: true,
  })
  respuesta: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha_invitacion: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha_resultado: string;

  @property({
    type: 'string',
    required: true,
  })
  observaciones: string;

  @belongsTo(() => Jurado, {name: 'tiene_jurado'})
  id_jurado: number;

  @belongsTo(() => Solicitud, {name: 'tiene_solicitud'})
  id_solicitud: number;

  @belongsTo(() => Archivo, {name: 'tiene_archivo'})
  id_archivo: number;

  constructor(data?: Partial<Evaluacionsolicitud>) {
    super(data);
  }
}

export interface EvaluacionsolicitudRelations {
  // describe navigational properties here
}

export type EvaluacionsolicitudWithRelations = Evaluacionsolicitud & EvaluacionsolicitudRelations;
