import { Component } from "@angular/core";
import {Router} from "@angular/router";
import {Response} from "@angular/http";
import {SecureComponent} from "../../../../services/secure.component";
import {APIService} from "../../../../services/api.service";

@Component({
  selector: 'viewallexperiments',
  template: require('./view.all.experiment.component.html'),
  styles: [require('./view.all.experiment.component.css')],

})

export class ViewAllExperiments extends SecureComponent {
  private experiments: any;
  private filteredExperiments: any ;
  constructor(router:Router, protected client: APIService){

    super(router, client);
    this.authorities = ["ROLE_ADMIN", "ROLE_USER"];
  }

  ngOnInit():void{
    super.ngOnInit();
    this.getAllExperiments();
  }

  getAllExperiments(){
    this.client.getAllExperimentsWithGET().subscribe((res:Response)=>{
      this.experiments = JSON.parse(res.text())['experiments'];
      this.filteredExperiments = this.experiments;
    },(err)=>{
      this.hasError = true;
      this.errorMessage = err.json()['message'];
    });
  }

  //Filters by user details or language type
  onKeypress(searchText:string):any {
    this.filteredExperiments = this.experiments;
    if (searchText=="") {
      this.filteredExperiments = this.experiments;
    } else {
      this.filteredExperiments = this.experiments.filter((experiment:any) => {
        console.log(experiment);
        return experiment.user.firstName.toLowerCase().indexOf(searchText.toLowerCase()) != -1 ||
          experiment.user.lastName.toLowerCase().indexOf(searchText.toLowerCase()) != -1 ||
          experiment.user.email.toLowerCase().indexOf(searchText.toLowerCase()) != -1 ||
          experiment.languageType.toLowerCase().indexOf(searchText.toLowerCase()) != -1 ||
          experiment.requestedDate.toLowerCase().indexOf(searchText.toLowerCase()) != -1;

      });
    }
  }

  viewExperiment(experiment:any){
    this.router.navigate(['/view/experiment/'+experiment.id]);
  }
}
