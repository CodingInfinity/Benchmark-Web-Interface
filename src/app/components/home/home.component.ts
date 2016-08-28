import { Component } from "@angular/core";
import { Router } from "@angular/router";

import { APIService } from "../../services/api.service";
import { SecureComponent } from "../../services/secure.component";


@Component({
  selector: 'home',
  template: require('./home.component.html'),
  styles: [require('./home.component.css')],
})
export class HomeComponent extends SecureComponent {

    //Experiments
    private totalExperiments: number = 0;
    private newExperiments: number = 0;
    private ownExperinents: number = 0;
    private latestExperiment: number = 0;

    //Jobs
    private totalJobsCompleted: number = 0;
    private ownJobsCompleted: number = 0;
    private totalJobsOnQueue: number = 0;
    private ownJobsOnQueue: number = 0;

    //Algorithms
    private totalAlgorithms: number = 0;
    private newAlgorithms: number = 0;
    private ownAlgorithms: number = 0;
    private mostUsedAlgorithm: any = {};

    //Datasets
    private totalDatasets: number = 0;
    private newDatasets: number = 0;
    private ownDatasets: number = 0;
    private mostUsedDataset: any = {};


    constructor(router:Router, protected client: APIService) {
      super(router, client);
      this.authorities = ["ROLE_ADMIN", "ROLE_USER"];
    }

  ngOnInit(){
    super.ngOnInit();
    this.mostUsedAlgorithm.name = "Bubble Sort";
    this.mostUsedDataset.name = "Random Words";

  }
}
