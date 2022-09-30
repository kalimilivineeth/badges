import { AbstractControl, FormGroupDirective, NgForm } from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";

export class CustomError implements ErrorStateMatcher{
    isErrorState(control: AbstractControl<any, any> | null, form: FormGroupDirective | NgForm | null): boolean| any {
        return form && control && control.invalid && (control.dirty || control.touched || form.submitted)    
    }
}