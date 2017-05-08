import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {Http} from "@angular/http";
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css']
})
export class EdituserComponent implements OnInit {

  public dataForm:FormGroup;
  private fb;

  private isSubmit;
  private id;

  public namevalidate;

  constructor(fb: FormBuilder,private _http: Http,private router: Router, private route: ActivatedRoute) {
    this.fb = fb;
  }

  ngOnInit() {

    this.namevalidate = false;

    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.getUserdetails();
    },error=>{
      this.router.navigate(['/admin-list']);
    });

    this.isSubmit = false;

    this.dataForm = this.fb.group({
      firstname: [""],
      lastname: [""],
      email: ["", Validators.required],
      company: [""],
      note: [""],
      address: ["", Validators.required],
      city: ["", Validators.required],
      state: ["", Validators.required],
      zip: ["", Validators.required],
      phone: [""],
    });
  }

  haserrorcls(cntrlname){
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

    if(!this.dataForm.controls[cntrlname].valid && this.isSubmit)
      return 'has-error';

    return '';
  }

  showerrorcls(cntrlname,type='reuired'){

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

    if(!this.dataForm.controls[cntrlname].valid && this.isSubmit)
      return '';



    return 'hide';
  }

  getUserdetails(){
    var link = 'http://132.148.90.242:2007/admin-details';
    var data = {_id : this.id};


    this._http.post(link, data)
        .subscribe(res => {
          var result = res.json();
          if(result.status == 'success' && typeof(result.item) != 'undefined'){
            let userdet = result.item;
            (<FormControl>this.dataForm.controls['firstname']).setValue(userdet.firstname);
            (<FormControl>this.dataForm.controls['lastname']).setValue(userdet.lastname);
            (<FormControl>this.dataForm.controls['email']).setValue(userdet.email);
            (<FormControl>this.dataForm.controls['phone']).setValue(userdet.phone);
            (<FormControl>this.dataForm.controls['address']).setValue(userdet.address);
            (<FormControl>this.dataForm.controls['city']).setValue(userdet.city);
            (<FormControl>this.dataForm.controls['state']).setValue(userdet.state);
            (<FormControl>this.dataForm.controls['zip']).setValue(userdet.zip);
            (<FormControl>this.dataForm.controls['company']).setValue(userdet.company);
            (<FormControl>this.dataForm.controls['note']).setValue(userdet.note);
          }else{
            this.router.navigate(['/user-list']);
          }
        }, error => {
          console.log("Oooops!");
        });
  }

  dosubmit(formval){
    this.namevalidate = false;

    if((this.dataForm.controls['firstname'].value != '' && this.dataForm.controls['lastname'].value != '') || this.dataForm.controls['company'].value != ''){
      this.namevalidate = true;
    }

    this.isSubmit = true;
    if(this.dataForm.valid && this.namevalidate){
      var link = 'http://132.148.90.242:2007/edit-user';
      var data = {firstname: formval.firstname,lastname: formval.lastname,phone: formval.phone,address: formval.address,city: formval.city,state: formval.state,zip: formval.zip,id: this.id,company: formval.company,note:formval.note};


      this._http.post(link, data)
          .subscribe(data => {
            this.router.navigate(['/user-list']);
          }, error => {
            console.log("Oooops!");
          });
    }
  }

}
