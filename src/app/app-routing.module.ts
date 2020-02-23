import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainViewComponent } from './main-view/main-view.component';
import { SettingsViewComponent } from './settings-view/settings-view.component';
import { HistoryViewComponent } from './history-view/history-view.component';

const routes: Routes = [
  { path: '', component: MainViewComponent },
  { path: 'history', component: HistoryViewComponent },
  { path: 'settings', component: SettingsViewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
