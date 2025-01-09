import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FactoryComponent } from './factory/factory.component';
import { RecordSensorsComponent } from './record-sensors/record-sensors.component';
import { RecordFactoriesComponent } from './record-factories/record-factories.component';
import { GuardService } from './services/guard.service';

export const routes: Routes = [
    {path:"login",component:LoginComponent},
    
    {path:"dashboard",component:DashboardComponent,canActivate:[GuardService],data:{denied:['/login']}},
    {path:"factory",component:FactoryComponent,canActivate:[GuardService],data:{denied:['/login']}},
    {path:"records-sensors",component:RecordSensorsComponent,canActivate:[GuardService],data:{denied:['/login']}},
    {path:"records-factories",component:RecordFactoriesComponent,canActivate:[GuardService],data:{denied:['/login']}},
    {path:"**",redirectTo:"/login"},
];
