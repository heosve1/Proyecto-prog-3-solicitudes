import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Evaluacionsolicitud} from './evaluacionsolicitud.model';

@model({
  settings: {
    foreignKeys: {
      fk_id_evaluacion_solicitud6: {
        name: 'fk_id_evaluacion_solicitud6',
        entity: 'Evaluacionsolicitud',
        entityKey: 'id',
        foreignKey: 'id_evaluacionsolicitud',
      },
    },
  },
})
export class Recordatorio extends Entity {
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
  tipo: string;

  @property({
    type: 'string',
    required: true,
  })
  resumen: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha: string;

  @property({
    type: 'string',
    required: true,
  })
  hora: string;

  @belongsTo(() => Evaluacionsolicitud, {name: 'tiene_evaluacionsolicitud'})
  id_evaluacionsolicitud: number;

  constructor(data?: Partial<Recordatorio>) {
    super(data);
  }
}

export interface RecordatorioRelations {
  // describe navigational properties here
}

export type RecordatorioWithRelations = Recordatorio & RecordatorioRelations;
