import { Component, OnInit} from '@angular/core';
import { MatDialog,MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { SigleNftDetailComponent } from 'src/app/dialog/sigle-nft-detail/sigle-nft-detail.component';
import { issueNft } from 'src/app/models/issueNft';
import { IssueNftService } from 'src/app/service/issue-nft.service';

@Component({
  selector: 'app-single-nft',
  templateUrl: './single-nft.component.html',
  styleUrls: ['./single-nft.component.css']
})
export class SingleNftComponent implements OnInit {
  inftOwner:issueNft
  nfts:MatTableDataSource<issueNft>=null
  columnsToDisplay=['nftId','nftOwner','fName','lName','practice','circle','nftURL','nftStatus']

  constructor(private issueNftService:IssueNftService,private route:Router,private activeRoute:ActivatedRoute,public matDialog:MatDialog) {

   }

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params)=>{
      this.inftOwner=params['nftOwner']
      console.log(this.inftOwner)
    })

    this.issueNftService.getuserbyuserName(this.inftOwner).subscribe(
      (res:any)=>{
        this.nfts=new MatTableDataSource<issueNft>(res)
        console.log(res)
      }
    )
  }

  view(nft:issueNft){
    let dialogConfig= new MatDialogConfig()
      dialogConfig.width='550px'
      dialogConfig.data=nft
      this.matDialog.open(SigleNftDetailComponent,dialogConfig)
  }


}
