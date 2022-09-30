import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IssueNftService } from 'src/app/service/issue-nft.service';

@Component({
  selector: 'app-expire',
  templateUrl: './expire.component.html',
  styleUrls: ['./expire.component.css']
})
export class ExpireComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData:any,
    private nftService:IssueNftService, private route:Router,
    public matDialogRef:MatDialogRef<ExpireComponent>
  ) { }

  ngOnInit(): void {
    
  }
  confirm(){
    let expiration ={nftId:this.dialogData.nftId}
    this.nftService.expireNft(expiration).subscribe(
      (res)=>{
        this.matDialogRef.close(res)
      }
    )
  }

}
