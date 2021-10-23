import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    foreignKeys: {
      fk_id_departamento5: {
        name: 'fk_id_departamento5',
        entity: 'Departamento',
        entityKey: 'id',
        foreignKey: 'id_departamento',
      },
      fk_id_proponente5: {
        name: 'fk_id_proponente5',
        entity: 'Proponente',
        entityKey: 'id',
        foreignKey: 'id_proponente',
      },
    },
  },
})
export class DepartamentoProponente extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
  })
  id_departamento?: number;

  @property({
    type: 'number',
  })
  id_proponente?: number;

  constructor(data?: Partial<DepartamentoProponente>) {
    super(data);
  }
}

export interface DepartamentoProponenteRelations {
  // describe navigational properties here
}

export type DepartamentoProponenteWithRelations = DepartamentoProponente & DepartamentoProponenteRelations;
