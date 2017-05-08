import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {Http} from "@angular/http";
import { Router, ActivatedRoute, Params } from '@angular/router';
import {CookieService} from 'angular2-cookie/core';

@Component({
  selector: 'app-add-fund',
  templateUrl: './add-fund.component.html',
  styleUrls: ['./add-fund.component.css']
})
export class AddFundComponent implements OnInit {
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

  constructor(fb: FormBuilder,private _http: Http,private router: Router,userdata:CookieService) {     this.fb = fb;
    this.accounts = [];
    this.allaccounts = [];
    this.balancearr = [];
    let userdata2:any = userdata.getObject('userdetails');

    if(typeof (userdata2) == 'undefined'){
      this.router.navigateByUrl('/login');
    }else{
        this.userid = userdata2._id;
      this.getUserList();
    }
  }

  ngOnInit() {
    this.isSubmit = false;

    this.dataForm = this.fb.group({
      dest_account: ["", Validators.required],
      amount: ["", Validators.required],
      description: [""],
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

  getAllAccountNo(){
    var link = 'http://132.148.90.242:2007/getAllAccounts';
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

  dosubmit(formval) {
    this.isSubmit = true;

    if (this.dataForm.valid) {
      var link = 'http://132.148.90.242:2007/addfund';
      var data = {dest_account: formval.dest_account,amount: formval.amount,description: formval.description,currency: formval.currency};


      this._http.post(link, data)
          .subscribe(res => {

            this.router.navigateByUrl('/admin-dashboard(header:header//left:left)');

          }, error => {
            console.log("Oooops!");
          });
    }
  }

}
