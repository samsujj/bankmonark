import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {Http} from "@angular/http";
import { Router, ActivatedRoute, Params } from '@angular/router';
import {CookieService} from 'angular2-cookie/core';

@Component({
  selector: 'app-login-verification',
  templateUrl: './login-verification.component.html',
  styleUrls: ['./login-verification.component.css']
})
export class LoginVerificationComponent implements OnInit {
  public dataForm:FormGroup;
  private fb;
  public userid;
  public userdet;
  public is_error;
  public error_msg;

  private isSubmit;

  private userdata:CookieService;
  private currenttime:CookieService;

  public userdetails:any;

  constructor(fb: FormBuilder,private _http: Http,private router: Router,userdata:CookieService,currenttime:CookieService) {
    this.fb = fb;
    this.userdata = userdata;
    this.currenttime = currenttime;
    this.userdetails=this.userdata.getObject('userdetails');
    let userdata2:any = userdata.getObject('userdetailstemp');

    if(typeof (userdata2) == 'undefined'){
      this.router.navigateByUrl('/login');
    }else{
      this.userid = userdata2._id;
      this.userdet = userdata2;
    }
  }

  ngOnInit() {
    this.is_error = 0;
    this.error_msg = '';
    this.isSubmit = false;
    this.dataForm = this.fb.group({
      access_code: ["", Validators.required],
    });
  }

  haserrorcls(cntrlname){
    if(!this.dataForm.controls[cntrlname].valid && this.isSubmit)
      return 'has-error';

    if(this.is_error == 1)
      return 'has-error';

    return '';
  }

  showerrorcls(cntrlname,type='reuired'){
    if(!this.dataForm.controls[cntrlname].valid && this.isSubmit)
      return '';



    return 'hide';
  }

  dosubmit(formval){
    this.is_error = 0;
    this.error_msg = '';

    this.isSubmit = true;

    if(this.dataForm.valid){
      var link = 'http://132.148.90.242:2007/login2';
      var data = {id: this.userid,access_code: formval.access_code};


      this._http.post(link, data)
          .subscribe(data => {

            var data2 = data.json();
            if(data2.status == 'success'){
              this.userdata.putObject('userdetails', this.userdet);
              this.currenttime.putObject('currenttime', Math.floor(Date.now()));
              if(this.userdet.type == 1){
                if(typeof(this.userdata.getObject('loginredirect')) != 'undefined'){
                  var loginredirect = this.userdata.getObject('loginredirect');
                  this.userdata.remove('loginredirect');
                  this.router.navigateByUrl('/'+loginredirect+'(header:header//left:left)');
                }else {
                  this.router.navigateByUrl('/admin-dashboard(header:header//left:left)');
                }
              }else{
                this.router.navigateByUrl('/dashboard(header:header//left:left)');
              }

            }else{
              this.is_error = 1;
              this.error_msg = data2.msg;
            }

          }, error => {
            console.log("Oooops!");
          });
    }

  }

}
