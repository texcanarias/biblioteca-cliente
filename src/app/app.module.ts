import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import { RouterModule, Routes } from '@angular/router';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './not-found.component';
import { AppGestionUsuariosComponent } from './app-gestion-usuarios/app-gestion-usuarios.component';
import { AppClientesComponent } from './app-clientes/app-clientes.component';
import { AppProveedoresComponent } from './app-proveedores/app-proveedores.component';
import { AppHomeComponent } from './app-home/app-home.component';

//Servicios para los detalles de la auditoria
import { GestionUsuarioService } from './service/gestion-usuarios/gestion-usuario.service';
import { LoginService } from './service/login/login.service';

import {TabViewModule,
      DataTableModule,
      SharedModule,
      DialogModule,
      ButtonModule,
      DropdownModule,
      ConfirmDialogModule,
      ConfirmationService,
      FileUploadModule,
      GalleriaModule,
      ToggleButtonModule,
      CalendarModule,
      InputTextareaModule,
      DataGridModule,
      PanelModule,
      ChartModule,
      RadioButtonModule,
      MultiSelectModule,
      MenubarModule, 
      MenuItem
      } from 'primeng/primeng';

const appRoutes: Routes = [
  { path: '',redirectTo: 'home', pathMatch: 'full' },  
  { path: 'home', component: AppHomeComponent },
  { path: 'gestion_usuario', component: AppGestionUsuariosComponent},
  { path: 'gestion_clientes', component: AppClientesComponent},
  { path: 'gestion_proveedores', component: AppProveedoresComponent},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    AppGestionUsuariosComponent,
    AppHomeComponent,
    AppClientesComponent,
    AppProveedoresComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    MenubarModule,
    FormsModule,
    HttpModule,
    TabViewModule,
    DataTableModule,
    SharedModule,
    DialogModule,
    ButtonModule,
    DropdownModule,
    ConfirmDialogModule,
    FileUploadModule,
    GalleriaModule,
    ToggleButtonModule,
    CalendarModule,
    InputTextareaModule,
    DataGridModule,
    PanelModule,
    ChartModule,
    RadioButtonModule,
    MultiSelectModule
  ],
  providers: [
    ConfirmationService,
    GestionUsuarioService,
    LoginService,
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
