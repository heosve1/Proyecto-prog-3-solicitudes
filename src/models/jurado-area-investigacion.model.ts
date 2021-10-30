import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    foreignKeys: {
      fk_id_areainvestigacion: {
        name: 'fk_id_areainvestigacion',
        entity: 'Areainvestigacion',
        entityKey: 'id',
        foreignKey: 'id_areainvestigacion',
      },
      fk_id_jurado2: {
        name: 'fk_id_jurado2',
        entity: 'Jurado',
        entityKey: 'id',
        foreignKey: 'id_jurado',
      },
    },
  },
})
export class JuradoAreaInvestigacion extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
  })
  id_areainvestigacion?: number;

  @property({
    type: 'number',
  })
  id_jurado?: number;

  constructor(data?: Partial<JuradoAreaInvestigacion>) {
    super(data);
  }
}

export interface JuradoAreaInvestigacionRelations {
  // describe navigational properties here
}

export type JuradoAreaInvestigacionWithRelations = JuradoAreaInvestigacion & JuradoAreaInvestigacionRelations;
