import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-operation',
  templateUrl: './user-operation.component.html',
  styleUrls: ['./user-operation.component.css']
})
export class UserOperationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  logout(){
    sessionStorage.removeItem('userName')
  }

}
