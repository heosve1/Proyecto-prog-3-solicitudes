import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    foreignKeys: {
      fk_id_proponente73: {
        name: 'fk_id_proponente73',
        entity: 'Proponente',
        entityKey: 'id',
        foreignKey: 'id_proponente',
      }
    }
  }
})
export class Usuarioproponente extends Entity {
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
  usuario: string;

  @property({
    type: 'string',
    required: true,
  })
  clave: string;

  @property({
    type: 'number',
  })
  id_proponente?: number;

  constructor(data?: Partial<Usuarioproponente>) {
    super(data);
  }
}

export interface UsuarioproponenteRelations {
  // describe navigational properties here
}

export type UsuarioproponenteWithRelations = Usuarioproponente & UsuarioproponenteRelations;
