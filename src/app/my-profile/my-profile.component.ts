import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {Http} from "@angular/http";
import { Router, ActivatedRoute, Params } from '@angular/router';
import {CookieService} from 'angular2-cookie/core';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  private dataForm:FormGroup;
  private fb;
  private userid;

  private userdata:CookieService;

  public userdetails:any;

  constructor(fb: FormBuilder,private _http: Http,private router: Router,userdata:CookieService) {
    this.fb = fb;

    let userdata2:any = userdata.getObject('userdetails');

    if(typeof (userdata2) == 'undefined'){
      this.router.navigateByUrl('/login');
    }else{
      this.userid = userdata2._id;

      this.getUserDetails();

    }

  }

  ngOnInit() {
  }

  getUserDetails(){
    var link = 'http://132.148.90.242:2007/userdetailsfull';
    var data = {_id : this.userid};


    this._http.post(link, data)
        .subscribe(res => {
          var result = res.json();
          if(result.status == 'success' && typeof(result.item) != 'undefined'){
            let userdet = result.item;

            this.userdetails = userdet;

          }else{
            this.router.navigate(['/user-list']);
          }
        }, error => {
          console.log("Oooops!");
        });
  }

  getStateName(item){
    var statedet = item.statedet;

    if(statedet.length){
      if(typeof(statedet[0]) != 'undefined'){
        return statedet[0]['s_st_name'];
      }
    }
    return '';
  }

  getCountryName(item){
    var countrydet = item.countrydet;

    if(countrydet.length){
      if(typeof(countrydet[0]) != 'undefined'){
        return countrydet[0]['s_name'];
      }
    }
    return '';
  }



}
