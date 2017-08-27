// arrange, act, assertion

import { TodosComponent } from './todos.component';
import { TodoService } from './todo.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/throw';

describe('TodosComponent', () => {
  // this is testing ngOnInit
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
    spyOn(service, 'getTodos').and.callFake(() => { // simulating observable that is returned from the service (server). In this case, todo items.
      return Observable.from([[
        { id: 1, title: 'a' },
        { id: 2, title: 'b' },
        { id: 3, title: 'c' }
      ]]);
    });

    component.ngOnInit(); // act

    expect(component.todos.length).toBe(3); // Assertion. 
  });


  // second test, for add(), making sure that the add service is called.
  it('should call the server to save the changes when a new todo item is added', () => {
    let spy = spyOn(service, 'add').and.callFake(t => { // we use spy, because we don't really want to call the server, just ensure that service.add is called. We use callFake to do this (see details in todo.service) ; t = todo
      return Observable.empty(); // Again, we don't care about what's returned from the observable. We just want to make sure the add method is called, so we do .empty()
    });

    component.add(); // act (test)

    expect(spy).toHaveBeenCalled(); // Assertion. We test to see if add() has been called
  });


  // In this test we check if add() appropriately handles adding the returned todo object, to our array. (pushed on on L17 in component.ts)
  it('should add the new todo returned from the server', () => {
    let todo = { id: 1 }; // fake todo response object. We don't care what the service actually returns, we are just making sure whatever it is gets added correctly.

    let spy = spyOn(service, 'add').and.returnValue(Observable.from([todo])); // we could use callFake instead of returnValue, but this is a bit cleaner.

    component.add(); // act (test)

    expect(component.todos.indexOf(todo)).toBeGreaterThan(-1); // ensuring that todo object that is returned from the server, is in our array.
  });



  // In this test, we are creating a test case to make sure our error case works, while adding a new todo. (E.g. L18 in component.ts)
  // As always, we are just testing to make sure the error code is working. 
  it('should set the message property if server returns an error when adding a new todo', () => {
    let error = 'error from the server'; // spoof an error message that the service might respond with
    let spy = spyOn(service, 'add').and.returnValue(Observable.throw(error)); // simulate the throwing of an error message. It "throws", so it knows it's an error.

    component.add(); // act (test)

    expect(component.message).toBe(error); // make sure the returned error is what we expect it is.
  });
});