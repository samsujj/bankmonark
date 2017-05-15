import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {Http} from "@angular/http";
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {
  public dataForm:FormGroup;
  private fb;

  private isSubmit;
  private isemailvalidate;
  private passmatchvalidate;
  private alphanpassvalidate;
  private namevalidate;
  private existf;
  private countryList;
  private stateList;

  constructor(fb: FormBuilder,private _http: Http,private router: Router) {
    this.fb = fb;
    this.existf = '';
  }

  ngOnInit() {
    this.isSubmit = false;
    this.isemailvalidate = false;
    this.passmatchvalidate = false;
    this.alphanpassvalidate = false;
    this.namevalidate = false;
    this.stateList = [];

    this.dataForm = this.fb.group({
      firstname: [""],
      lastname: [""],
      company: [""],
      note: [""],
      email: ["", Validators.compose([Validators.required,Validators.email])],
      //email: ["", Validators.email],
      password: ["", Validators.compose([Validators.required, Validators.minLength(8)])],
      confpassword: ["", Validators.required],
      account_no: ["", Validators.required],
      address: ["", Validators.required],
      city: ["", Validators.required],
      country: ["", Validators.required],
      state: ["", Validators.required],
      zip: ["", Validators.required],
      phone: [""],
      account_type: ["Savings"],
      currency: ["USD"],
      initial_fund: ["0"],
    });

    this.getCountry();
  }

  haserrorcls(cntrlname){
    /*if(cntrlname == 'email' && this.isSubmit){
      if(this.dataForm.controls[cntrlname].valid) {
        let emailval = this.dataForm.controls[cntrlname].value;
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailval)) {
          return '';
        } else {
          return 'has-error';
        }
      }
    }*/


    if((cntrlname == 'firstname') && this.isSubmit){
      if(this.dataForm.controls['firstname'].value == '' && this.dataForm.controls['company'].value == '') {
        return 'has-error';
      }else{
        return '';
      }
    }

    if((cntrlname == 'lastname') && this.isSubmit){
      if(this.dataForm.controls['lastname'].value == ''  && this.dataForm.controls['company'].value == '') {
        return 'has-error';
      }else{
        return '';
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

    if(cntrlname == this.existf)
      return 'has-error';

    return '';
  }

  showerrorcls(cntrlname,type='reuired'){
    /*if(cntrlname == 'email' && type == 'validemail' && this.isSubmit){
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
    }*/

    if((cntrlname == 'firstname') && this.isSubmit){
      if(this.dataForm.controls['firstname'].value == '' && this.dataForm.controls['company'].value == '') {
        return '';
      }else{
        return 'hide';
      }
    }

    if((cntrlname == 'lastname') && this.isSubmit){
      if(this.dataForm.controls['lastname'].value == '' && this.dataForm.controls['company'].value == '') {
        return '';
      }else{
        return 'hide';
      }
    }

    if(cntrlname == 'email' && this.isSubmit){
      if(!this.dataForm.controls[cntrlname].valid){
        if(type == 'required'){
          if(this.dataForm.controls[cntrlname].hasError('required')){
            return '';
          }else {
            return 'hide';
          }
        }
        if(type == 'validemail'){
          if(this.dataForm.controls[cntrlname].hasError('email')){
            return '';
          }else {
            return 'hide';
          }
        }
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

    if(cntrlname == 'account_no' && this.isSubmit){
      if(!this.dataForm.controls[cntrlname].valid){
        if(type == 'required'){
          if(this.dataForm.controls[cntrlname].hasError('required')){
            return '';
          }else {
            return 'hide';
          }
        }

        if(type == 'number'){
          if(this.dataForm.controls[cntrlname].hasError('required')){
            return '';
          }else {
            return 'hide';
          }
        }

      }
    }


    if(!this.dataForm.controls[cntrlname].valid && this.isSubmit)
      return '';



    return 'hide';
  }

  showerrorcls1(cntrlname){

    if(cntrlname == this.existf)
      return '';

    return 'hide';
  }

  getCountry(){

    var link = 'http://132.148.90.242:2007/country';
    var data = {};

    this._http.get(link, data)
        .subscribe(res => {
          var result = res.json();
          this.countryList = result.res;
        }, error => {
          console.log("Oooops!");
        });

  }

  getState(stid){
    this.stateList = [];
    var link = 'http://132.148.90.242:2007/statebyid/'+stid;
    var data = {};

    this._http.get(link, data)
        .subscribe(res => {
          var result = res.json();
          this.stateList = result.res;
        }, error => {
          console.log("Oooops!");
        });

  }

  cngCountry(ev){
    (<FormControl>this.dataForm.controls['state']).setValue('');
    this.getState(ev);
  }

  putnumber(event: any) {

    var key = event.which || event.keyCode || event.charCode;

    const pattern = /[0-9\.\ ]/;
    let inputChar = String.fromCharCode(event.charCode);



    if (!pattern.test(inputChar) && key != 8) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }

  dosubmit(formval){

    this.existf = '';

    this.namevalidate=false;
    this.alphanpassvalidate=false;
    this.passmatchvalidate=false;

    if((this.dataForm.controls['firstname'].value != '' && this.dataForm.controls['lastname'].value != '') || this.dataForm.controls['company'].value != ''){
      this.namevalidate = true;
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
    if(this.dataForm.valid && this.passmatchvalidate && this.alphanpassvalidate && this.namevalidate){

      var link = 'http://132.148.90.242:2007/add-user';
      var data = {firstname: formval.firstname,lastname: formval.lastname,email: formval.email,password: formval.password,phone: formval.phone,account_type: formval.account_type,currency: formval.currency,initial_fund: formval.initial_fund,account_no: formval.account_no,address: formval.address,city: formval.city,state: formval.state,zip: formval.zip,company: formval.company,note:formval.note,country:formval.country};


      this._http.post(link, data)
          .subscribe(res => {

            var resul = res.json();

            if(resul.status == 'error'){
              this.existf = resul.errf;
            }else{
              this.router.navigate(['/user-list']);
            }

          }, error => {
            console.log("Oooops!");
          });
    }
  }

}
