
import { TodoService } from './todo.service'

export class TodosComponent {
  todos: any[] = [];
  message;

  constructor(private service: TodoService) { }

  ngOnInit() {
    this.service.getTodos().subscribe(t => this.todos = t);
  }

  add() {
    var newTodo = { title: '... ' };
    this.service.add(newTodo).subscribe(
      t => this.todos.push(t),
      err => this.message = err);
  }

  // here we test: 1) delete the item if they are sure. 2) do not delete the item if they are not sure
  delete(id) {
    if (confirm('Are you sure?')) // this is a confirmation box
      this.service.delete(id).subscribe();
  }
}
