import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainViewComponent } from './main-view/main-view.component';
import { SettingsViewComponent } from './settings-view/settings-view.component';

const routes: Routes = [
  { path: '', component: MainViewComponent },
  { path: 'settings', component: SettingsViewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
