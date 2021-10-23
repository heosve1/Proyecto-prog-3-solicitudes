import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Evaluacionsolicitud} from './evaluacionsolicitud.model';

@model({
  settings: {
    foreignKeys: {
      fk_id_evaluacion_solicitud5: {
        name: 'fk_id_evaluacion_solicitud5',
        entity: 'Evaluacionsolicitud',
        entityKey: 'id',
        foreignKey: 'id_evaluacionsolicitud',
      },
    },
  },
})
export class Resultadosolicitud extends Entity {
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
  resultado: string;

  @property({
    type: 'string',
    required: true,
  })
  formato_diligenciado: string;

  @belongsTo(() => Evaluacionsolicitud, {name: 'tiene_evaluciaonsolicitud'})
  id_evaluacionsolicitud: number;

  constructor(data?: Partial<Resultadosolicitud>) {
    super(data);
  }
}

export interface ResultadosolicitudRelations {
  // describe navigational properties here
}

export type ResultadosolicitudWithRelations = Resultadosolicitud & ResultadosolicitudRelations;
