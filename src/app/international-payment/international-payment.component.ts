import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {Http} from "@angular/http";
import { Router, ActivatedRoute, Params } from '@angular/router';
import {CookieService} from 'angular2-cookie/core';

@Component({
  selector: 'app-international-payment',
  templateUrl: './international-payment.component.html',
  styleUrls: ['./international-payment.component.css']
})
export class InternationalPaymentComponent implements OnInit {
  public dataForm:FormGroup;
  private fb;
  private userid;

  public accounts;
  public allaccounts;
  public balancearr;

  private isSubmit;

  private userIdList;
  private userNameList;

  private userdata:CookieService;

  constructor(fb: FormBuilder,private _http: Http,private router: Router,userdata:CookieService) {
    this.fb = fb;
    this.accounts = [];
    this.allaccounts = [];
    this.balancearr = [];
    let userdata2:any = userdata.getObject('userdetails');

    if(typeof (userdata2) == 'undefined'){
      this.router.navigateByUrl('/login');
    }else{
      this.userid = userdata2._id;
      this.getAccountNo();
      this.getUserList();

      this.getBalancearr();
    }

  }

  ngOnInit() {
    this.isSubmit = false;

    this.dataForm = this.fb.group({
      source_account: ["", Validators.required],
      dest_account: ["", Validators.required],
      amount: [0.00, Validators.required],
      description: ["", Validators.required],
      beneficiary: ["", Validators.required],
      bank_name: ["", Validators.required],
      swift_code: ["", Validators.required],
      branch_name: [""],
      currency: ["USD"],
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
          this.userNameList = [];

          for(var n in result){
            this.userIdList.push(result[n]._id);
            var uname = '';
            if(result[n].firstname != '')
              uname += result[n].firstname+' ';
            if(result[n].lastname != '')
              uname += result[n].lastname;
            if(uname != '' && result[n].company != '')
              uname += ' - ';
            if(result[n].company != '')
              uname += result[n].company;
            this.userNameList.push(uname);
          }

          this.getAllAccountNo();

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

        }, error => {
          console.log("Oooops!");
        });

  }
  getAllAccountNo(){
    var link = 'http://132.148.90.242:2007/getOtherAccounts';
    var data = {id : this.userid};

    this._http.post(link, data)
        .subscribe(res => {
          var result = res.json();
          result = result.res;

          for(var n in result){
            var item = result[n];
            if(this.userIdList.indexOf(item.user_id) > -1){
              var uindex = this.userIdList.indexOf(item.user_id);
              item.uname = this.userNameList[uindex];
              this.allaccounts.push(item);
            }
          }


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

  cngAccount(ev){
    var curAccount = ev.target.value;
    for(let n in this.accounts){
      var acc = this.accounts[n];
      if(acc.account_no == curAccount){
        (<FormControl>this.dataForm.controls['currency']).setValue(acc.currency);
      }
    }
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
    this.isSubmit = true;

    if(this.dataForm.valid){
      var link = 'http://132.148.90.242:2007/fundtransfer2';
      var data = {source_account: formval.source_account,dest_account: formval.dest_account,amount: formval.amount,description: formval.description,currency: formval.currency,beneficiary:formval.beneficiary,bank_name: formval.bank_name,branch_name:formval.branch_name,swift_code:formval.swift_code};


      this._http.post(link, data)
          .subscribe(res => {

            this.router.navigateByUrl('/dashboard(header:header//left:left)');

          }, error => {
            console.log("Oooops!");
          });
    }

  }

}
