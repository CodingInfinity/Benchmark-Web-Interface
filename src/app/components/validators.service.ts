import {Injectable} from "@angular/core";
import 'rxjs/Rx';
import {FormGroup} from "@angular/forms";

@Injectable()
export class ValidatorService {
  constructor(){
  }

  matchingPasswords(passwordKey:string, confirmPasswordKey:string) {
    return (group:FormGroup) => {
      let passwordInput = group.controls[passwordKey];
      let passwordConfirmationInput = group.controls[confirmPasswordKey];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({notEquivalent: true});
      } else {
        passwordConfirmationInput.setErrors(null);
      }
    }
  }
}
