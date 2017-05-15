import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {Http} from "@angular/http";
import { Router, ActivatedRoute, Params } from '@angular/router';
import {CookieService} from 'angular2-cookie/core';
import {DateModel, DatePickerOptions} from "ng2-datepicker/lib-dist/ng2-datepicker.component";

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit {

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

  public fromd;
  public tod;
  public fromdayin;
  public todayin;
  public todaymin;

  public sttime:number;
  public endtime:number;

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
      this.getTransaction();

    }

  }

  ngOnInit() {
    this.fromdayin =  new Date();
    this.fromdayin.setMonth(this.fromdayin.getMonth()-1);
    this.todayin =  new Date();

    this.todaymin =this.fromdayin;
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

  getTransaction(){
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

    var link = 'http://132.148.90.242:2007/getAllTransaction';
    var data = {id : this.userid,sttime:this.sttime,endtime:this.endtime};

    this._http.post(link, data)
        .subscribe(res => {
          var result = res.json();
          this.transaction = result.res;

        }, error => {
          console.log("Oooops!");
        });

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

  getTrac(){
    var fromd = new Date(this.fromd.year+"-"+this.fromd.month+"-"+this.fromd.day+" 00:00:00");
    this.sttime = (fromd.getTime()/1000);
    var tod = new Date(this.tod.year+"-"+this.tod.month+"-"+this.tod.day+" 23:59:59");
    this.endtime = (tod.getTime()/1000);

    this.getTransaction();
  }

}
