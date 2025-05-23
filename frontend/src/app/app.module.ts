import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientsComponent } from './clients/clients.component';
import { ReclamationsComponent } from './reclamations/reclamations.component';
import { AgentsComponent } from './agents.component';
import { SuivisComponent } from './suivis.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientsComponent,
    ReclamationsComponent,
    AgentsComponent,
    SuivisComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
