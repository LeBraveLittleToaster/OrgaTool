import {Getter, inject} from '@loopback/core';
import {
  DefaultCrudRepository,
  HasManyRepositoryFactory,
  juggler,
  repository,
} from '@loopback/repository';
import {TodoList, TodoListRelations, Todo} from '../models';
import {TodoRepository} from './todo.repository';
import {Filter, Options} from '@loopback/repository';
import {TodoListWithRelations} from '../models';

export class TodoListRepository extends DefaultCrudRepository<
  TodoList,
  typeof TodoList.prototype.id,
  TodoListRelations
> {

  public readonly todos: HasManyRepositoryFactory<
  Todo, 
  typeof TodoList.prototype.id
  >;

  constructor(
    @inject('datasources.db') dataSource: juggler.DataSource,
    @repository.getter(TodoRepository)
    protected todoRepositoryGetter: Getter<TodoRepository>,
  ) {
    super(TodoList, dataSource);
    this.todos = this.createHasManyRepositoryFactoryFor(
      'todos',
      todoRepositoryGetter,
    );
  }
  async find(
    filter?: Filter<TodoList>,
    options?: Options,
  ): Promise<TodoListWithRelations[]> {
    // Prevent juggler for applying "include" filter
    // Juggler is not aware of LB4 relations
    const include = filter && filter.include;
    filter = {...filter, include: undefined};
    const result = await super.find(filter, options);
  
    // poor-mans inclusion resolver, this should be handled by DefaultCrudRepo
    // and use `inq` operator to fetch related todos in fewer DB queries
    // this is a temporary implementation, please see
    // https://github.com/strongloop/loopback-next/issues/3195
    if (include && include.length && include[0].relation === 'todos') {
      await Promise.all(
        result.map(async r => {
          r.todos = await this.todos(r.id).find();
        }),
      );
    }
  
    return result;
  }
  
  async findById(
    id: typeof TodoList.prototype.id,
    filter?: Filter<TodoList>,
    options?: Options,
  ): Promise<TodoListWithRelations> {
    // Prevent juggler for applying "include" filter
    // Juggler is not aware of LB4 relations
    const include = filter && filter.include;
    filter = {...filter, include: undefined};
  
    const result = await super.findById(id, filter, options);
  
    // poor-mans inclusion resolver, this should be handled by DefaultCrudRepo
    // and use `inq` operator to fetch related todos in fewer DB queries
    // this is a temporary implementation, please see
    // https://github.com/strongloop/loopback-next/issues/3195
    if (include && include.length && include[0].relation === 'todos') {
      result.todos = await this.todos(result.id).find();
    }
  
    return result;
  }
}


