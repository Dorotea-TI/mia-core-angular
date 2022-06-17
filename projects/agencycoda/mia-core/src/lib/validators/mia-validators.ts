import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class MiaValidators {
 
    static passwordSecure(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            let password = control.value ?? '';
            if(password.length < 8){
                return { passwordSecureMin: { value: control.value } };
            }

            if(!this.hasOneUppercase(password)){
                return { passwordSecureUppercase: { value: control.value } };
            }

            if(!this.hasOneDigit(password)){
                return { passwordSecureDigit: { value: control.value } };
            }

            return null;
        };
    }

    static isSecurePassword(password: string): boolean {
        if(password.length < 8){
            return false;
        }
        if(!this.hasOneUppercase(password) || !this.hasOneDigit(password)){
            return false;
        }
        return true;
    }

    static hasOneUppercase(password: string): boolean {
        let oneUppercase = new RegExp('(?=.*[A-Z])');
        if(oneUppercase.test(password)){
            return true;
        }

        return false;
    }

    static hasOneDigit(password: string): boolean {
        let oneDigit = new RegExp('(?=.*[0-9])');
        if(oneDigit.test(password)){
            return true;
        }
        return false;
    }
}