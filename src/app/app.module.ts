import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {routing, appRoutingProviders} from './routes';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import {DatePickerModule} from "ng2-datepicker/lib-dist/ng2-datepicker.module";
import {ModalModule} from 'angular2-modal';
import {BootstrapModalModule} from 'angular2-modal/plugins/bootstrap';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { LeftComponent } from './left/left.component';
import { AdminlistComponent } from './adminlist/adminlist.component';
import { AddadminComponent } from './addadmin/addadmin.component';
import { EditadminComponent } from './editadmin/editadmin.component';
import { UserlistComponent } from './userlist/userlist.component';
import { AdduserComponent } from './adduser/adduser.component';
import { EdituserComponent } from './edituser/edituser.component';
import { LogoutComponent } from './logout/logout.component';
import { EmailVerifyComponent } from './email-verify/email-verify.component';
import { MoneyTrasferComponent } from './money-trasfer/money-trasfer.component';
import { StatementComponent } from './statement/statement.component';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AllTransactionListComponent } from './all-transaction-list/all-transaction-list.component';
import { LoginVerificationComponent } from './login-verification/login-verification.component';
import { IplistComponent } from './iplist/iplist.component';
import { FilteredlistPipe } from './filteredlist.pipe';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { CurrencyComponent } from './currency/currency.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AddFundComponent } from './add-fund/add-fund.component';
import { InternationalPaymentComponent } from './international-payment/international-payment.component';
import { TransactionDetailsComponent } from './transaction-details/transaction-details.component';
import { AutologinComponent } from './autologin/autologin.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    LoginComponent,
    LeftComponent,
    AdminlistComponent,
    AddadminComponent,
    EditadminComponent,
    UserlistComponent,
    AdduserComponent,
    EdituserComponent,
    LogoutComponent,
    EmailVerifyComponent,
    MoneyTrasferComponent,
    StatementComponent,
    TransactionListComponent,
    AdminDashboardComponent,
    AllTransactionListComponent,
    LoginVerificationComponent,
    IplistComponent,
    FilteredlistPipe,
    MyProfileComponent,
    UpdateProfileComponent,
    ChangePasswordComponent,
    CurrencyComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    AddFundComponent,
    InternationalPaymentComponent,
    TransactionDetailsComponent,
    AutologinComponent
  ],
  imports: [
    BrowserModule,
    ModalModule.forRoot(),
    BootstrapModalModule,
    FormsModule,
    ReactiveFormsModule,
    DatePickerModule,
    HttpModule,routing
  ],
  providers: [appRoutingProviders,CookieService],
  bootstrap: [AppComponent],
})
export class AppModule { }
