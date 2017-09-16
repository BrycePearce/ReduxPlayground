import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  hobby = ['sportsball', 'baskethoop', 'runcatch']
  signupForm: FormGroup;

  ngOnInit() {
    this.signupForm = new FormGroup({
      'userdata': new FormGroup({
        'email': new FormControl(null, [Validators.required, Validators.email]), // Just an example of how to handle form inputs with nested forms
      }),
      'username': new FormControl(null, Validators.required),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([]) /* an array of hobbies, starting as 0 hobbies, but could include some defaults here*/
    });

    // set default form values
    this.signupForm.setValue({
      'userdata': {
        'email': 'node@test.com'
      },
        'username': 'Node',
        'gender':'male',
        'hobbies': [] // should probably populate hobbies here instead of at array hobby
    });
  /*
    // you can do the following to listen to any changes in the forms/fields
    this.signupForm.valueChanges.subscribe( // form value changes
      (value) => console.log(value)
    );

    this.signupForm.statusChanges.subscribe( // form status changes
      (status) => console.log(status)
    );
  */

  }

  onSubmit() {
    console.log(this.signupForm);
    this.signupForm.reset(); // can set specific values here, if you don't want to clear certain fields
  }
  onAddHobby() {
    const control = new FormControl([], Validators.required); // replacing 'null' here would pre-populate every hobby form value
    (<FormArray>this.signupForm.get('hobbies')).push(control); /* since this is an array control, we need to explicitly cast it as FormArray, so that we can push*/
  }
}
