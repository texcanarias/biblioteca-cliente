import { OnInit } from '@angular/core';
import { Usuario as usuarioSession } from '../service/login/usuario';

/*@Component({
    selector: 'app-equipo-trabajo'
})*/

export class AppBaseComponent implements OnInit {
    usuarioLogueado: boolean = false;

    ngOnInit() {
        let itemSesion: usuarioSession = JSON.parse(sessionStorage.getItem('usuarioEnSession'));

        if (itemSesion != null) {
            this.usuarioLogueado = true;
        }        
    }
}