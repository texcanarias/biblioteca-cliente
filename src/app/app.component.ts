import { Component } from '@angular/core';
import { MenubarModule, MenuItem } from 'primeng/primeng'
import { Router, ActivatedRoute } from '@angular/router';

import { LoginService } from './service/login/login.service';
import { Usuario } from './service/login/usuario';

class UsuarioLogueado implements Usuario {
  constructor(public id?: number, public usuario?:string, public nombre?: string, public tipo?: number, public apikey?: string) {
    this.id = -1;
    this.nombre = "";
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  static tipo_admin: number = 2;
  static tipo_editor: number = 3;
  static tipo_auditor: number = 4;


  msgs: any[] = []; //Array de mensajes de error 

  solicitudRecordarContrasenya: boolean = false;

  usuario: string = "";
  password: string = "";
  email: string = "";

  usuarioLogueado: boolean = false;
  objUsuarioLogueado: any = new UsuarioLogueado();

  private itemsMenubar: MenuItem[];

  constructor(private loginService: LoginService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.reInit();
  }

  reInit() {
    if (sessionStorage.getItem('usuarioEnSession')) {
      this.usuarioLogueado = true;
      this.objUsuarioLogueado = JSON.parse(sessionStorage.getItem('usuarioEnSession'));
      this.usuario = this.objUsuarioLogueado.nombre;
    }
    else {
      this.usuarioLogueado = false;
      this.objUsuarioLogueado = null;
    }
  }

  private editar_menu() {
    switch (Number(this.objUsuarioLogueado.tipo)) {
      case AppComponent.tipo_admin:
        this.itemsMenubar = [
          { label: 'Empresas', icon: 'fa-address-book', routerLink: ['/gestion_empresa'] },
          { label: 'Administrador', icon: 'fa-user', routerLink: ['/gestion_usuario'] }
        ];
        break;
      case AppComponent.tipo_editor:
        this.itemsMenubar = [
          { label: 'Calendario de auditorias', icon: 'fa-calendar-o', routerLink: ['/calendario'] },
          { label: 'Acciones', icon: 'fa-play', routerLink: ['/acciones'] },
          {
            label: 'Estadísticas', icon: 'fa-area-chart',
            items: [{ label: 'Puntuaciones totales', icon: 'fa-line-chart', routerLink: ['/estadisticas_totales'] },
            { label: 'Listado indicadores', icon: 'fa-area-chart', routerLink: ['/estadisticas_listado_indicadores'] },
            { label: 'Indicadores por área', icon: 'fa-area-chart', routerLink: ['/estadisticas_listado_area_indicadores'] }]
          },
          {
            label: 'Edición', icon: 'fa-pencil',
            items: [{ label: 'Modelos check list', icon: 'fa-check', routerLink: ['/check_list'] },
            { label: 'Indicadores', icon: 'fa-reorder', routerLink: ['/indicadores'] },
            { label: 'Equipo de trabajo', icon: 'fa-user-circle-o', routerLink: ['/equipo'] },
            { label: 'Documentación', icon: 'fa-paperclip', routerLink: ['/documentacion'] },
            { label: 'Areas', icon: 'fa-th', routerLink: ['/area'] }
            ]
          }
        ];
        break;
      case AppComponent.tipo_auditor:
        this.itemsMenubar = [
          { label: 'Calendario de auditorias', icon: 'fa-calendar-o', routerLink: ['/calendario'] },
          { label: 'Acciones', icon: 'fa-play', routerLink: ['/acciones'] },
          {
            label: 'Estadísticas', icon: 'fa-area-chart',
            items: [{ label: 'Puntuaciones totales', icon: 'fa-line-chart', routerLink: ['/estadisticas_totales'] },
            { label: 'Listado indicadores', icon: 'fa-area-chart', routerLink: ['/estadisticas_listado_indicadores'] },
            { label: 'Indicadores por área', icon: 'fa-area-chart', routerLink: ['/estadisticas_listado_area_indicadores'] }]
          }
        ];
        break;
    }
  }

  response: string;

  onCommand(event) {
    if (event.command === 'date')
      this.response = new Date().toDateString();
    else
      this.response = 'Unknown command: ' + event.command;
  }


  /**
   * Comprobar el usuario y contraseña, en el caso de que este OK
   * dar paso a la aplicacion.
   * 
   * En este caso se simula la entrada de tres tipos de usuario
   *  - admin
   *  - auditor
   *  - gestor
   */
  save() {
    this.msgs = [];

    this.loginService.postLogin(this.usuario, this.password)
      .then(item => {
        this.objUsuarioLogueado = item;
        this.configuracion_sesion()
        console.log("app.component SAVE");
        console.log(this.objUsuarioLogueado)
      })
      .catch((error: any) => {
        let codigo_error: Number = Number(error._body.code);
        switch (error.status) {
          case 400:
            this.msgs.push({ severity: 'error', summary: 'Error', detail: 'Ha introducido un usuario o contraseña incorrecto.' });
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

  private configuracion_sesion() {
    this.usuarioLogueado = true;
    switch (Number(this.objUsuarioLogueado.tipo)) {
      case AppComponent.tipo_admin:
        sessionStorage.setItem('usuarioEnSession', JSON.stringify(this.objUsuarioLogueado));
        this.router.navigate(['/gestion_empresa']);
        this.editar_menu();
        break;
      case AppComponent.tipo_editor:
        sessionStorage.setItem('usuarioEnSession', JSON.stringify(this.objUsuarioLogueado));
        this.router.navigate(['/area']);
        this.editar_menu();
        break;
      case AppComponent.tipo_auditor:
        sessionStorage.setItem('usuarioEnSession', JSON.stringify(this.objUsuarioLogueado));
        this.router.navigate(['/calendario']);
        this.editar_menu();
        break;
      default:
        this.usuarioLogueado = false;
        this.msgs.push({ severity: 'error', summary: 'Usuario o password incorrecto.', detail: 'Ha introducido un usuario o contraseña incorrecto.' });
        break;
    }
  }



  /**
   * Enviar una nueva contraseña al correo.
   */
  recordar_contrasenya() {
    this.msgs = [];

    this.loginService.postRecuperarPass(this.email)
      .then(() => { this.msgs.push({ severity: 'info', summary: 'Nueva contraseña', detail: 'Se ha enviado un email con una nueva contraseña.' });
                    this.solicitudRecordarContrasenya = false; })
      .catch((error: any) => {
        let codigo_error: Number = Number(error._body.code);
        switch (error.status) {
          case 400:
            this.msgs.push({ severity: 'error', summary: 'Error', detail: 'Email no existente.' });
            break;
          case 500:
            switch (codigo_error) {
              case 1:
                this.msgs.push({ severity: 'error', summary: 'Error', detail: 'No se ha podido enviar el correo.' });
                break;
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

  activar_recordar_contrasenya() {
    this.solicitudRecordarContrasenya = true;
  }

  cancelar_recordar_contrasenya() {
    this.msgs = [];
    
    this.solicitudRecordarContrasenya = false;
  }

  logout() {
    this.objUsuarioLogueado = new UsuarioLogueado();
    this.usuario = "";
    this.password = "";
    sessionStorage.clear();
    this.usuarioLogueado = false;
    this.router.navigate(['/home']);
  }
}
