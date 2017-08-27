import { TodosComponent } from './todos.component';
import { TodoService } from './todo.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';

describe('TodosComponent', () => {
  let component: TodosComponent;
  let service: TodoService

  let results = [{ id: 1, title: 'a' },
  { id: 2, title: 'b' },
  { id: 3, title: 'c' }]

  beforeEach(() => {
    service = new TodoService(null); // not going to use the service, so just passing in null
    component = new TodosComponent(service);
  });

  it('should set todos property with the items returned from the server', () => {
    spyOn(service, 'getTodos').and.callFake(() => { // simulating observable that is returned from the service (server). In this case, todo items
      return Observable.from([ [
        { id: 1, title: 'a' },
        { id: 2, title: 'b' },
        { id: 3, title: 'c' }
      ] ]);
    });

    component.ngOnInit(); // act
    console.log(component.todos);
    expect(component.todos.length).toBe(3);
  });


  // seond test, for add()
});