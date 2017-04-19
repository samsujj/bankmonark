import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {CookieService} from 'angular2-cookie/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private userdata:CookieService;
  private userdetails;

  constructor(userdata:CookieService,private router: Router) {
    this.userdata = userdata;
    this.userdetails=this.userdata.getObject('userdetails');


  }

  ngOnInit() {
  }

  gotodashboard(){
    if(this.userdetails.type == 1){
      this.router.navigateByUrl('/admin-dashboard(header:header//left:left)');
    }else{
      this.router.navigateByUrl('/dashboard(header:header//left:left)');
    }
  }

}
