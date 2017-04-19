import { Component, OnInit } from '@angular/core';
import {CookieService} from 'angular2-cookie/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
  private userdata:CookieService;
  constructor(private router: Router,userdata:CookieService) {
    userdata.remove('userdetails');
    this.router.navigateByUrl('/login');
  }

  ngOnInit() {
  }

}
