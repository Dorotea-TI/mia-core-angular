import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class MiaValidators {
 
    static passwordSecure(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            let password = control.value ?? '';
            if(password.length < 8){
                return { passwordSecureMin: { value: control.value } };
            }

            let oneUppercase = new RegExp('(?=.*[A-Z])');
            if(!oneUppercase.test(password)){
                return { passwordSecureUppercase: { value: control.value } };
            }

            let oneDigit = new RegExp('(?=.*[0-9])');
            if(!oneDigit.test(password)){
                return { passwordSecureDigit: { value: control.value } };
            }

            return null;
        };
    }
}