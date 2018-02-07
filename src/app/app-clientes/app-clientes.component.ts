import { AppBaseComponent } from '../app-base/app-base.component';

import { Component } from '@angular/core';
import { Cliente } from '../service/app-clientes/cliente';
import { AppClientesService } from '../service/app-clientes/app-clientes.service';
import { SelectItem } from 'primeng/primeng'
import { ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';


class ObjetoCliente implements Cliente {
    constructor(id?: number,  nombre?: string, codigo?: string, url?: string, comentarios?: string, direccion?: string, ciudad?: string,  provincia?: string,  estado?: string,cp?: string, persona_contacto?: string, telefono?: string, movil?: string, fax?: string, email?: string, dias_vencimiento?: string, tipo?: string) {
    }
}



@Component({
    selector: 'app-clientes',
    templateUrl: './app-clientes.component.html',
    styleUrls: ['./app-clientes.component.css']
})

export class AppClientesComponent extends AppBaseComponent {
    displayDialog: boolean;
    item: Cliente = new ObjetoCliente();
    selectedItem: Cliente;
    newItem: boolean;
    items: Cliente[];

    //Calendario. Internacionalizacion del Calendario
    locale_calendar_es: any;

    msgs: any[] = []; //Array de mensajes de error    
    msgs_table: any[] = []; //Array de mensajes de error  

    constructor(private ModeloClienteService: AppClientesService,
                private confirmationService: ConfirmationService) {
        super();
    }

    ngOnInit() {
        super.ngOnInit();

        this.cargaTodo();
    }

    cargaTodo(){
        this.ModeloClienteService.getItems().then(items => {
            this.items = <Cliente[]>items;
        });
    }

    showDialogToAdd() {
        this.newItem = true;
        this.item = new ObjetoCliente();
        this.displayDialog = true;
    }

    save() {
        let items = [...this.items];
        if (this.checkSave()) {
            if (this.newItem) {
                    this.ModeloClienteService.postItem(this.item)
                    .then((res: any) => {
                        let item = JSON.parse(res._body);
                        let a: Cliente = new ObjetoCliente(item.id,  item.nombre, item.codigo, item.url, item.comentarios, item.direccion, item.ciudad,  item.provincia,  item.estado, item.cp, item.persona_contacto, item.telefono, item.movil, item.fax, item.email, item.dias_vencimiento, item.tipo);
                        items.push(a);                        
                        this.items = [...items];
                        this.item = null;
                        this.displayDialog = false;
                        this.postSave();
                        this.msgs_table.push({ severity: 'info', summary: 'Checklist creado', detail: 'Se ha dado de alta un checklist.' });

                        this.cargaTodo();
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
            else {
                    this.ModeloClienteService.putItem(this.item)
                    .then((res: any) => {
                        let item = JSON.parse(res._body);
                        let idx = this.findSelectedItemIndex();
                        this.items[idx] = this.modifyItemListado(this.items[idx], item);
                        this.item = null;
                        this.displayDialog = false;
                        this.postSave();
                        this.msgs_table.push({ severity: 'info', summary: 'Checklist modificado', detail: 'El checklist ha sido modificado.' });

                        this.cargaTodo();                        
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

            this.items = items;
            this.item = null;
            this.displayDialog = false;

            this.postSave();
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
        return !isError;
    }

    confirmDelete() {
        this.confirmationService.confirm({
            message: '¿Está seguro que lo quiere eliminar?',
            key: 'check',
            accept: () => {
                this.delete();
            }
        });
    }

    delete() {
        this.msgs = [];
        this.msgs_table = [];
    
        this.ModeloClienteService.deleteItem(this.item)
            .then((res: any) => {
                this.items = this.items.filter((val, i) => i != this.findSelectedItemIndex());
                this.item = null;
                this.displayDialog = false;
                this.msgs_table.push({ severity: 'info', summary: 'Cliente eliminado', detail: 'El cliente ha sido eliminado.' });
            })
            .catch((error: any) => {
                let codigo_error: Number = Number(error._body.code);
                switch (error.status) {
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

    postDelete() {
    }

    onRowSelect(event) {
        this.newItem = false;
        this.item = this.cloneItem(event.data);
        this.displayDialog = true;
    }

    cloneItem(c: Cliente): Cliente {
        let item = new ObjetoCliente();
        for (let prop in c) {
            item[prop] = c[prop];
        }
        return item;
    }

    modifyItemListado(objListado: any, objItem: any): any {
        let item = new ObjetoCliente();
        for (let prop in objListado) {
            objListado[prop] = objItem[prop];
        }
        return objListado;
    }


    findSelectedItemIndex(): number {
        return this.items.indexOf(this.selectedItem);
    }
}