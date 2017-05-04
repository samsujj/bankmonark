import { Component, OnInit } from '@angular/core';
import {Http} from "@angular/http";
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-email-verify',
  templateUrl: './email-verify.component.html',
  styleUrls: ['./email-verify.component.css']
})
export class EmailVerifyComponent implements OnInit {
  private id;
  constructor(private _http: Http,private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.emailverify();
    },error=>{
      this.router.navigate(['/login']);
    });
  }

  emailverify(){
    var link = 'http://132.148.90.242:2007/emailverify';
    var data = {id : this.id};


    this._http.post(link, data)
        .subscribe(res => {
          var result = res.json();

            console.log(result);

          this.router.navigate(['/reset-password/'+result.id+'/'+result.time+'/'+result.password]);


          //this.router.navigate(['/login']);
        }, error => {
          console.log("Oooops!");
        });
  }

}
