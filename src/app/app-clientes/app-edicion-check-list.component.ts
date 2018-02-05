import { AppBaseComponent } from '../app-base/app-base.component';

import { Component } from '@angular/core';
import { ModeloAspectos, ModeloCheckList } from '../service/edicion-checklist-service/edicion-check-list';
import { EdicionChecklistService } from '../service/edicion-checklist-service/edicion-checklist.service';
import { SelectItem } from 'primeng/primeng'
import { ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';

class ObjetoModeloCheckList implements ModeloCheckList {
    constructor(public id?: number, public nombre?: string, public activo?: boolean, public aspectos?: any[]) {
        this.aspectos = [];
        this.activo = false;
    }
}

class ObjetoModeloAspectos implements ModeloAspectos {
    constructor(public id?: number, public nombre?: string, public id_fase?: number, public nombre_fase?: string) {
        this.id = null;
    }
}

@Component({
    selector: 'app-edicion-check-list',
    templateUrl: './app-edicion-check-list.component.html',
    styleUrls: ['./app-edicion-check-list.component.css']
})

export class AppEdicionCheckListComponent extends AppBaseComponent {
    displayDialog: boolean;
    item: ModeloCheckList = new ObjetoModeloCheckList();
    selectedItem: ModeloCheckList;
    newItem: boolean;
    items: ModeloCheckList[];


    //Elementos usados por el Aspecto
    displayDialogAspecto: boolean;
    itemAspecto: ModeloAspectos = new ObjetoModeloAspectos();
    selectedItemAspecto: ModeloCheckList;
    newItemAspecto: boolean;

    //Calendario. Internacionalizacion del Calendario
    locale_calendar_es: any;

    msgs: any[] = []; //Array de mensajes de error    
    msgs_table: any[] = []; //Array de mensajes de error  

    fases: SelectItem[]; //Listado de las fases
    fases_json: any[];

    constructor(private ModeloCheckListService: EdicionChecklistService,
        private confirmationService: ConfirmationService) {
        super();
    }

    ngOnInit() {
        super.ngOnInit();

        this.cargaTodo();

        this.fases = [];
        this.fases.push({ label: "1S - Separar innecesarios", value: "1" });
        this.fases.push({ label: "2S - Situar necesarios", value: "2" });
        this.fases.push({ label: "3S - Suprimir suciedad", value: "3" });
        this.fases.push({ label: "4S - Señalar anomalías", value: "4" });
        this.fases.push({ label: "5S - Seguir mejorando", value: "5" });

        this.fases_json = [];
        this.fases_json["1"] = "1S - Separar innecesarios";
        this.fases_json["2"] = "2S - Situar necesarios";
        this.fases_json["3"] = "3S - Suprimir suciedad";
        this.fases_json["4"] = "4S - Señalar anomalías";
        this.fases_json["5"] = "5S - Seguir mejorando";
    }

    cargaTodo(){
        this.ModeloCheckListService.getListado().then(items => {
            this.items = <ModeloCheckList[]>items;
        });
    }

    showDialogToAdd() {
        this.newItem = true;
        this.item = new ObjetoModeloCheckList();
        this.displayDialog = true;
    }

    save() {
        let items = [...this.items];
        if (this.checkSave()) {
            if (this.newItem) {
                    this.ModeloCheckListService.postItem(this.item)
                    .then((res: any) => {
                        let item = JSON.parse(res._body);
                        let a: ModeloCheckList = new ObjetoModeloCheckList(item.id, item.nombre, item.miembros, item.activo);
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
                    this.ModeloCheckListService.putItem(this.item)
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
    
        this.ModeloCheckListService.deleteItem(this.item)
            .then((res: any) => {
                this.items = this.items.filter((val, i) => i != this.findSelectedItemIndex());
                this.item = null;
                this.displayDialog = false;
                this.msgs_table.push({ severity: 'info', summary: 'Checklist eliminado', detail: 'El checklist ha sido eliminado.' });
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

    cloneItem(c: ModeloCheckList): ModeloCheckList {
        let item = new ObjetoModeloCheckList();
        for (let prop in c) {
            item[prop] = c[prop];
        }
        return item;
    }

    modifyItemListado(objListado: any, objItem: any): any {
        let item = new ObjetoModeloCheckList();
        for (let prop in objListado) {
            objListado[prop] = objItem[prop];
        }
        return objListado;
    }


    findSelectedItemIndex(): number {
        return this.items.indexOf(this.selectedItem);
    }
}