import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FactoryComponent } from './factory/factory.component';
import { RecordSensorsComponent } from './record-sensors/record-sensors.component';
import { RecordFactoriesComponent } from './record-factories/record-factories.component';

export const routes: Routes = [
    {path:"login",component:LoginComponent},
    {path:"",redirectTo:"/login",pathMatch:'full'},
    {path:"dashboard",component:DashboardComponent},
    {path:"factory",component:FactoryComponent},
    {path:"records-sensors",component:RecordSensorsComponent},
    {path:"records-factories",component:RecordFactoriesComponent},
    {path:"**",redirectTo:"/login"},
];
