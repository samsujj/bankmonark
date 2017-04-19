import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {Http} from "@angular/http";
import { Router, ActivatedRoute, Params } from '@angular/router';
import {CookieService} from 'angular2-cookie/core';

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
      this.getBalancearr();
      this.getAccountNo();
      this.getTransaction();

    }

  }

  ngOnInit() {
  }

  getUserDetails(){
    var link = 'http://132.148.90.242:2007/admin-details';
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

  getAccountNo(){
    var link = 'http://132.148.90.242:2007/getAllAccounts';
    var data = {id : this.userid};

    this._http.post(link, data)
        .subscribe(res => {
          var result = res.json();
          this.accounts = result.res;
          console.log(this.accounts);
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
      return balance;
    }

  }

  getDescription2(item){
    var description = '';
    if(item.type == 1 && item.transfer_from != ''){
      description += 'Transfer money from account: '+item.transfer_from;
    }

    if(item.type == 2 && item.transfer_to != ''){
      description += 'Transfer money to account: '+item.transfer_to;
    }

    return description;
  }

  getStatus(item){
    if(item.status == 1)
      return 'Complete';
    if(item.status == 2)
      return 'Not Complete';
    if(item.status == 3)
      return 'Cancelled';
    if(item.status == 4)
      return 'Approved';

    return '';
  }

}
