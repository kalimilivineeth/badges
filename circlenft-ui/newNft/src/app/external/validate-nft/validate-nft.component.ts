import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog,MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ValidationComponent } from 'src/app/externalModal/validation/validation.component';
import { IssueNftService } from 'src/app/service/issue-nft.service';

@Component({
  selector: 'app-validate-nft',
  templateUrl: './validate-nft.component.html',
  styleUrls: ['./validate-nft.component.css']
})
export class ValidateNftComponent implements OnInit {

  level:any=["Level 1","Level 2","Level 3","Level 4", "Level 5"]
  imgs:any=""
  validateNft: FormGroup

  constructor(private issueNftService:IssueNftService, private router: Router, public matDialog:MatDialog) { 
    this.validateNft = new FormGroup({
      userName: new FormControl(null, [ Validators.required ]),
      fName: new FormControl(null, [Validators.required]),
      lName: new FormControl(null, [ Validators.required ]),
      practice: new FormControl(null, [ Validators.required ]),
      circle: new FormControl(null, [ Validators.required ]),
      masteryLevel:new FormControl(null, [ Validators.required ]),
      // expiryDate:new FormControl(null, [ Validators.required ]),
      emailId: new FormControl(null, [ Validators.required ]),
      url: new FormControl(null, [ Validators.required ]),
      nftId:new FormControl(null, [ Validators.required ]),
    });   
  }

  ngOnInit(): void {
  }

  imgselect(){
    if(this.validateNft.value.masteryLevel === "Level 1"){
      this.imgs="assets/Exp.png"
      console.log(this.imgs)
    }
    else if(this.validateNft.value.masteryLevel === "Level 2"){
      this.imgs="assets/Data.png"
      console.log(this.imgs)
    }
    else if(this.validateNft.value.masteryLevel === "Level 3"){
      this.imgs="assets/Quality.png"
      console.log(this.imgs)
    }
    else if(this.validateNft.value.masteryLevel === "Level 4"){
      this.imgs="assets/Platform.png"
      console.log(this.imgs)
    }
    else{
      this.imgs="assets/Cloud.png"
      console.log(this.imgs)
    }  
  }

  validate(){
    if (this.validateNft.valid) {
      this.issueNftService.validateNft(this.validateNft.value).subscribe(
        (res)=>{
          let dialogConfig= new MatDialogConfig()
          dialogConfig.data=res
          dialogConfig.width="300px"
          this.matDialog.open(ValidationComponent, dialogConfig)

          if (res.result == "valid"){
            this.validateNft.reset()
            this.validateNft.get("userName").clearValidators()
            this.validateNft.get("userName").updateValueAndValidity()
            this.validateNft.get("fName").clearValidators()
            this.validateNft.get("fName").updateValueAndValidity()
            this.validateNft.get("lName").clearValidators()
            this.validateNft.get("lName").updateValueAndValidity()
            this.validateNft.get("practice").clearValidators()
            this.validateNft.get("practice").updateValueAndValidity()
            this.validateNft.get("circle").clearValidators()
            this.validateNft.get("circle").updateValueAndValidity()
            this.validateNft.get("masteryLevel").clearValidators()
            this.validateNft.get("masteryLevel").updateValueAndValidity()
            this.validateNft.get("emailId").clearValidators()
            this.validateNft.get("emailId").updateValueAndValidity()
            this.validateNft.get("url").clearValidators()
            this.validateNft.get("url").updateValueAndValidity()
            this.validateNft.get("nftId").clearValidators()
            this.validateNft.get("nftId").updateValueAndValidity()  
          }
          
        }
      )
    } 
  }

}