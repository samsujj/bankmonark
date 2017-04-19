import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {HeaderComponent} from "./header/header.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {AdminDashboardComponent} from "./admin-dashboard/admin-dashboard.component";
import {LoginComponent} from "./login/login.component";
import {LogoutComponent} from "./logout/logout.component";
import {LeftComponent} from "./left/left.component";
import {EmailVerifyComponent} from "./email-verify/email-verify.component";
import {AdminlistComponent} from "./adminlist/adminlist.component";
import {AddadminComponent} from "./addadmin/addadmin.component";
import {EditadminComponent} from "./editadmin/editadmin.component";
import {UserlistComponent} from "./userlist/userlist.component";
import {AdduserComponent} from "./adduser/adduser.component";
import {EdituserComponent} from "./edituser/edituser.component";
import {MoneyTrasferComponent} from "./money-trasfer/money-trasfer.component";
import {StatementComponent} from "./statement/statement.component";
import {TransactionListComponent} from "./transaction-list/transaction-list.component";
import {AllTransactionListComponent} from "./all-transaction-list/all-transaction-list.component";
import {LoginVerificationComponent} from "./login-verification/login-verification.component";
import {IplistComponent} from "./iplist/iplist.component";

const appRoutes: Routes = [
    // { path: '/**',component: AppComponent},
    //{ path: '/*',component: AppComponent},
    { path: '', component: LoginComponent},
    { path: 'login', component: LoginComponent},
    { path: 'login-verification', component: LoginVerificationComponent},
    { path: 'logout', component: LogoutComponent},
    { path: 'email-verify/:id/:time', component: EmailVerifyComponent},
    { path: 'dashboard', component: DashboardComponent},
    { path: 'admin-dashboard', component: AdminDashboardComponent},
    { path: 'admin-list', component: AdminlistComponent},
    { path: 'add-admin', component: AddadminComponent},
    { path: 'edit-admin/:id', component: EditadminComponent},
    { path: 'user-list', component: UserlistComponent},
    { path: 'add-user', component: AdduserComponent},
    { path: 'money-transfer', component: MoneyTrasferComponent},
    { path: 'transaction-list', component: TransactionListComponent},
    { path: 'all-transaction-list', component: AllTransactionListComponent},
    { path: 'statement', component: StatementComponent},
    { path: 'ip-track', component: IplistComponent},
    { path: 'edit-user/:id', component: EdituserComponent},
    { path: 'header', component: HeaderComponent,outlet:'header'},
    { path: 'left', component: LeftComponent,outlet:'left'},




];


export const appRoutingProviders: any[] = [
];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes,{ useHash: false });