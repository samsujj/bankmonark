import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {Http} from "@angular/http";
import { Router, ActivatedRoute, Params } from '@angular/router';
import {CookieService} from 'angular2-cookie/core';

@Component({
  selector: 'app-addadmin',
  templateUrl: './addadmin.component.html',
  styleUrls: ['./addadmin.component.css']
})
export class AddadminComponent implements OnInit {

  public dataForm:FormGroup;
  private fb;

  private isSubmit;
  private isemailvalidate;
  private passmatchvalidate;
  private alphanpassvalidate;

  public superAdmin;

  constructor(fb: FormBuilder,private _http: Http,private router: Router,userdata:CookieService) {
    this.fb = fb;
    let userdata2:any = userdata.getObject('userdetails');

    if(typeof (userdata2) == 'undefined'){
      this.router.navigateByUrl('/login');
    }else{
      if(userdata2.supradmin == 1){
        this.superAdmin = 1;
      }else{
        this.superAdmin = 0;
      }

    }
  }

  ngOnInit() {
    this.isSubmit = false;
    this.isemailvalidate = false;
    this.passmatchvalidate = false;
    this.alphanpassvalidate = false;

    this.dataForm = this.fb.group({
      firstname: ["", Validators.required],
      lastname: ["", Validators.required],
      email: ["", Validators.required],
      password: ["", Validators.required],
      confpassword: ["", Validators.required],
      address: ["", Validators.required],
      city: ["", Validators.required],
      state: ["", Validators.required],
      zip: ["", Validators.required],
      phone: [""],
      supradmin: [0],
    });
  }

  haserrorcls(cntrlname){
    if(cntrlname == 'email' && this.isSubmit){
      if(this.dataForm.controls[cntrlname].valid) {
        let emailval = this.dataForm.controls[cntrlname].value;
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailval)) {
          return '';
        } else {
          return 'has-error';
        }
      }
    }
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
    if(cntrlname == 'email' && type == 'validemail' && this.isSubmit){
      if(this.dataForm.controls[cntrlname].valid){
        let emailval = this.dataForm.controls[cntrlname].value;
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailval)){
          return 'hide';
        }else{
          return '';
        }
      }else {
        return 'hide';
      }
    }

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

    /*if(cntrlname == 'password' && this.isSubmit){
      if(!this.dataForm.controls[cntrlname].valid){
        if(type == 'required'){
          if(this.dataForm.controls[cntrlname].hasError('required')){
            return '';
          }else {
            return 'hide';
          }
        }
      }
    }*/

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

    let supradmin = 0;

    if(formval.supradmin){
      supradmin = 1;
    }

    if(this.dataForm.controls['password'].value == this.dataForm.controls['confpassword'].value){
      this.passmatchvalidate = true;
    }

    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.dataForm.controls['email'].value)){
      this.isemailvalidate = true;
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
    if(this.dataForm.valid && this.isemailvalidate && this.passmatchvalidate && this.alphanpassvalidate){

      var link = 'http://132.148.90.242:2007/add-admin';
      var data = {firstname: formval.firstname,lastname: formval.lastname,email: formval.email,password: formval.password,phone: formval.phone,address: formval.address,city: formval.city,state: formval.state,zip: formval.zip,supradmin:supradmin};


      this._http.post(link, data)
          .subscribe(res => {
            this.router.navigate(['/admin-list']);


          }, error => {
            console.log("Oooops!");
          });
    }
  }


}
