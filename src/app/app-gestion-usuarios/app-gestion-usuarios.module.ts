import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppGestionUsuariosComponent } from './app-gestion-usuarios.component';
import { GestionUsuarioService } from '../service/gestion-usuarios/gestion-usuario.service';


import {
  DataTableModule,
  SharedModule,
  InputTextModule,
  ButtonModule,
  DialogModule,
  EditorModule,
  ConfirmDialogModule,
  ConfirmationService,
  FileUploadModule,
  GalleriaModule
} from 'primeng/primeng';


@NgModule({
imports: [CommonModule,
    DataTableModule,
    SharedModule,
    ButtonModule,
    InputTextModule,
    DialogModule,
    EditorModule,
    ConfirmDialogModule,
    FileUploadModule,
    GalleriaModule],
  declarations: [AppGestionUsuariosComponent],
  bootstrap:[AppGestionUsuariosComponent],
  providers: [GestionUsuarioService,ConfirmationService]
})
export class AppGestionUsuariosModule { }