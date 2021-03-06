import {Entity, model, property} from '@loopback/repository';

@model({settings: {}})
export class Todo extends Entity {
  @property({
    type: 'number',
    id: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  title: string;

  @property({
    type: 'string',
  })
  desc?: boolean;

  @property({
    type: 'boolean',
  })
  isComplete?: boolean;

  @property()
  todoListId: number;


  constructor(data?: Partial<Todo>) {
    super(data);
  }
}

export interface TodoRelations {
  // describe navigational properties here
  todos?: TodoWithRelations[];
}

export type TodoWithRelations = Todo & TodoRelations;
