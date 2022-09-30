import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './module/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from "@angular/common/http";


import { HomeComponent } from './home/home.component';
import { AdminoperationComponent } from './admin/adminoperation/adminoperation.component';
import { AllNftsComponent } from './admin/all-nfts/all-nfts.component';
import { IsssueNftComponent } from './admin/isssue-nft/isssue-nft.component';
import { UserOperationComponent } from './user/user-operation/user-operation.component';
import { UserNftComponent } from './user/user-nft/user-nft.component';
import { ExternalOperationComponent } from './external/external-operation/external-operation.component';
import { ValidateNftComponent } from './external/validate-nft/validate-nft.component';
import { ConformationComponent } from './dialog/conformation/conformation.component';
import { IssueComponent } from './dialog/issue/issue.component';
import { ExpireComponent } from './dialog/expire/expire.component';
import { HistoryComponent } from './dialog/history/history.component';
import { UserIssueComponent } from './userModal/user-issue/user-issue.component';
import { UserHistoryComponent } from './userModal/user-history/user-history.component';
import { ValidationComponent } from './externalModal/validation/validation.component';
import { SingleNftComponent } from './admin/single-nft/single-nft.component';
import { SigleNftDetailComponent } from './dialog/sigle-nft-detail/sigle-nft-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminoperationComponent,
    AllNftsComponent,
    IsssueNftComponent,
    UserOperationComponent,
    UserNftComponent,
    ExternalOperationComponent,
    ValidateNftComponent,
    ConformationComponent,
    IssueComponent,
    ExpireComponent,
    HistoryComponent,
    UserIssueComponent,
    UserHistoryComponent,
    ValidationComponent,
    SingleNftComponent,
    SigleNftDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
