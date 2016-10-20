import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {ProfileComponent} from "./components/account/profile/profile.component";
import {ActivateAccountComponent} from "./components/account/activate/activate.component";
import {RegisterAccountComponent} from "./components/account/register/register.component";
import {ResetRequestComponent} from "./components/account/reset/request/reset.request.component";
import {ResetFinishComponent} from "./components/account/reset/finish/reset.finish.component";
import {LoginComponent} from "./components/login/login.component";
import {LogoutComponent} from "./components/logout/logout.component";
import {UsersComponent} from "./components/users/users.component";
import {CreateComponent} from "./components/users/create/create.component";
import {UploadAlgorithmComponent} from "./components/algorithm/upload/algorithm.upload.component";
import {ViewAllAlgorithmsComponent} from "./components/algorithm/view/all/algorithm.view.all.component";
import {ViewUsersAlgorithmsComponent} from "./components/algorithm/view/user/algorithm.view.user.component";
import {UploadDatasetComponent} from "./components/dataset/upload/dataset.upload.component";
import {ViewAllDatasetsComponent} from "./components/dataset/view/all/dataset.view.all.component";
import {ViewUsersDatasetsComponent} from "./components/dataset/view/user/dataset.view.user.component";
import {CreateExperimentComponent} from "./components/experiment/create/createexperiment.component";
import {ViewAllExperiments} from "./components/experiment/view/all/view.all.experiment.component";
import {ViewExperiment} from "./components/experiment/view/view.experiment.component";
import {ViewAlgorithmComponent} from "./components/algorithm/view/algorithm.view.component";
import {ViewDatasetComponent} from "./components/dataset/view/dataset.view.component";
import {AlgorithmCategoriesComponent} from "./components/categories/Algorithm/algorithmcategories.component";
import {DatasetCategoriesComponent} from "./components/categories/Dataset/datasetcategories.component";
import {CreateAlgorithmCategoryComponent} from "./components/categories/Create/Algorithm/createalgorithmcategory.component";
import {CreateDatasetCategoryComponent} from "./components/categories/Create/Dataset/createdatasetcategory.component";
import {EditDatasetCategoryComponent} from "./components/categories/Dataset/Edit/editdatasetcategory.component";
import {EditAlgorithmCategoryComponent} from "./components/categories/Algorithm/Edit/editalgorithmcategory.component";
import {CompareExeriment} from "./components/experiment/compare/compare.experiment.component";

const routes:Routes =[
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path:'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'activate/:key', component: ActivateAccountComponent },
  { path: 'register', component: RegisterAccountComponent },
  { path: 'reset', component: ResetRequestComponent },
  { path: 'reset_finish/:key', component: ResetFinishComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'users', component: UsersComponent },
  { path: 'create/user', component: CreateComponent },
  { path: 'create/experiment', component: CreateExperimentComponent},
  { path: 'view/experiments', component: ViewAllExperiments},
  { path: 'view/experiment/:id', component: ViewExperiment },
  { path: 'upload/algorithm', component: UploadAlgorithmComponent },
  { path: 'upload/dataset', component: UploadDatasetComponent },
  { path: 'view/all/algorithms', component: ViewAllAlgorithmsComponent },
  { path: 'view/all/datasets', component: ViewAllDatasetsComponent },
  { path: 'view/user/algorithms', component: ViewUsersAlgorithmsComponent },
  { path: 'view/user/datasets', component: ViewUsersDatasetsComponent },
  { path: 'view/algorithm/:id', component: ViewAlgorithmComponent },
  { path: 'view/dataset/:id', component: ViewDatasetComponent },
  { path: 'view/all/algorithmcategories', component: AlgorithmCategoriesComponent},
  { path: 'view/all/datasetcategories', component: DatasetCategoriesComponent},
  { path: 'create/algorithmcategory', component: CreateAlgorithmCategoryComponent},
  { path: 'create/datasetcategory', component: CreateDatasetCategoryComponent},
  { path: 'view/category/datasets/:id', component: EditDatasetCategoryComponent},
  { path: 'view/category/algorithm/:id', component: EditAlgorithmCategoryComponent},
  { path: 'compare/experiment/', component: CompareExeriment}
];

export const routing = RouterModule.forRoot(routes);

