import {Entity, model, property, hasMany} from '@loopback/repository';
import {Areainvestigacion} from './areainvestigacion.model';
import {JuradoInvestigacion} from './jurado-investigacion.model';

@model()
export class Jurado extends Entity {
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

  @property({
    type: 'string',
    required: true,
  })
  apellidos: string;

  @property({
    type: 'string',
    required: true,
  })
  telefono: string;

  @property({
    type: 'string',
    required: true,
  })
  correo: string;

  @property({
    type: 'string',
    required: true,
  })
  entidad: string;

  @hasMany(() => Areainvestigacion, {through: {model: () => JuradoInvestigacion, keyFrom: 'id_jurado', keyTo: 'id_areainvestigacion'}})
  areainvestigaciones: Areainvestigacion[];

  constructor(data?: Partial<Jurado>) {
    super(data);
  }
}

export interface JuradoRelations {
  // describe navigational properties here
}

export type JuradoWithRelations = Jurado & JuradoRelations;
