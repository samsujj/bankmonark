import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {Http} from "@angular/http";
import { Router, ActivatedRoute, Params } from '@angular/router';
import {CookieService} from 'angular2-cookie/core';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  private dataForm:FormGroup;
  private fb;
  private userid;

  private isSubmit;
  private passmatchvalidate;
  private alphanpassvalidate;
  private showvalidateerror;

  private userdata:CookieService;

  constructor(fb: FormBuilder,private _http: Http,private router: Router,userdata:CookieService) {
    this.fb = fb;

    let userdata2:any = userdata.getObject('userdetails');

    if(typeof (userdata2) == 'undefined'){
      this.router.navigateByUrl('/login');
    }else{
      this.userid = userdata2._id;
    }

  }

  ngOnInit() {
    this.isSubmit = false;
    this.passmatchvalidate = false;
    this.alphanpassvalidate = false;
    this.showvalidateerror = '';

    this.dataForm = this.fb.group({
      oldpassword: ["", Validators.required],
      password: ["", Validators.required],
      confpassword: ["", Validators.required],
    });
  }

  haserrorcls(cntrlname){
    if(cntrlname == 'confpassword' && this.isSubmit){
      if(this.dataForm.controls[cntrlname].valid) {
        if(this.dataForm.controls['password'].value == this.dataForm.controls['confpassword'].value){
          return '';
        }else{
          return 'has-error';
        }
      }
    }

    if(cntrlname == 'password' && this.isSubmit){
      if(this.dataForm.controls[cntrlname].valid) {
        let passval = this.dataForm.controls[cntrlname].value;
        let validerror = 0;
        if(passval.length<8){
          validerror=1;
        }

        if(passval.replace(/[^A-Z]/g, "").length<1){
          validerror=1;
        }

        if(passval.replace(/[^a-z]/g, "").length<1){
          validerror=1;
        }

        if(passval.replace(/[^0-9]/g, "").length<1){
          validerror=1;
        }

        if(passval.replace(/[^!@#$%^&*()_+]/g, "").length<1){
          validerror=1;
        }

        if(validerror == 0){
          return '';
        }else{
          return 'has-error';
        }
      }
    }

    if(!this.dataForm.controls[cntrlname].valid && this.isSubmit)
      return 'has-error';



    return '';
  }

  showerrorcls(cntrlname,type='reuired'){
    if(cntrlname == 'password' && type == 'alphanumeric2' && this.isSubmit){
      if(this.dataForm.controls[cntrlname].valid){
        let passval = this.dataForm.controls[cntrlname].value;
        let validerror = 0;
        if(passval.length<8){
          validerror=1;
        }

        if(passval.replace(/[^A-Z]/g, "").length<1){
          validerror=1;
        }

        if(passval.replace(/[^a-z]/g, "").length<1){
          validerror=1;
        }

        if(passval.replace(/[^0-9]/g, "").length<1){
          validerror=1;
        }

        if(passval.replace(/[^!@#$%^&*()_+]/g, "").length<1){
          validerror=1;
        }

        if(validerror == 0){
          return 'hide';
        }else{
          return '';
        }

      }else {
        return 'hide';
      }
    }

    if(cntrlname == 'confpassword' && type == 'match' && this.isSubmit){
      if(this.dataForm.controls[cntrlname].valid){
        if(this.dataForm.controls['password'].value == this.dataForm.controls['confpassword'].value){
          return 'hide';
        }else{
          return '';
        }
      }else {
        return 'hide';
      }
    }


    if(!this.dataForm.controls[cntrlname].valid && this.isSubmit)
      return '';



    return 'hide';
  }

  dosubmit(formval){

    this.passmatchvalidate = false;
    this.alphanpassvalidate = false;
    this.showvalidateerror = '';

    let supradmin = 0;

    if(formval.supradmin){
      supradmin = 1;
    }

    if(this.dataForm.controls['password'].value == this.dataForm.controls['confpassword'].value){
      this.passmatchvalidate = true;
    }

    let passval = this.dataForm.controls['password'].value;
    let validerror = 0;

    if(passval != ''){
      let validerror = 0;
      if(passval.length<8){
        validerror=1;
      }

      if(passval.replace(/[^A-Z]/g, "").length<1){
        validerror=1;
      }

      if(passval.replace(/[^a-z]/g, "").length<1){
        validerror=1;
      }

      if(passval.replace(/[^0-9]/g, "").length<1){
        validerror=1;
      }

      if(passval.replace(/[^!@#$%^&*()_+]/g, "").length<1){
        validerror=1;
      }

      if(validerror == 0){
        this.alphanpassvalidate = true;
      }
    }

    this.isSubmit = true;
    if(this.dataForm.valid && this.passmatchvalidate && this.alphanpassvalidate){

      var link = 'http://132.148.90.242:2007/change-password';
      var data = {userid:this.userid ,oldpassword: formval.oldpassword,newpassword: formval.password};


      this._http.post(link, data)
          .subscribe(res => {

            var result = res.json();

            if(result.status == 'error'){
              this.showvalidateerror = result.msg;
            }else{
              this.router.navigate(['/my-profile']);
            }

          }, error => {
            console.log("Oooops!");
          });
    }
  }

}
