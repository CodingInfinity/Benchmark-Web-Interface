import {NgModule }      from '@angular/core';
import {BrowserModule } from '@angular/platform-browser';
import {AppComponent }  from './app.component';
import {HomeComponent} from "./components/home/home.component";
import {AuthenticationService} from "./services/authentication.service";
import {APIService} from "./services/api.service";
import {HttpModule, XHRBackend, RequestOptions, Http} from "@angular/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {routing} from "./app.routes";
import {MaterializeDirective} from "angular2-materialize/dist/index";
import {ActivateAccountComponent} from "./components/account/activate/activate.component";
import {ProfileComponent} from "./components/account/profile/profile.component";
import {RegisterAccountComponent} from "./components/account/register/register.component";
import {FooterComponent} from "./components/footer/footer.component";
import {NavigationComponent} from "./components/navigation/navigation.component";
import {ValidatorService} from "./components/validators.service";
import {ResetFinishComponent} from "./components/account/reset/finish/reset.finish.component";
import {ResetRequestComponent} from "./components/account/reset/request/reset.request.component";
import {LoginComponent} from "./components/login/login.component";
import {FileUploadService} from "./services/file.upload.service";
import {LogoutComponent} from "./components/logout/logout.component";
import {UploadComponent} from "./components/upload/upload.component";
import {FolderComponent} from "./components/files/folder.component";
import {FileComponent} from "./components/files/file.component";
import {FileBrowserComponent} from "./components/files/browser/file.browser.component";
import {UsersComponent} from "./components/users/users.component";
import {CreateComponent} from "./components/users/create/create.component";
import {EditorComponent} from "./components/tinymce/tinymce";
import {UploadAlgorithmComponent} from "./components/algorithm/upload/algorithm.upload.component";
import {ViewAllAlgorithmsComponent} from "./components/algorithm/view/all/algorithm.view.all.component";
import {ViewUsersAlgorithmsComponent} from "./components/algorithm/view/user/algorithm.view.user.component";
import {UploadDatasetComponent} from "./components/dataset/upload/dataset.upload.component";
import {ViewAllDatasetsComponent} from "./components/dataset/view/all/dataset.view.all.component";
import {ViewUsersDatasetsComponent} from "./components/dataset/view/user/dataset.view.user.component";
import {CreateExperimentComponent} from "./components/experiment/create/createexperiment.component";
import {CHART_DIRECTIVES} from "ng2-charts/ng2-charts";
import {ViewAllExperiments} from "./components/experiment/view/all/view.all.experiment.component";
import {ViewExperiment} from "./components/experiment/view/view.experiment.component";
import {LineChartComponent} from "./components/charts/line/line.chart.component";
import {BarChartComponent} from "./components/charts/bar/bar.chart.component";
import {ViewAlgorithmComponent} from "./components/algorithm/view/algorithm.view.component";
import {ViewDatasetComponent} from "./components/dataset/view/dataset.view.component";
import {AlgorithmCategoriesComponent} from "./components/categories/Algorithm/algorithmcategories.component";
import {DatasetCategoriesComponent} from "./components/categories/Dataset/datasetcategories.component";
import {CreateAlgorithmCategoryComponent} from "./components/categories/Create/Algorithm/createalgorithmcategory.component";
import {CreateDatasetCategoryComponent} from "./components/categories/Create/Dataset/createdatasetcategory.component";
import {EditAlgorithmCategoryComponent} from "./components/categories/Algorithm/Edit/editalgorithmcategory.component";
import {EditDatasetCategoryComponent} from "./components/categories/Dataset/Edit/editdatasetcategory.component";
import {HighlightCodeDirective} from "./directives/highlight.directive";
import {NodeMonitor} from "./components/admin/node/monitor/node.monitor.component";
import {DataTableDirectives} from "angular2-datatable/datatable";
import {MaterializePaginator} from "./components/dataTable/materializePaginator.component";



@NgModule({
  imports:      [ BrowserModule,
                  HttpModule,
                  FormsModule,
                  routing,
                  ReactiveFormsModule,
                  ],
  declarations: [ AppComponent,
                  HomeComponent,
                  MaterializeDirective,
                  FooterComponent,
                  NavigationComponent,
                  ActivateAccountComponent,
                  ProfileComponent,
                  RegisterAccountComponent,
                  ResetFinishComponent,
                  ResetRequestComponent,
                  LoginComponent,
                  LogoutComponent,
                  UploadComponent,
                  FolderComponent,
                  FileComponent,
                  FileBrowserComponent,
                  UsersComponent,
                  CreateComponent,
                  EditorComponent,
                  UploadAlgorithmComponent,
                  ViewAllAlgorithmsComponent,
                  ViewUsersAlgorithmsComponent,
                  UploadDatasetComponent,
                  ViewAllDatasetsComponent,
                  ViewUsersDatasetsComponent,
                  CreateExperimentComponent,
                  CHART_DIRECTIVES,
                  ViewAllExperiments,
                  ViewExperiment,
                  LineChartComponent,
                  BarChartComponent,
                  ViewAlgorithmComponent,
                  ViewDatasetComponent,
                  AlgorithmCategoriesComponent,
                  DatasetCategoriesComponent,
                  CreateAlgorithmCategoryComponent,
                  CreateDatasetCategoryComponent,
                  EditAlgorithmCategoryComponent,
                  EditDatasetCategoryComponent,
                  HighlightCodeDirective,
                  NodeMonitor,
                  DataTableDirectives,
                  MaterializePaginator
                ],
  bootstrap:    [ AppComponent,
                ],
  providers:    [ APIService,
                  ValidatorService,
                  FileUploadService,
                  {
                    provide: Http,  useFactory: (xhrBackend: XHRBackend, requestOptions: RequestOptions) => new AuthenticationService(xhrBackend, requestOptions),
                    deps: [XHRBackend, RequestOptions]
                  },
                ]
})
export class AppModule { }
