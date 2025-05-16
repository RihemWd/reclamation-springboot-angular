import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientsComponent } from './clients/clients.component';
import { ReclamationsComponent } from './reclamations/reclamations.component';

const routes: Routes = [
  { path: 'clients', component: ClientsComponent },
  { path: 'reclamations', component: ReclamationsComponent },
  { path: '', redirectTo: '/clients', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
