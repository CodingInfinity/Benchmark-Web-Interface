
import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router'
import {APIService, CompletePasswordResetRequest} from "../../../../services/api.service";
import {ValidatorService} from "../../../validators.service";
import {BaseComponent} from "../../../base.component";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";


@Component({
  selector: 'resetRequest',
  template: require('./reset.finish.component.html'),
  styles: [require('./reset.finish.component.css')]
})
export class ResetFinishComponent extends BaseComponent implements OnInit{
  private key: string = "";
  private form: FormGroup;
  constructor(private router: Router, private fb: FormBuilder, private route: ActivatedRoute, private api: APIService, private validators: ValidatorService) {
    super();
    this.form = fb.group({
      password: ['', Validators.required],
      confirmPassword:  ['', Validators.required]
    },{validator: this.validators.matchingPasswords('password', 'confirmPassword')});
  }

  reset_password_finish(value: any){
    var passResetFinish: CompletePasswordResetRequest = {
      key: this.key,
      newPassword: value.password,
    };

    this.api.finishPasswordResetUsingPOST(passResetFinish).subscribe(
      (response)=>{
        this.router.navigate(['/login']);
      },(err)=>{
        this.errorMessage = err.json()["message"];
        this.hasError = true;
      });

  }

  setPasswordClass() {
    if(this.form.controls['password'].value ==""){return;}
    return {
      invalid: !this.form.valid,
      valid: this.form.valid
    }
  }

  ngOnInit(){
    this.route.params.subscribe(params => {
      let key = params['key'];
      this.key = key;
      console.log(this.key);
    });
  }

}

