import { Component, OnInit } from '@angular/core';
import {Http} from "@angular/http";
import { Router, ActivatedRoute, Params } from '@angular/router';
import {CookieService} from 'angular2-cookie/core';

@Component({
  selector: 'app-adminlist',
  templateUrl: './adminlist.component.html',
  styleUrls: ['./adminlist.component.css']
})
export class AdminlistComponent implements OnInit {

  public datalist;
  public id;
  private userdata:CookieService;

  public superAdmin;

  constructor(private _http: Http,userdata:CookieService) { }

  ngOnInit() {
    this.getAdminList();
  }

  getAdminList(){
    var link = 'http://132.148.90.242:2007/admin-list';
    var data = {};


    this._http.post(link, data)
        .subscribe(res => {
          var result = res.json();
          this.datalist = result.res;
        }, error => {
          console.log("Oooops!");
        });
  }

  delConfirm(id){
    this.id = id;
  }

  admindel(){
    var link = 'http://132.148.90.242:2007/admin-del';
    var data = {id:this.id};

    this._http.post(link, data)
        .subscribe(res => {
          this.getAdminList();
        }, error => {
          console.log("Oooops!");
        });
  }

    statuscng(item){
        item.status = 1-item.status;

        var link = 'http://132.148.90.242:2007/user-statcng';
        var data = {id:item._id,status:item.status};

        this._http.post(link, data)
            .subscribe(res => {
                console.log("Success");
            }, error => {
                console.log("Oooops!");
            });
    }

}
