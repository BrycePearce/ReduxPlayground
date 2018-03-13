import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  id: number;

  constructor(private route: ActivatedRoute) { }
  // subscribe to the route params and listen for changes emitted from app.component.ts
  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          // display the new ID in the /user page when it is updated
          this.id = +params['id'];
        }
      );
  }
}
