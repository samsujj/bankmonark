import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {CookieService} from "angular2-cookie/services/cookies.service";
import {Router, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-autologin',
  templateUrl: './autologin.component.html',
  styleUrls: ['./autologin.component.css']
})
export class AutologinComponent implements OnInit {
  public dataForm:FormGroup;
  private fb;

  private cookiedata:CookieService;

  constructor(fb: FormBuilder,cookiedata:CookieService,private router: Router, private route: ActivatedRoute) {
    this.fb = fb;
    this.cookiedata = cookiedata;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {

      if(typeof(params['str']) != 'undefined'){
        this.cookiedata.putObject('loginredirect', params['str']);
        this.router.navigate(['/login']);
      }else {
        this.router.navigate(['/login']);
      }
    },error=>{
      this.router.navigate(['/login']);
    });

    this.dataForm = this.fb.group({
      email: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

}
