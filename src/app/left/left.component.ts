import { Component, OnInit } from '@angular/core';
import {Http} from "@angular/http";
import { Router, ActivatedRoute, Params } from '@angular/router';
import {CookieService} from 'angular2-cookie/core';

@Component({
  selector: 'app-left',
  templateUrl: './left.component.html',
  styleUrls: ['./left.component.css']
})
export class LeftComponent implements OnInit {
  public userdetails:any;
  private userid;
  public username;
  public isadmin;

  constructor(private _http: Http,private router: Router,userdata:CookieService) {
    let userdata2:any = userdata.getObject('userdetails');

    if(typeof (userdata2) == 'undefined'){
      this.router.navigateByUrl('/login');
    }else{
      this.userid = userdata2._id;

      this.getUserDetails();

    }
  }

  ngOnInit() {
    this.isadmin = 0;


  }

  getUserDetails(){

    var link = 'http://132.148.90.242:2007/admin-details';
    var data = {_id : this.userid};


    this._http.post(link, data)
        .subscribe(res => {
          var result = res.json();
          if(result.status == 'success' && typeof(result.item) != 'undefined'){
            let userdet = result.item;

            this.username = userdet.firstname+" "+userdet.lastname;

            this.userdetails = userdet;

            this.isadmin = this.userdetails.type;

            console.log(this.userdetails);

          }
        }, error => {
          console.log("Oooops!");
        });
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
