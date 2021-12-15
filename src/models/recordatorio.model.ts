import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Evaluacionsolicitud} from './evaluacionsolicitud.model';
import {Resultadosolicitud} from './resultadosolicitud.model';

@model({
  settings: {
    foreignKeys: {
      fk_id_evaluacion_solicitud6: {
        name: 'fk_id_evaluacion_solicitud6',
        entity: 'Evaluacionsolicitud',
        entityKey: 'id',
        foreignKey: 'id_evaluacionsolicitud',
      },
      fk_id_solicitud_resultado2: {
        name: 'fk_id_solicitud_resultado2',
        entity: 'Resultadosolicitud',
        entityKey: 'id',
        foreignKey: 'id_resultadosolicitud',
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
    type: 'string',
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

  @belongsTo(() => Resultadosolicitud, {name: 'tiene_resultadosolicitud'})
  id_resultadosolicitud: number;

  constructor(data?: Partial<Recordatorio>) {
    super(data);
  }
}

export interface RecordatorioRelations {
  // describe navigational properties here
}

export type RecordatorioWithRelations = Recordatorio & RecordatorioRelations;
