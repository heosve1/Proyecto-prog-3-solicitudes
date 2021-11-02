import {belongsTo, Entity, hasOne, model, property} from '@loopback/repository';
import {Tipovinculacion} from './tipovinculacion.model';
import {Usuarioproponente} from './usuarioproponente.model';

@model({
  settings: {
    foreignKeys: {
      fk_id_tipovinculacion: {
        name: 'fk_id_tipovinculacion',
        entity: 'Tipovinculacion',
        entityKey: 'id',
        foreignKey: 'id_tipovinculacion',
      }
    },
  },
})
export class Proponente extends Entity {
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
  primer_nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  segundo_nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  primer_apellido: string;

  @property({
    type: 'string',
    required: true,
  })
  segundo_apellido: string;

  @property({
    type: 'string',
    required: true,
  })
  documento: string;

  @property({
    type: 'string',
    required: true,
  })
  correo: string;

  @property({
    type: 'string',
    required: true,
  })
  telefono: string;

  @property({
    type: 'string',
  })
  fotografia?: string;


  @belongsTo(() => Tipovinculacion, {name: 'tiene_tipovinculacion'})
  id_tipovinculacion: number;

  @hasOne(() => Usuarioproponente, {keyTo: 'id_proponente'})
  tiene_un: Usuarioproponente;

  constructor(data?: Partial<Proponente>) {
    super(data);
  }
}

export interface ProponenteRelations {
  // describe navigational properties here
}

export type ProponenteWithRelations = Proponente & ProponenteRelations;
