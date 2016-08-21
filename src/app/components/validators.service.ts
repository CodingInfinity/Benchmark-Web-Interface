import {ControlGroup} from "@angular/common";
import {Injectable} from "@angular/core";
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ValidatorService {
  constructor(){
  }

  matchingPasswords(passwordKey:string, confirmPasswordKey:string) {
    return (group:ControlGroup) => {
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
