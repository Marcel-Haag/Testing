import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PeriodicTableComponent} from './periodic-table/periodic-table.component';

export const START_PAGE = 'elements';

const routes: Routes = [
  {
    path: 'elements',
    component: PeriodicTableComponent
  },
  {path: '', redirectTo: START_PAGE, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
