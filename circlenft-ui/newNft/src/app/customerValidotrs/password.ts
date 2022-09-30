import { AbstractControl } from "@angular/forms";

export class CustomValidators {

    static MatchingPasswords(control: AbstractControl) {
        const new_password = control.get('new_password').value;
        const confirm_password = control.get('confirm_password').value;
        const currentErrors = control.get('confirm_password').errors
        const confirmControl = control.get('confirm_password')

        if (compare(new_password, confirm_password)) {
            confirmControl.setErrors({...currentErrors, not_matching: true});
        } else {
            confirmControl.setErrors(currentErrors)
        }
    }
}

function compare(new_password: string,confirm_password: string) {
    return new_password !== confirm_password && confirm_password !== ''
}