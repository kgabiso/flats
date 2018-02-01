import {ModuleWithProviders, NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {UsersComponent} from './users/users.component';
import {FlatsComponent} from './flats/flats.component';
import {NewFlatsComponent} from './new-flats/new-flats.component';
import {FlatImageComponent} from './flat-image/flat-image.component';



export const router: Routes = [
  {path: '', redirectTo: 'flats', pathMatch: 'full'},
  {path: 'users', component: UsersComponent},
  {path: 'flats', component: FlatsComponent},
  {path: 'new-flat', component: NewFlatsComponent},
  {path: 'flat-image/:id', component: FlatImageComponent}
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);
