import { AppBaseComponent } from '../app-base/app-base.component';

import { Component } from '@angular/core';
import { Usuario } from '../service/gestion-usuarios/gestion-usuario';
import { GestionUsuarioService } from '../service/gestion-usuarios/gestion-usuario.service';
import { ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';

import { Usuario as usuarioSession } from '../service/login/usuario';

class ObjectoUsuario implements Usuario {
    constructor(public id?: number, public nombre?: string, public email?: string) {
    }
}

@Component({
    selector: 'app-gestion-usuarios',
    templateUrl: './app-gestion-usuarios.component.html',
    styleUrls: ['./app-gestion-usuarios.component.css']
})
export class AppGestionUsuariosComponent extends AppBaseComponent {
    //usuarioLogueado: boolean = false;

    item: Usuario = new ObjectoUsuario();

    msgs: any[] = []; //Array de mensajes de error    


    nueva_contrasenya: string = "";
    confirmar_nueva_contrasenya: string = "";
    solicitudNuevaContrasenya: boolean = false;
    mostrar_boton_save: boolean = false;

    constructor(private gestionUsuarioService: GestionUsuarioService,
        private confirmationService: ConfirmationService) { 
            super();
        }

    ngOnInit() {
        let itemSesion: usuarioSession = JSON.parse(sessionStorage.getItem('usuarioEnSession'));

        if (itemSesion != null) {
            this.usuarioLogueado = true;
            this.item.id = itemSesion.id;
            this.item.nombre = itemSesion.nombre;
            this.item.email = itemSesion.email;
        }
    }

    save() {
        if (this.checkSave()) {
            this.msgs = [];

            this.gestionUsuarioService.patchSetNombreEmail(this.item)
                .then(item => {
                    sessionStorage.setItem('usuarioEnSession', JSON.stringify(this.item));
                    this.msgs.push({ severity: 'info', summary: 'Datos cambiados', detail: 'Los datos del usuario han sido cambiados.' })
                })
                .catch((error: any) => {
                    let codigo_error: Number = Number(error._body.code);
                    switch (error.status) {
                        case 403:
                            this.msgs.push({ severity: 'error', summary: 'Error', detail: 'No tiene privilegios suficientes.' });
                            break;
                        case 500:
                            switch (codigo_error) {
                                case -1:
                                    this.msgs.push({ severity: 'error', summary: 'Error', detail: 'Error en la consulta.' });
                                    break;
                                case -2:
                                    this.msgs.push({ severity: 'error', summary: 'Error', detail: 'Error sin identificar.' });
                                    break;
                            }
                            break;
                    }
                });
        }
    }

    postSave() {

    }

    checkSave() {
        let isError: boolean = false;

        this.msgs = [];
        if ("" == this.item.nombre || null == this.item.nombre) {
            this.msgs.push({ severity: 'error', summary: 'Campo obligatorio', detail: 'Debe indicar el nombre.' });
            isError = true;
        }

        if ("" == this.item.email || null == this.item.email) {
            this.msgs.push({ severity: 'error', summary: 'Campo obligatorio', detail: 'Debe indicar el email.' });
            isError = true;
        }


        return !isError;
    }

    activar_cambiar_contrasenya() {
        this.solicitudNuevaContrasenya = true;
    }

    cancelar_cambiar_contrasenya() {
        this.solicitudNuevaContrasenya = false;
    }

    save_nueva_contrasenya() {
        this.gestionUsuarioService.patchSetPassword(this.item.id, this.nueva_contrasenya)
            .then(item => {
                this.msgs.push({ severity: 'info', summary: 'Nueva contraseña', detail: 'Se ha cambiado la contraseña.' });
                this.mostrar_boton_save = false;
                this.cancelar_cambiar_contrasenya();
            })
            .catch((error: any) => {
                let codigo_error: Number = Number(error._body.code);
                switch (error.status) {
                    case 403:
                        this.msgs.push({ severity: 'error', summary: 'Error', detail: 'No tiene privilegios suficientes.' });
                        break;
                    case 500:
                        switch (codigo_error) {
                            case -1:
                                this.msgs.push({ severity: 'error', summary: 'Error', detail: 'Error en la consulta.' });
                                break;
                            case -2:
                                this.msgs.push({ severity: 'error', summary: 'Error', detail: 'Error sin identificar.' });
                                break;
                        }
                        break;
                }
            });
    }

    activar_boton_save() {
        console.log("Verificando activar_boton_save");
        console.log("X = " + this.nueva_contrasenya);
        console.log("Y = " + this.confirmar_nueva_contrasenya);
        if (this.nueva_contrasenya === this.confirmar_nueva_contrasenya && this.nueva_contrasenya.length >= 8) {
            console.log("Activamos el boton save");
            this.mostrar_boton_save = true;
        }
    }
}