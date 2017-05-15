import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {Http} from "@angular/http";
import { Router, ActivatedRoute, Params } from '@angular/router';
import {CookieService} from 'angular2-cookie/core';
import {DateModel, DatePickerOptions} from "ng2-datepicker/lib-dist/ng2-datepicker.component";

@Component({
  selector: 'app-statement',
  templateUrl: './statement.component.html',
  styleUrls: ['./statement.component.css']
})
export class StatementComponent implements OnInit {

  private dataForm:FormGroup;
  private fb;
  private userid;

  private isSubmit;

  private userdata:CookieService;

  public userdetails:any;

  public accounts;
  public balancearr;
  public transaction;

  public date: DateModel;
  public options: DatePickerOptions;

  public selacc;
  public selcur;
  public fromd;
  public tod;
  public fromdayin;
  public todayin;
  public todaymin;

  public sttime:number;
  public endtime:number;
  public totaltransaction:number;

  public showStatement;
  public username;
  public companyname;

  public address;
  public city;
  public state;
  public country;
  public userdet;

  public stBalance:number;
  public endBalance:number;
  public moneyIn:number;
  public moneyOut:number;
  public curballance:number;

  constructor(fb: FormBuilder,private _http: Http,private router: Router,userdata:CookieService) {
    this.options = new DatePickerOptions();
    this.fb = fb;
    this.accounts = [];
    this.balancearr = [];
    this.transaction = [];
    let userdata2:any = userdata.getObject('userdetails');

    if(typeof (userdata2) == 'undefined'){
      this.router.navigateByUrl('/login');
    }else{
      this.userid = userdata2._id;

      this.getAccountNo();
      this.getUserDetails();

    }

  }

  ngOnInit() {
    this.fromdayin =  new Date();
    this.fromdayin.setMonth(this.fromdayin.getMonth()-1);
    this.todayin =  new Date();
    this.totaltransaction = 0;
    this.showStatement = false;
    this.stBalance = 0;
    this.endBalance = 0;
    this.moneyIn = 0;
    this.moneyOut = 0;
    this.curballance = 0;

    this.todaymin =this.fromdayin;
  }

  getUserDetails(){
    var link = 'http://132.148.90.242:2007/userdetailsfull';
    var data = {_id : this.userid};


    this._http.post(link, data)
        .subscribe(res => {
          var result = res.json();
          if(result.status == 'success' && typeof(result.item) != 'undefined'){
            let userdet = result.item;


            this.username = '';

            if(userdet.firstname != '')
              this.username += userdet.firstname;
            if(this.username != '')
              this.username += ' ';
            if(userdet.lastname != '')
              this.username += userdet.lastname;

            this.companyname = userdet.company;
            this.address = userdet.address;
            this.city = userdet.city;
            this.state = userdet.state;
            this.country = userdet.country;

            this.userdet = userdet;

          }else{
            this.router.navigate(['/user-list']);
          }
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
          this.selacc = this.accounts[0].account_no;
          this.selcur = this.accounts[0].currency;
        }, error => {
          console.log("Oooops!");
        });

  }

  getTransaction(){
    this.showStatement = false;
    var fromd =  new Date();
    fromd.setMonth(fromd.getMonth()-1);
    fromd.setHours(0);
    fromd.setMinutes(0);
    fromd.setSeconds(0);
    var tod =  new Date();
    if(typeof(this.sttime) == 'undefined'){
      this.sttime = (fromd.getTime()/1000);
    }
    if(typeof(this.endtime) == 'undefined'){
      this.endtime = (tod.getTime()/1000);
    }

    var link = 'http://132.148.90.242:2007/getAllTransaction5';
    var data = {id : this.userid,sttime:this.sttime,endtime:this.endtime,account_no:this.selacc};

    this._http.post(link, data)
        .subscribe(res => {
          this.showStatement = true;
          var result = res.json();
          this.transaction = result.res;
          this.totaltransaction = this.transaction.length;

        }, error => {
          console.log("Oooops!");
        });

  }

  getAllTransaction(){

    this.stBalance = 0;
    this.endBalance = 0;
    this.moneyIn = 0;
    this.moneyOut = 0;

    var link = 'http://132.148.90.242:2007/getAllTransaction9';
    var data = {account_no:this.selacc};

    this._http.post(link, data)
        .subscribe(res => {
          this.showStatement = true;
          var result = res.json();
          var allTransactions = result.res;

          for(let n in allTransactions){
            let transaction = allTransactions[n];
            this.selcur = transaction.currency;

            if(transaction.type == 1 && transaction.status != 3){
              if(this.sttime > transaction.time){
                this.stBalance = this.stBalance + parseFloat(transaction.amount);
                this.curballance = this.stBalance;
              }
              if(this.endtime > transaction.time){
                this.endBalance = this.endBalance + parseFloat(transaction.amount);
              }

              if(this.sttime < transaction.time && this.endtime > transaction.time){
                this.moneyIn = this.moneyIn + parseFloat(transaction.amount);

                this.curballance = this.curballance + parseFloat(transaction.amount);
                transaction.last_balance = this.curballance;
                this.transaction.push(transaction);

              }

            }

            if(transaction.type == 2 && transaction.status != 3){
              if(this.sttime > transaction.time){
                this.stBalance = this.stBalance - parseFloat(transaction.amount);
                this.curballance = this.stBalance;
              }
              if(this.endtime > transaction.time){
                this.endBalance = this.endBalance - parseFloat(transaction.amount);
              }
              if(this.sttime < transaction.time && this.endtime > transaction.time){
                this.moneyOut = this.moneyOut + parseFloat(transaction.amount);

                this.curballance = this.curballance - parseFloat(transaction.amount);
                transaction.last_balance = this.curballance;
                this.transaction.push(transaction);

              }
            }



          }


          //this.getTransaction();

        }, error => {
          console.log("Oooops!");
        });

  }

  getDescription2(item){
    var description = '';
    if(item.type == 1 && item.transfer_from != ''){
      description += 'Transfer money from account: '+item.transfer_from;
    }else if(item.type == 2 && item.transfer_to != ''){
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



  getTrac(){
    var fromd = new Date(this.fromd.year+"-"+this.fromd.month+"-"+this.fromd.day+" 00:00:00");
    this.sttime = (fromd.getTime()/1000);
    var tod = new Date(this.tod.year+"-"+this.tod.month+"-"+this.tod.day+" 23:59:59");
    this.endtime = (tod.getTime()/1000);


    this.getAllTransaction();
  }

  downloadpdf(){
    window.open('http://bankmonarch.westcoastvg.online/pdf.php?user_id='+this.userid+'&account_no='+this.selacc+'&sttime='+this.sttime+'&endtime='+this.endtime);
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

}
