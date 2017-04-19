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

  constructor(fb: FormBuilder,private _http: Http,private router: Router, private route: ActivatedRoute) {
    this.fb = fb;
  }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.getUserdetails();
    },error=>{
      this.router.navigate(['/admin-list']);
    });

    this.isSubmit = false;

    this.dataForm = this.fb.group({
      firstname: ["", Validators.required],
      lastname: ["", Validators.required],
      email: ["", Validators.required],
      address: ["", Validators.required],
      city: ["", Validators.required],
      state: ["", Validators.required],
      zip: ["", Validators.required],
      phone: [""],
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
          }else{
            this.router.navigate(['/user-list']);
          }
        }, error => {
          console.log("Oooops!");
        });
  }

  dosubmit(formval){
    this.isSubmit = true;
    if(this.dataForm.valid){
      var link = 'http://132.148.90.242:2007/edit-user';
      var data = {firstname: formval.firstname,lastname: formval.lastname,phone: formval.phone,address: formval.address,city: formval.city,state: formval.state,zip: formval.zip,id: this.id};


      this._http.post(link, data)
          .subscribe(data => {
            this.router.navigate(['/user-list']);
          }, error => {
            console.log("Oooops!");
          });
    }
  }

}
