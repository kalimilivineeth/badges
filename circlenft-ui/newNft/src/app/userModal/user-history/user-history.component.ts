import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { issueNft } from 'src/app/models/issueNft';
import { IssueNftService } from 'src/app/service/issue-nft.service';

@Component({
  selector: 'app-user-history',
  templateUrl: './user-history.component.html',
  styleUrls: ['./user-history.component.css']
})
export class UserHistoryComponent implements OnInit {

  
  nftId:issueNft

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData:any, private nftService:IssueNftService, private route:Router,) { }

  nfts:MatTableDataSource<issueNft>=null
  columnsToDisplay=['TxVersion','nftId','nftOwner','practice','circle','masteryLevel','expiryDate','nftStatus','Timestamp']

  ngOnInit(): void {
    this.nftId=this.dialogData.nftId

    this.nftService.getHistorybynftId(this.nftId).subscribe((res:issueNft)=>{
      this.nfts=new MatTableDataSource<issueNft>(res.nft) 
    })  


  }
}
