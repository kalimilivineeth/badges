import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { issueNft } from 'src/app/models/issueNft';

@Component({
  selector: 'app-sigle-nft-detail',
  templateUrl: './sigle-nft-detail.component.html',
  styleUrls: ['./sigle-nft-detail.component.css']
})
export class SigleNftDetailComponent implements OnInit {

  viewNft:issueNft


  constructor(@Inject(MAT_DIALOG_DATA) public dialogData:any,) { }

  ngOnInit(): void {
    this.viewNft=this.dialogData
  }

}
