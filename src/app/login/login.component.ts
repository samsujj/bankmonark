import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {Http} from "@angular/http";
import { Router, ActivatedRoute, Params } from '@angular/router';
import {CookieService} from 'angular2-cookie/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public dataForm:FormGroup;
  private fb;

  private isSubmit;
  private isemailvalidate;
  public is_error;
  public error_msg;

  private userdata:CookieService;
  private currenttime:CookieService;
  private userdetails;

  private ipaddress;

  constructor(fb: FormBuilder,private _http: Http,private router: Router, private route: ActivatedRoute,userdata:CookieService,currenttime:CookieService) {
    this.fb = fb;
    this.userdata = userdata;
    this.currenttime = currenttime;
    this.userdetails=this.userdata.getObject('userdetails');

    console.log(this.userdata.getObject('loginredirect'));

    if(typeof (this.userdetails) != 'undefined'){
      if(this.userdetails.type == 1){

        if(typeof(this.userdata.getObject('loginredirect')) != 'undefined'){
          var loginredirect = this.userdata.getObject('loginredirect');
          this.userdata.remove('loginredirect');
          this.router.navigateByUrl('/'+loginredirect+'(header:header//left:left)');
        }else{
          this.router.navigateByUrl('/admin-dashboard(header:header//left:left)');
        }
      }else{
        this.router.navigateByUrl('/dashboard(header:header//left:left)');
      }
    }

  }

  ngOnInit() {

    this.isSubmit = false;
    this.isemailvalidate = false;
    this.ipaddress = '';

    this.getIp();

    this.dataForm = this.fb.group({
      email: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  getIp(){
    var link = 'ip.php';
    var data = {};

    this._http.get(link, data)
        .subscribe(data => {

          this.ipaddress = data.text();

        }, error => {
          console.log("Oooops!");
        });

  }

  haserrorcls(cntrlname){
    if(!this.dataForm.controls[cntrlname].valid && this.isSubmit)
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

    this.isSubmit = true;

    if(this.dataForm.valid){
      var link = 'http://132.148.90.242:2007/login';
      var data = {email: formval.email,password: formval.password,ipaddress:this.ipaddress};


      this._http.post(link, data)
          .subscribe(data => {
            //this.router.navigate(['/admin-list']);

            var data2 = data.json();

            if(data2.status == 'success'){

              if(data2.item.supradmin == 1){
                this.userdata.putObject('userdetails', data2.item);
                this.currenttime.putObject('currenttime', Math.floor(Date.now()));
                if(typeof(this.userdata.getObject('loginredirect')) != 'undefined'){
                  var loginredirect = this.userdata.getObject('loginredirect');
                  this.userdata.remove('loginredirect');
                  this.router.navigateByUrl('/'+loginredirect+'(header:header//left:left)');
                }else{
                  this.router.navigateByUrl('/admin-dashboard(header:header//left:left)');
                }
              }else{
                this.userdata.putObject('userdetailstemp', data2.item);
                this.router.navigateByUrl('/login-verification');
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
