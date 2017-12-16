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
import { AppIndicadorRealComponent } from './app-indicador-real/app-indicador-real.component';
import { AppCheckListComponent } from './app-check-list/app-check-list.component';
import { AppAuditoriaDocumentacionComponent } from './app-auditoria-documentacion/app-auditoria-documentacion.component';
import { AppAuditoriaAccionComponent } from './app-auditoria-accion/app-auditoria-accion.component';
import { AppAuditoriaComponent } from './app-auditoria/app-auditoria.component';
import { AppAuditoriaDetalleComponent } from './app-auditoria-detalle/app-auditoria-detalle.component';
import { AppAccionPendienteComponent } from './app-accion-pendiente/app-accion-pendiente.component';
import { AppEncuestaPuntuacionesComponent } from './app-encuesta-puntuaciones/app-encuesta-puntuaciones.component';
import { AppEncuestaListadoIndicadorComponent } from './app-encuesta-listado-indicador/app-encuesta-listado-indicador.component';
import { AppEncuestaListadoIndicadorAreaComponent } from './app-encuesta-listado-indicador-area/app-encuesta-listado-indicador-area.component';
import { AppEdicionDocumentoComponent } from './app-edicion-documento/app-edicion-documento.component';
import { AppEquipoTrabajoComponent } from './app-equipo-trabajo/app-equipo-trabajo.component';
import { AppEdicionCheckListComponent } from './app-edicion-check-list/app-edicion-check-list.component';
import { AppEdicionIndicadorComponent } from './app-edicion-indicador/app-edicion-indicador.component';
import { AppEdicionAreaEmpresaComponent } from './app-edicion-area-empresa/app-edicion-area-empresa.component';
import { AppGestionEmpresaComponent } from './app-gestion-empresa/app-gestion-empresa.component';
import { AppGestionUsuariosComponent } from './app-gestion-usuarios/app-gestion-usuarios.component';
import { AppHomeComponent } from './app-home/app-home.component';

//Servicios para los detalles de la auditoria
import { EstadisticaListadoPuntuacionService } from './service/estadistica-listado-puntuacion-service/estadistica-listado-puntuacion.service';
import { IndicadorValorRealService } from './service/indicador-valor-real-service/indicador-valor-real.service';
import { AuditoriaCheckListService } from './service/auditoria-check-list-service/auditoria-check-list.service';
import { AuditoriaDocumentacionService } from './service/auditoria-documentacion-service/auditoria-documentacion.service';
import { AuditoriaAccionService} from './service/auditoria-accion-service/auditoria-accion.service';
import { AuditoriaAccionDocumentacionService } from './service/auditoria-accion-service/auditoria-accion-documentacion.service';
import { EquipoService } from './service/equipo-service/equipo.service';
import { AreaTrabajoService } from './service/area-trabajo-service/area-trabajo.service';
import { EstadisticaListadoIndicadorService } from './service/estadistica-listado-indicador-service/estadistica-listado-indicador.service';
import { EstadisticaListadoIndicadorAreaService } from './service/estadistica-listado-indicador-area-service/estadistica-listado-indicador-area.service';
import { EquipoTrabajoService } from './service/equipo-trabajo-service/equipo-trabajo.service';
import { EdicionChecklistService } from './service/edicion-checklist-service/edicion-checklist.service';
import { EdicionIndicadorService } from './service/edicion-indicador-service/edicion-indicador.service';
import { AuditoriaCalendarioService } from './service/auditoria-calendario-service/auditoria-calendario.service';
import { EdicionAreaEmpresaService } from './service/edicion-area-empresa/edicion-area-empresa.service';
import { GestionEmpresaService } from './service/gestion-empresas/gestion-empresa.service';
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
  { path: 'auditoria', component: AppAuditoriaDetalleComponent },
  { path: 'auditoria/:id', component: AppAuditoriaDetalleComponent },
  { path: 'calendario', component: AppAuditoriaComponent },
  { path: 'acciones', component: AppAccionPendienteComponent},
  { path: 'estadisticas_totales', component: AppEncuestaPuntuacionesComponent},
  { path: 'estadisticas_listado_indicadores', component: AppEncuestaListadoIndicadorComponent},
  { path: 'estadisticas_listado_area_indicadores', component: AppEncuestaListadoIndicadorAreaComponent},
  { path: 'check_list', component: AppEdicionCheckListComponent},
  { path: 'documentacion', component: AppEdicionDocumentoComponent},
  { path: 'area', component: AppEdicionAreaEmpresaComponent},
  { path: 'equipo', component: AppEquipoTrabajoComponent},
  { path: 'indicadores', component: AppEdicionIndicadorComponent},
  { path: 'gestion_empresa', component: AppGestionEmpresaComponent},
  { path: 'gestion_usuario', component: AppGestionUsuariosComponent},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    AppIndicadorRealComponent,
    AppCheckListComponent,
    AppAuditoriaDocumentacionComponent,
    AppAuditoriaAccionComponent,
    AppAuditoriaComponent,
    AppAuditoriaDetalleComponent,
    AppAccionPendienteComponent,
    AppEncuestaPuntuacionesComponent,
    AppEncuestaListadoIndicadorComponent,
    AppEncuestaListadoIndicadorAreaComponent,
    AppEdicionDocumentoComponent,
    AppEquipoTrabajoComponent,
    AppEdicionCheckListComponent,
    AppEdicionIndicadorComponent,
    AppEdicionAreaEmpresaComponent,
    AppGestionEmpresaComponent,
    AppGestionUsuariosComponent,
    AppHomeComponent
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
    IndicadorValorRealService,
    AuditoriaCheckListService,
    AuditoriaDocumentacionService,
    AuditoriaAccionService,
    AuditoriaAccionDocumentacionService,
    AuditoriaCalendarioService,
    EquipoService,
    AreaTrabajoService,
    EstadisticaListadoIndicadorService,
    EstadisticaListadoIndicadorAreaService,
    EstadisticaListadoPuntuacionService,
    EquipoTrabajoService,
    EdicionChecklistService,
    EdicionIndicadorService,
    EdicionAreaEmpresaService,
    GestionEmpresaService,
    GestionUsuarioService,
    LoginService,
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
