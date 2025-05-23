import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientsComponent } from './clients/clients.component';
import { ReclamationsComponent } from './reclamations.component';
import { AgentsComponent } from './agents.component';
import { SuivisComponent } from './suivis.component';

const routes: Routes = [
  { path: 'clients', component: ClientsComponent },
  { path: 'reclamations', component: ReclamationsComponent },
  { path: 'agents', component: AgentsComponent },
  { path: 'suivis', component: SuivisComponent },
  { path: '', redirectTo: '/clients', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
