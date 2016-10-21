
import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute,} from '@angular/router'
import {APIService} from "../../../services/api.service";
import {BaseComponent} from "../../base.component";

@Component({
    selector: 'registerAccount',
    template: require('./activate.component.html'),
    styles: [require('./activate.component.css')]
})
export class ActivateAccountComponent extends BaseComponent implements OnInit{
  private key: string;
  private activated: number;

  constructor(private router: Router, private route: ActivatedRoute, private api: APIService) {
    super();
    this.activated = -1;
  }

  activate_account(){

    this.api.activateAccountUsingGET(this.key).subscribe(
      (response)=>{
        this.activated = 0;
        this.hasError = false;
      },(err)=>{
        this.activated = 2;
        this.errorMessage = err.json()["message"];
        this.hasError = true;
      });
  }

  ngOnInit():void{
    this.route.params.subscribe(params => {
      let key = params['key'];
      this.key = key;
      this.activate_account();
    });

  }
}
