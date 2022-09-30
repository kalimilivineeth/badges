import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IssueNftService } from 'src/app/service/issue-nft.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConformationComponent } from 'src/app/dialog/conformation/conformation.component';
import { CustomError } from 'src/app/helpers/customer-error';
import { EmpDataService } from 'src/app/service/emp-data.service';
import { map } from 'rxjs';
import { empData } from 'src/app/models/empData';
import { skillsBadge } from 'src/app/models/skillsBadge';

@Component({
  selector: 'app-isssue-nft',
  templateUrl: './isssue-nft.component.html',
  styleUrls: ['./isssue-nft.component.css']
})
export class IsssueNftComponent implements OnInit {

  employeeData:any=[]
  autofillEmp:any
  issueNftFrom: FormGroup
  imgs:any=""
  customError:CustomError = new CustomError()
  skillBadge:skillsBadge[]

  filteredOptions:any;
  formGroup : FormGroup;

  constructor(private issueNftService:IssueNftService, private router: Router, public matDialog: MatDialog,
    private empData:EmpDataService,private fb : FormBuilder) { }

  ngOnInit(){

    this.empData.getempData().subscribe(
      (res:any[])=>{
        for (let person of res[0])
        {
            this.employeeData.push(person.EmailID) 
        } 
        this.filteredOptions = this.employeeData;
        this.autofillEmp = res[0]

      },
      (err)=>{
        console.log(err)
      }
    )


    this.issueNftService.getSkillBadges().subscribe(
      (res)=>{
        this.skillBadge=res
      },
      (err)=>{err}

    )
  


    this.formGroup = this.fb.group({
      'employee' : [''],
      'practice':null,
      'circle':null
    })
    this.formGroup.get('employee').valueChanges.subscribe(response => {
      this.filterData(response);
    })
    


    this.issueNftFrom = new FormGroup({
      userName: new FormControl(null, [ Validators.required ]),
      fName: new FormControl(null, [Validators.required]),
      lName: new FormControl(null, [ Validators.required ]),
      practice: new FormControl(null, [Validators.required]),
      circle: new FormControl(null, [ Validators.required ]),
      masteryLevel:new FormControl(null, [ Validators.required ]),
      // expiryDate:new FormControl(null, [ Validators.required ]),
      emailId: new FormControl(null, [ Validators.required, Validators.email ]),
      url: new FormControl(null, [ Validators.required ]),
    });    
  }

  confirm(){
    this.router.navigate( ['/',"nftDetails1",this.issueNftFrom.value.userName ]); 
  }

  
  final(){
    if (this.issueNftFrom.valid)          
    {
      this.issueNftService.insertProject(this.issueNftFrom.value).subscribe((res) => {
        if(res){
          console.log(res)
          let result= res.result
          let dialogRef = new MatDialogConfig()
          dialogRef.panelClass="dialog-box"
          dialogRef.data=result
          this.matDialog.open(ConformationComponent,dialogRef)
        }  
      }, (error) => {                
        console.log(error); 
      });
    }
    else
    {
      console.log(this.issueNftFrom.errors);
    }
  }


  getFormControl(controlName:string):FormControl{
    return this.issueNftFrom.get(controlName) as FormControl
  }


  getErrorMessage(controlName: string, errorType: string): string
  {
    
    switch (controlName)
    {
      case "emailId":
        {
          if (errorType === "required")
            return "<strong>Email</strong> can't be blank";
          else if (errorType === "email")
            return "<strong>Email</strong> should be in correct format. Eg: someone@example.com";
          else
            return "";
        }
      default: return "";
    }
  }

  
  filterData(enteredData:any){

    this.filteredOptions = this.employeeData.filter((item:any) => {

      return item?.toLowerCase().indexOf(enteredData.toLowerCase()) > -1

    })

  }

  getData(){
    const filter = this.autofillEmp.filter((emp:any)=>{
      if (emp.EmailID === this.formGroup.value.employee){
        return emp
      }  
    })
    const userName = filter[0].EmailID.split('@')[0]

    this.issueNftFrom.get('userName').setValue(userName)
    this.issueNftFrom.get('fName').setValue(filter[0].FirstName)
    this.issueNftFrom.get('lName').setValue(filter[0].LastName)
    this.issueNftFrom.get('emailId').setValue(filter[0].EmailID)
    this.formGroup.get('practice').setValue(filter[0].Practice)
    this.formGroup.get('circle').setValue(filter[0].Circle)
    // this.issueNftFrom.get('practice').setValue(filter[0].ParentCircle)
    // this.issueNftFrom.get('circle').setValue(filter[0].SubCircle)
    
  }


  select(){
    this.issueNftFrom.get('masteryLevel').reset()
    this.imgs=null
  }



}