import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {Http} from "@angular/http";
import { Router, ActivatedRoute, Params } from '@angular/router';
import {CookieService} from 'angular2-cookie/core';

@Component({
  selector: 'app-money-trasfer',
  templateUrl: './money-trasfer.component.html',
  styleUrls: ['./money-trasfer.component.css']
})
export class MoneyTrasferComponent implements OnInit {
  public dataForm:FormGroup;
  private fb;
  private userid;

  public accounts;
  public allaccounts;
  public balancearr;

  private isSubmit;

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
      this.getAllAccountNo();
      this.getBalancearr();
    }

  }

  ngOnInit() {
    this.isSubmit = false;

    this.dataForm = this.fb.group({
      source_account: ["", Validators.required],
      dest_account: ["", Validators.required],
      amount: ["", Validators.required],
      description: [""],
      currency: ["USD"],
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
          this.allaccounts = result.res;
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

  dosubmit(formval){
    this.isSubmit = true;

    if(this.dataForm.valid){
      var link = 'http://132.148.90.242:2007/fundtransfer';
      var data = {source_account: formval.source_account,dest_account: formval.dest_account,amount: formval.amount,description: formval.description,currency: formval.currency};


      this._http.post(link, data)
          .subscribe(res => {

            this.router.navigateByUrl('/dashboard(header:header//left:left)');

          }, error => {
            console.log("Oooops!");
          });
    }

  }

}
