import { Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  template: '<div class="container-fluid dashboard_body"><router-outlet name="header"></router-outlet><div class="row rowmaindiv"><router-outlet name="left"></router-outlet><router-outlet></router-outlet><div class="clearfix"></div></div></div>',
  //templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
}
