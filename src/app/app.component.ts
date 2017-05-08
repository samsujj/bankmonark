import { Component } from '@angular/core';
import {Routes, RouterModule, Router, RoutesRecognized,ActivatedRoute} from '@angular/router';
import {CookieService} from "angular2-cookie/services/cookies.service";

@Component({
  selector: 'app-root',
  template: '<div class="container-fluid dashboard_body"><router-outlet name="header"></router-outlet><div class="row rowmaindiv"><router-outlet name="left"></router-outlet><router-outlet></router-outlet><div class="clearfix"></div></div></div>',
  //templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';

  public currenttime;
  public userdata;
  public intv;
  public urlList:any;

  constructor(private router: Router,userdata:CookieService) {
    this.userdata = userdata;
    this.urlList = ['dashboard','admin-dashboard','admin-list','add-admin','edit-admin','user-list','add-user','money-transfer','add-fund','transaction-list','all-transaction-list','statement','ip-track','my-profile','update-profile','change-password','currency','edit-user'];


    router.events.subscribe((val) => {

      if(val instanceof RoutesRecognized){

        var curl = val.url;
        curl = curl.replace('/', '');
        curl = curl.replace('(', '');
        curl = curl.replace(')', '');
        curl = curl.replace('header:header', '');
        curl = curl.replace('//', '');
        curl = curl.replace('left:left', '');

        var curlarr = curl.split('/');

        var ccurl = curlarr[0];

        clearInterval(this.intv);

        if(this.urlList.indexOf(ccurl) > -1){
          this.userdata.putObject('currenttime', Math.floor(Date.now()));
          var prevtime=this.userdata.getObject('currenttime');
          this.intv = setInterval(function() {
            var curtime = Math.floor(Date.now());
            var diff2:any = curtime-prevtime;
            diff2 = diff2/1000;
            diff2 = parseInt(diff2);
            console.log(diff2);
            if(diff2 > 300){
              router.navigateByUrl('/logout');
            }

          }, 1000);
        }


      }

    });
  }

}
