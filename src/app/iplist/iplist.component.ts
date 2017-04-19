import { Component, OnInit } from '@angular/core';
import {Http} from "@angular/http";

@Component({
  selector: 'app-iplist',
  templateUrl: './iplist.component.html',
  styleUrls: ['./iplist.component.css']
})
export class IplistComponent implements OnInit {
  public datalist;

  constructor(private _http: Http) { }

  ngOnInit() {
    this.getIPList();
  }

  getIPList(){
    var link = 'http://132.148.90.242:2007/ip-list';
    var data = {};


    this._http.get(link, data)
        .subscribe(res => {
          var result = res.json();
          this.datalist = result.res;
        }, error => {
          console.log("Oooops!");
        });
  }

  getUserName(item){
      var uname = 'NA';
      if(item.userdet.length){
          uname = item.userdet[0].firstname+' '+item.userdet[0].lastname;
      }

      return uname;
  }

}
