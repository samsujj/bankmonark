import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {Http} from "@angular/http";
import { Router, ActivatedRoute, Params } from '@angular/router';
import {CookieService} from 'angular2-cookie/core';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  public dataForm:FormGroup;
  private fb;

  private isSubmit;
  public error_msg;

  constructor(fb: FormBuilder,private _http: Http,private router: Router,userdata:CookieService) {
    this.fb = fb;
  }

  ngOnInit() {
    this.isSubmit = false;
    this.error_msg = '';

    this.dataForm = this.fb.group({
      email: ["", Validators.required],
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

    this.isSubmit = true;
    this.error_msg = '';

    if(this.dataForm.valid){
      var link = 'http://132.148.90.242:2007/forgot-password';
      var data = {email: formval.email};


      this._http.post(link, data)
          .subscribe(data => {
            var data2 = data.json();

            this.error_msg = data2.msg;

          }, error => {
            console.log("Oooops!");
          });
    }
  }

}
