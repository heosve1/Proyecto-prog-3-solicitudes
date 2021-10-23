import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {Areainvestigacion} from './areainvestigacion.model';
import {ComiteSolicitud} from './comite-solicitud.model';
import {Comite} from './comite.model';
import {Modalidad} from './modalidad.model';
import {Proponente} from './proponente.model';
import {Tiposolicitud} from './tiposolicitud.model';

@model({
  settings: {
    foreignKeys: {
      fk_id_proponente2: {
        name: 'fk_id_proponente2',
        entity: 'Proponente',
        entityKey: 'id',
        foreignKey: 'id_proponente',
      },
      fk_id_modalidad2: {
        name: 'fk_id_modalidad2',
        entity: 'Modalidad',
        entityKey: 'id',
        foreignKey: 'id_modalidad',
      },
      fk_id_tiposolicitud3: {
        name: 'fk_id_tiposolicitud3',
        entity: 'Tiposolicitud',
        entityKey: 'id',
        foreignKey: 'id_tiposolicitud',
      },
      fk_id_areainvestigacion2: {
        name: 'fk_id_areainvestigacion2',
        entity: 'Areainvestigacion',
        entityKey: 'id',
        foreignKey: 'id_areainvestigacion',
      },
    },
  },
})
export class Solicitud extends Entity {
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
  nombre_trabajo: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha: string;

  @property({
    type: 'string',
    required: true,
  })
  archivo_comprimido: string;

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;

  @belongsTo(() => Modalidad, {name: 'tiene_modalidad'})
  id_modalidad: number;

  @belongsTo(() => Tiposolicitud, {name: 'tiene_tiposolicitud'})
  id_tiposolicitud: number;

  @belongsTo(() => Areainvestigacion, {name: 'tiene_areainvestigacion'})
  id_areainvestigacion: number;

  @belongsTo(() => Proponente, {name: 'tiene_proponente'})
  id_proponente: number;

  @hasMany(() => Comite, {through: {model: () => ComiteSolicitud, keyFrom: 'id_solicitud', keyTo: 'id_comite'}})
  comites: Comite[];

  constructor(data?: Partial<Solicitud>) {
    super(data);
  }
}

export interface SolicitudRelations {
  // describe navigational properties here
}

export type SolicitudWithRelations = Solicitud & SolicitudRelations;
