import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs';

import { CustomValidators } from '../customerValidotrs/password';
import { CustomError } from '../helpers/customer-error';
import { LoginService } from '../service/login.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('playvideo') playvideo:ElementRef | any

  customError:CustomError = new CustomError()

  playpause:boolean=false
  createAcc:boolean=false
  updatePass:boolean=false

  adminLogin: FormGroup
  userLogin: FormGroup
  externalLogin: FormGroup
  createAccount:FormGroup
  updatePassword:FormGroup

  constructor(private loginService:LoginService ,private route:Router, private matsnackBar:MatSnackBar,private fb: FormBuilder) { 
    this.adminLogin = new FormGroup({
      userName: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [ Validators.required])
    })

    this.userLogin = new FormGroup({
      userName: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [ Validators.required])
    })

    this.externalLogin = new FormGroup({
      userName: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [ Validators.required])
    })

    this.createAccount= new FormGroup({
      userName:new FormControl(null,[Validators.required]),
      password:new FormControl(null, [Validators.required]),
      email: new FormControl(null,[Validators.required,Validators.email]),
      role: new FormControl('user', [Validators.required]),
      passwordAllocatedBy: new FormControl('false', [Validators.required])
    })

    // this.updatePassword= new FormGroup({
    //   userName:new FormControl(null,[Validators.required]),
    //   old_password:new FormControl(null,[Validators.required]),
    //   new_password:new FormControl(null,[Validators.required]),
    //   confirm_password:new FormControl(null,[Validators.required]),
    // },
    
    // )

    this.updatePassword = this.fb.group(
      {
        userName: [null,[Validators.required,]],
        old_password: [null,[Validators.required,]],
        new_password: [null,[Validators.required,]],
        confirm_password: [null,[Validators.required]]
      },
      { validator: CustomValidators.MatchingPasswords }
    );


  }

  ngOnInit(): void {
    console.log('hi')
  }

  change(){
    this.playpause= !this.playpause
    if(this.playpause){
      this.playvideo.nativeElement.play()
    }
    else{
      this.playvideo.nativeElement.pause()
    }
  }
  newacc(){
    this.createAcc=true
  }
  back(){
    this.createAcc=false
  }

  updatepassw(){
    this.updatePass=true
  }

  backupdate(){
    this.updatePass=false
  }

  adminlog(){
    if(this.adminLogin.valid){
      this.loginService.login(this.adminLogin.value).subscribe(
        (res)=>{
          console.log(res)
        },
        (err)=>{
          console.log(err)
          if(err.error.text == 'Successfully LoggedIn'){
            console.log("hi")
            // this.route.navigate(['/','admin','adminoperation'])
            this.matsnackBar.open("Successfully LoggedIn","close",{
              duration:1500,
              verticalPosition:"top",
              horizontalPosition:'center'
            })
            setTimeout(()=>{
              this.route.navigate(['/','admin','adminoperation'])      
                  },1500)
          }
          else{
            this.adminLogin.reset()
            this.adminLogin.get('userName').clearValidators()
            this.adminLogin.get('userName').updateValueAndValidity()
            this.adminLogin.get('password').clearValidators()
            this.adminLogin.get('password').updateValueAndValidity()
            this.matsnackBar.open("Incorrect usename or password.","close",{
              duration:5000,
              
            })
          }
        }
      )
    }
    

  }
  userlog(){
    if(this.userLogin.valid){
      this.loginService.login(this.userLogin.value).subscribe(
        (res)=>{
          console.log(res)
        },
        (err)=>{
          console.log(err)
          if(err.error.text == 'Successfully LoggedIn, Please Update The Password'){
            sessionStorage.setItem('userName',this.userLogin.value.userName)
            // this.route.navigate(['/','user','userOperation'])
            this.matsnackBar.open("Successfully LoggedIn, Please Update The Password","close",{
              duration:1500,
              verticalPosition:"top",
              horizontalPosition:'center'
            })
            setTimeout(()=>{
              this.route.navigate(['/','user','userOperation'])
            },1500)
          }

          else if(err.error.text == 'Successfully LoggedIn'){
            sessionStorage.setItem('userName',this.userLogin.value.userName)
            // this.route.navigate(['/','user','userOperation'])
            this.matsnackBar.open("Successfully LoggedIn","close",{
              duration:1500,
              verticalPosition:"top",
              horizontalPosition:'center'
            })
            setTimeout(()=>{
              this.route.navigate(['/','user','userOperation'])
            },1500)
          }

          else if(err.error.text == 'Password Expired, Please Update The Password'){
            this.userLogin.reset()
            this.userLogin.get('userName').clearValidators()
            this.userLogin.get('userName').updateValueAndValidity()
            this.userLogin.get('password').clearValidators()
            this.userLogin.get('password').updateValueAndValidity()
            this.matsnackBar.open("Password Expired, Please Update The Password","close",{
              duration:5000,
              
            })
  
          }

          else if(err.error == 'Incorrect username or password.'){
            this.userLogin.reset()
            this.userLogin.get('userName').clearValidators()
            this.userLogin.get('userName').updateValueAndValidity()
            this.userLogin.get('password').clearValidators()
            this.userLogin.get('password').updateValueAndValidity()
            this.matsnackBar.open("Incorrect username or password.","close",{
              duration:5000,
              
            })
  
          }
        }
      )
    }
  }
  externallog(){
    if(this.externalLogin.valid){
      this.loginService.login(this.externalLogin.value).subscribe(
        (res)=>{
          console.log(res)
        },
        (err)=>{
          if(err.error.text == 'Successfully LoggedIn, Please Update The Password'){
            console.log("hi")
            this.route.navigate(['/','external','externalOperation'])
          }
          else{
            this.externalLogin.reset()
            this.externalLogin.get('userName').clearValidators()
            this.externalLogin.get('userName').updateValueAndValidity()
            this.externalLogin.get('password').clearValidators()
            this.externalLogin.get('password').updateValueAndValidity()
            this.matsnackBar.open("Incorrect usename or password.","close",{
              duration:5000,
              
            })
          }
        }
      )
    }
  }

  signup(){
    if(this.createAccount.valid){
      this.loginService.sigup(this.createAccount.value).subscribe(
        (res)=>{
          this.matsnackBar.open("Your Account has Created Successfully","close",{
            duration:2000
          })
          setTimeout(()=>{
            this.createAcc=false
          },2000)
          
        },
        (err)=>{
          this.matsnackBar.open("That user already exisits!","close",{
            duration:2000
          })
          this.createAccount.reset()
          this.createAccount.get('userName').clearValidators()
          this.createAccount.get('userName').updateValueAndValidity()

          this.createAccount.get('password').clearValidators()
          this.createAccount.get('password').updateValueAndValidity()

          this.createAccount.get('email').clearValidators()
          this.createAccount.get('email').updateValueAndValidity()

          this.createAccount.get('role').clearValidators()
          this.createAccount.get('role').updateValueAndValidity()

          this.createAccount.get('passwordAllocatedBy').clearValidators()
          this.createAccount.get('passwordAllocatedBy').updateValueAndValidity()
        }
      )
    }
  }

  updatesubmit(){
    if(this.updatePassword.valid){
      this.loginService.update(this.updatePassword.value).subscribe(
        (res)=>{
          console.log(res)
        },
        (err)=>{
          console.log(err)
          if(err.error.text == 'password successfully updated!'){
            console.log("hi")
            this.matsnackBar.open("password successfully updated!","close",{
              duration:2000
            })
            setTimeout(()=>{
              this.updatePass=false
            },2000)
          }
          else if (err.error.text == 'password successfully updated'){
            console.log("hi")
            this.matsnackBar.open("password successfully updated","close",{
              duration:2000
            })
            setTimeout(()=>{
              this.updatePass=false
            },2000)
          }    
        }
      )
    }
  }
  getFormControl(controlName:string):FormControl{
    return this.createAccount.get(controlName) as FormControl
  }


  getErrorMessage(controlName: string, errorType: string): string
  {
    
    switch (controlName)
    {
      case "email":
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
}
