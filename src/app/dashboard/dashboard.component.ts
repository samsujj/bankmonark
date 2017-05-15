import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {Http} from "@angular/http";
import { Router, ActivatedRoute, Params } from '@angular/router';
import {CookieService} from 'angular2-cookie/core';
import {Modal} from "angular2-modal";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private dataForm:FormGroup;
  private fb;
  private userid;

  private isSubmit;

  private userdata:CookieService;

  public userdetails:any;

  public accounts;
  public accountid;
  public balancearr;
  public transaction;

  public modal;

  constructor(fb: FormBuilder,private _http: Http,private router: Router,userdata:CookieService,modal: Modal) {
    this.modal = modal;
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
      this.getAccountNo();
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

  getAccountNo(){
    var link = 'http://132.148.90.242:2007/getAccounts';
    var data = {id : this.userid};

    this._http.post(link, data)
        .subscribe(res => {
          var result = res.json();
          this.accounts = result.res;

          var sdsd:any = this.accounts[0];
          this.accountid = sdsd.account_no;

          this.getMessages();

        }, error => {
          console.log("Oooops!");
        });

  }

  getTransaction(){
    var link = 'http://132.148.90.242:2007/getTransaction';
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

  getFullname(item){
    var fnamearr = [];
    var fullname = '';
    var comapanyname = '';
    if(item.firstname != '')
      fullname += item.firstname;
    if(fullname != '')
      fullname += ' ';
    if(item.lastname != '')
      fullname += item.lastname;
    if(fullname != '')
      fnamearr.push(fullname);
    if(item.company != '' && typeof(item.company) != 'undefined')
      fnamearr.push(item.company);

    return fnamearr.join(' - ');
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

  getMessages(){
    var link = 'http://132.148.90.242:2007/getMessage';
    var data = {accountid : this.accountid};

    this._http.post(link, data)
        .subscribe(res => {
          var result = res.json();
          result = result.res;

          if(result.length){
            var msg = '';

            for(var n in result){
              var resn = result[n];
              if(resn.type == 1){
                var frombalstr='';
                var senderstr='';
                if(resn.frombal)
                  frombalstr = ' sent as '+resn.frombal;
                if(resn.transfer_from){
                  senderstr = resn.transfer_from;
                }else{
                  senderstr = 'Admin';
                }
                msg += '<div>You have received an amount of '+resn.amount+' '+resn.currency+' from '+senderstr+' '+frombalstr+'</div>';
              }
              if(resn.type == 2){
                var tobalstr='';
                var senderstr='';
                if(resn.tobal)
                  tobalstr = ' converted as '+resn.tobal;

                msg += '<div>Your Fund transfer for '+resn.amount+' '+resn.currency+' has been credited to the beneficiary account '+resn.beneficiary+' ('+resn.transfer_to+') '+tobalstr+'</div>';
              }


            }
            this.modal.alert()
                .showClose(true)
                .title('Transfer Details')
                .body(msg)
                .open()
                .then(function (resultPromise) {
                  setTimeout(function(){
                    resultPromise.dismiss();
                  },10000);

                });
          }

        }, error => {
          console.log("Oooops!");
        });
  }

}
