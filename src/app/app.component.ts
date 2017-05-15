import { Component, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import {Routes, RouterModule, Router, RoutesRecognized,ActivatedRoute} from '@angular/router';
import {CookieService} from "angular2-cookie/services/cookies.service";
import {Overlay, overlayConfigFactory, DialogRef, ModalModule} from 'angular2-modal';
import {Modal, BSModalContext, providers, BSMessageModal, TwoButtonPreset} from 'angular2-modal/plugins/bootstrap';

@Component({
  selector: 'app-root',
  template: '<span defaultOverlayTarget></span><div class="container-fluid dashboard_body"><router-outlet name="header"></router-outlet><div class="row rowmaindiv"><router-outlet name="left"></router-outlet><router-outlet></router-outlet><div class="clearfix"></div></div></div>',
  //templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [Modal]
})
export class AppComponent {

  title = 'app works!';

  public currenttime;
  public userdata;
  public intv;
  public urlList:any;

  constructor(private router: Router,userdata:CookieService,public modal: Modal) {

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
          userdata.putObject('currenttime', Math.floor(Date.now()));




          this.intv = setInterval(function() {
            var prevtime:any= userdata.getObject('currenttime');
            var curtime = Math.floor(Date.now());
            var diff2:any = curtime-prevtime;
            diff2 = diff2/1000;
            diff2 = parseInt(diff2);

            if(diff2 == 600){
              //router.navigateByUrl('/logout');
              modal.confirm()
                  .showClose(true)
                  .title('Session Expired')
                  .body(`<h4>You will automatically logged out in 1 min.  Please click here to stay logged in!</h4>`)
                  .open()
                  .then(function (resultPromise) {
                    resultPromise.result.then( (result) => {
                          userdata.putObject('currenttime', Math.floor(Date.now()));
                        },
                        () => {
                          router.navigateByUrl('/logout');
                        });

                    setTimeout(function(){
                      resultPromise.dismiss();
                    },60000);

                  })
            }

            /*if(diff2 == 30){
              modal.t;
            }*/

            /*if(diff2 == 600){
              router.navigateByUrl('/logout');
            }*/

          }, 1000);
        }


      }

    });
  }

}
