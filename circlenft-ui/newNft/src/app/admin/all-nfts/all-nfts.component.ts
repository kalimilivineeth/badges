import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ExpireComponent } from 'src/app/dialog/expire/expire.component';
import { HistoryComponent } from 'src/app/dialog/history/history.component';
import { IssueComponent } from 'src/app/dialog/issue/issue.component';
import { issueNft } from 'src/app/models/issueNft';
import { IssueNftService } from 'src/app/service/issue-nft.service';

@Component({
  selector: 'app-all-nfts',
  templateUrl: './all-nfts.component.html',
  styleUrls: ['./all-nfts.component.css']
})
export class AllNftsComponent implements OnInit {

  nfts:MatTableDataSource<issueNft>=null
  columnsToDisplay=['nftOwner','fName','lName','practice','circle','nftURL','nftId','nftStatus','action']

  @ViewChild(MatPaginator) paginator: MatPaginator
  @ViewChild(MatSort) sort:MatSort

  constructor(private issueNftServe:IssueNftService, private route:Router, public matDialog:MatDialog) { }

  ngOnInit(): void {
    this.issueNftServe.getAllProjects().subscribe((res) => {
      // this.nfts = [];
      // response.map((obj: any) => {
      //   this.nfts = this.nfts.concat(obj.nfts);
      //   console.log(this.nfts)
      // });
      console.log(res)
      this.nfts=new MatTableDataSource<issueNft>(res)
      this.nfts.paginator=this.paginator
      this.nfts.sort=this.sort
      
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.nfts.filter = filterValue.trim().toLowerCase();
  }

  view(nft:issueNft){
    if(nft.nftStatus == "ISSUED"){
      let dialogConfig= new MatDialogConfig()
      dialogConfig.width='550px'
      dialogConfig.data=nft
      this.matDialog.open(IssueComponent,dialogConfig)
    }
    else{
      let dialogConfig= new MatDialogConfig()
      dialogConfig.width='1500px'
      dialogConfig.data=nft
      this.matDialog.open(HistoryComponent,dialogConfig)
    }
  }

  expire(nft:issueNft){
    let dialogConfig= new MatDialogConfig()
    dialogConfig.data=nft
    let dialogRef:MatDialogRef<ExpireComponent>=this.matDialog.open(ExpireComponent,dialogConfig)
    dialogRef.afterClosed().subscribe(
      (res)=>{
        this.issueNftServe.getAllProjects().subscribe(
          (res)=>{
            console.log(res)
            this.nfts=new MatTableDataSource<issueNft>(res)
          }
        )
      }
    )
  }

}
