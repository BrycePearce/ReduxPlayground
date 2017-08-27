
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

export class TodoService { 
  constructor(private http: Http) { 
  }
  // add() takes a todo object, and returns an observable. Which we will fake in our spec with callFake.
  add(todo) {
    return this.http.post('...', todo).map(r => r.json());
  }

  getTodos() { 
    return this.http.get('...').map(r => r.json());
  }

  delete(id) {
    return this.http.delete('...').map(r => r.json());
  }
}