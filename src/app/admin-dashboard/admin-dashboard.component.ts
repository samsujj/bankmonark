import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {Http} from "@angular/http";
import { Router, ActivatedRoute, Params } from '@angular/router';
import {CookieService} from 'angular2-cookie/core';
import {forEach} from "@angular/router/src/utils/collection";

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  private dataForm:FormGroup;
  private fb;
  private userid;

  private isSubmit;

  private userdata:CookieService;

  public userdetails:any;

  public accounts;
  public balancearr;
  public transaction;
  private userIdList;

  constructor(fb: FormBuilder,private _http: Http,private router: Router,userdata:CookieService) {
    this.fb = fb;
    this.accounts = [];
    this.balancearr = [];
    this.transaction = [];
    let userdata2:any = userdata.getObject('userdetails');

    if(typeof (userdata2) == 'undefined'){
      this.router.navigateByUrl('/login');
    }else{
      this.userid = userdata2._id;

      this.getUserDetails();
      this.getUserList();
      this.getBalancearr();

      this.getTransaction();

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

  getBalancearr(){
    var link = 'http://132.148.90.242:2007/balance';
    var data = {id : this.userid};

    this._http.post(link, data)
        .subscribe(res => {
          var result = res.json();
          this.balancearr = result.res;
        }, error => {
          console.log("Oooops!");
        });
  }

  getUserList(){
    var link = 'http://132.148.90.242:2007/user-list';
    var data = {};


    this._http.post(link, data)
        .subscribe(res => {
          var result = res.json();

          result = result.res;

          this.userIdList = [];

          for(var n in result){
            this.userIdList.push(result[n]._id);
          }

          this.getAccountNo();

        }, error => {
          console.log("Oooops!");
        });
  }

  getAccountNo(){
    var link = 'http://132.148.90.242:2007/getAllAccounts';
    var data = {id : this.userid};

    this._http.post(link, data)
        .subscribe(res => {
          var result = res.json();
          this.accounts = result.res;
        }, error => {
          console.log("Oooops!");
        });

  }

  getTransaction(){
    var link = 'http://132.148.90.242:2007/getTransaction2';
    var data = {id : this.userid};

    this._http.post(link, data)
        .subscribe(res => {
          var result = res.json();
          this.transaction = result.res;
        }, error => {
          console.log("Oooops!");
        });

  }

  getAcBal(account_no){
    var balance = this.balancearr[account_no];

    if(typeof (balance) == 'undefined'){
      return 0;
    }else{
      return balance.toFixed(2);
    }

  }

  getDescription2(item){
    var description = '';
    if(item.type == 1 && item.transfer_from != ''){
      description += 'Transfer money from account: '+item.transfer_from;
    }else if((item.type == 2 || item.type == 3) && item.transfer_to != ''){
      description += 'Transfer money to account: '+item.transfer_to;
    }else{
      description = 'Added by Admin';
    }

    return description;
  }



  getStatus(item){
    if(item.status == 1)
      return 'Complete';
    if(item.status == 2)
      return 'Creation';
    if(item.status == 3)
      return 'Cancelled';
    if(item.status == 4)
      return 'Verification';

    return '';
  }

  getAccountStatus(item){
    if(this.userIdList.indexOf(item.user_id) > -1){
      return 'Active';
    }else{
      return 'Inactive';
    }
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
