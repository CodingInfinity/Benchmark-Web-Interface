import {Router} from "@angular/router";
import {BaseComponent} from "../components/base.component";
import {APIService} from "./api.service";
import {OnInit} from "@angular/core";

export class SecureComponent extends BaseComponent implements OnInit{

  protected authorities: string[] = [];

  constructor(protected router: Router, protected client: APIService) {
    super();
  }
  home() {
    this.router.navigate(['/home']);
  }

  ngOnInit(){
    if (!this.client.authenticated()) {
      this.router.navigateByUrl('/login');
    } else if (!this.client.hasRoles(this.authorities)) {
      this.router.navigateByUrl('/');
    }
  }

}
