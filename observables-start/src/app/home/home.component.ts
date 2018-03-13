import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { Observer } from 'rxjs/Rx';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // Pt.2 Baisc example of firing an observable, and listening for the response.
    // emit an observable every second
    //  const myNumbers = Observable.interval(1000);

    // Subscribe to the observable
    // myNumbers.subscribe(
    //   (number: number) => {
    //     console.log(number);
    //   });


  //   // Pt.3 Creating your own observable and subscribing to it
  //   // Setup the observable
  //   const myObservable = Observable.create((observer: Observer<string>) => {
  //     setTimeout(() => {
  //       observer.next('first package'); // next tells the observable to move on, but do not have to have it here since the timeout will end after 2 seconds.
  //     }, 2000);
  //     setTimeout(() => {
  //       observer.next('second package');
  //     }, 4000);
  //     setTimeout(() => {
  //       // observer.error('this does not work');
  //       observer.complete();
  //     }, 5000);
  //   });

  //   // Subscribe to the observable
  //   myObservable.subscribe(
  //     (data: string) => { console.log(data); },
  //     (error: string) => { console.log(error); },
  //     () => { console.log('completed'); }
  //   );
  // }

}
