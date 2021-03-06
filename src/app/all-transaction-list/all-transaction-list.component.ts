import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {Http} from "@angular/http";
import { Router, ActivatedRoute, Params } from '@angular/router';
import {CookieService} from 'angular2-cookie/core';
import {DateModel, DatePickerOptions} from "ng2-datepicker/lib-dist/ng2-datepicker.component";
import {Modal} from "angular2-modal";

@Component({
  selector: 'app-all-transaction-list',
  templateUrl: './all-transaction-list.component.html',
  styleUrls: ['./all-transaction-list.component.css']
})
export class AllTransactionListComponent implements OnInit {

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

  public modal;

  constructor(fb: FormBuilder,private _http: Http,private router: Router,userdata:CookieService,modal: Modal) {
    this.modal = modal;
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

    var link = 'http://132.148.90.242:2007/getAllTransaction2';
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

  getStatusLink(item){
    var htmstr = '';
    if(item.status == 2){
      htmstr += '<a href="javascript:void(0)">Approve</a>';
      htmstr += '<a href="javascript:void(0)">Cancel</a>';
    }

    return htmstr;
  }

  getTrac(){
    var fromd = new Date(this.fromd.year+"-"+this.fromd.month+"-"+this.fromd.day+" 00:00:00");
    this.sttime = (fromd.getTime()/1000);
    var tod = new Date(this.tod.year+"-"+this.tod.month+"-"+this.tod.day+" 23:59:59");
    this.endtime = (tod.getTime()/1000);

    this.getTransaction();
  }

  approveTrans(item){
    var link = 'http://132.148.90.242:2007/approveTransaction';

    if(item.type == 3){
      var link = 'http://132.148.90.242:2007/approveTransaction2';
    }

    var data = {item : item};

    this._http.post(link, data)
        .subscribe(res => {
          var result = res.json();

          if(result.status == 'error'){
            this.modal.alert()
                .showClose(true)
                .title('Transaction Not Approved')
                .body(`<h3>Error Occured. Try Again!!!</h3>`)
                .open()
                .then(function (resultPromise) {
                  setTimeout(function(){
                    resultPromise.dismiss();
                  },5000);

                });
          }else{
            item.status = 1;
            this.modal.alert()
                .showClose(true)
                .title('Transaction Approved')
                .body('<h3>'+result.msg+'</h3>')
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

  cancelTrans(item){

    var link = 'http://132.148.90.242:2007/cancelTransaction';
    var data = {id : item._id,amount:item.amount};

    this._http.post(link, data)
        .subscribe(res => {
          item.status = 3;
        }, error => {
          console.log("Oooops!");
        });
  }

  verificationTrans(item){

    var link = 'http://132.148.90.242:2007/verificationTransaction';
    var data = {id : item._id};

    this._http.post(link, data)
        .subscribe(res => {
          item.status = 4;
        }, error => {
          console.log("Oooops!");
        });
  }

}
