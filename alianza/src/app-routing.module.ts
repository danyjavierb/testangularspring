import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PageNotFoundComponent} from './app/page-not-found/page-not-found.component';
import {HomeComponent} from './app/home/home.component';
import {ClientsResolver} from './app/resolvers/client-resolver';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    resolve: {
       clients: ClientsResolver
    }
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    ClientsResolver
  ]
})
export class AppRoutingModule { }
