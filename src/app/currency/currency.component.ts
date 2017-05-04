import { Component, OnInit } from '@angular/core';
import {Http} from "@angular/http";
import {Router, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.css']
})
export class CurrencyComponent implements OnInit {
  private ugbp;
  private ueur;
  private gusd;
  private geur;
  private eusd;
  private egbp;

  constructor(private _http: Http,private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.currencylist();
  }

  private currencylist() {
    var link = 'http://132.148.90.242:2007/currencylist';
    var data = {_id : 0};


    this._http.get(link,data)
        .subscribe(res => {

          var result = res.json();
          console.log(result);
          console.log(result.res);
          console.log(result.res[0]);
          console.log(result.res[0].eur);
          console.log(result.res[0].gbp);
          this.ugbp=result.res[0].gbp.toFixed(2);
          this.ueur=result.res[0].eur.toFixed(2);
          this.gusd=(1/result.res[0].gbp).toFixed(2);
          this.geur=(this.ueur/result.res[0].gbp).toFixed(2);
          this.eusd=(1/result.res[0].eur).toFixed(2);
          this.egbp=(this.ugbp/result.res[0].eur).toFixed(2);

        }, error => {
          console.log("Oooops!");
        });
  }

  public updatecurrency(){

    var link = 'http://132.148.90.242:2007/savecurrency';
    var data = {_id : 0};


    this._http.get(link,data)
        .subscribe(res => {

          this.currencylist();

        }, error => {
          console.log("Oooops!");
        });
  }

}
