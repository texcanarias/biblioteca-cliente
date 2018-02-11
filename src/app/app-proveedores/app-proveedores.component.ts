import { AppBaseComponent } from '../app-base/app-base.component';

import { Component } from '@angular/core';
import { Proveedor } from '../service/app-proveedores/proveedor';
import { AppProveedoresService } from '../service/app-proveedores/app-proveedores.service';
import { SelectItem } from 'primeng/primeng'
import { ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';


class ObjetoProveedor implements Proveedor {
    constructor(id?: number,  nombre?: string, codigo?: string, url?: string, comentarios?: string, direccion?: string, ciudad?: string,  provincia?: string,  estado?: string,cp?: string, persona_contacto?: string, telefono?: string, movil?: string, fax?: string, email?: string) {
    }
}

@Component({
  selector: 'app-app-proveedores',
  templateUrl: './app-proveedores.component.html',
  styleUrls: ['./app-proveedores.component.css']
})
export class AppProveedoresComponent extends AppBaseComponent {

  
  displayDialog: boolean;
  item: Proveedor = new ObjetoProveedor();
  selectedItem: Proveedor;
  newItem: boolean;
  items: Proveedor[];

  msgs: any[] = []; //Array de mensajes de error    
  msgs_table: any[] = []; //Array de mensajes de error  

  constructor(private ModeloProveedorService: AppProveedoresService,
              private confirmationService: ConfirmationService) {
      super();
  }

  ngOnInit() {
      super.ngOnInit();

      this.cargaTodo();
  }

  cargaTodo(){
      this.ModeloProveedorService.getItems().then(items => {
          this.items = <Proveedor[]>items;
      });
  }

  showDialogToAdd() {
      this.newItem = true;
      this.item = new ObjetoProveedor();
      this.displayDialog = true;
  }

  save() {
      let items = [...this.items];
      if (this.checkSave()) {
          if (this.newItem) {
                  this.ModeloProveedorService.postItem(this.item)
                  .then((res: any) => {
                      let item = JSON.parse(res._body);
                      let a: Proveedor = new ObjetoProveedor(item.id,  item.nombre, item.codigo, item.url, item.comentarios, item.direccion, item.ciudad,  item.provincia,  item.estado, item.cp, item.persona_contacto, item.telefono, item.movil, item.fax, item.email);
                      items.push(a);                        
                      this.items = [...items];
                      this.item = null;
                      this.displayDialog = false;
                      this.postSave();
                      this.msgs_table.push({ severity: 'info', summary: 'Checklist creado', detail: 'Se ha dado de alta un checklist.' });
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
                  this.ModeloProveedorService.putItem(this.item)
                  .then((res: any) => {
                      let item = JSON.parse(res._body);
                      let idx = this.findSelectedItemIndex();
                      this.items[idx] = this.modifyItemListado(this.items[idx], item);
                      this.item = null;
                      this.displayDialog = false;
                      this.postSave();
                      this.msgs_table.push({ severity: 'info', summary: 'Checklist modificado', detail: 'El checklist ha sido modificado.' });
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
  
      this.ModeloProveedorService.deleteItem(this.item)
          .then((res: any) => {
              this.items = this.items.filter((val, i) => i != this.findSelectedItemIndex());
              this.item = null;
              this.displayDialog = false;
              this.msgs_table.push({ severity: 'info', summary: 'Proveedor eliminado', detail: 'El Proveedor ha sido eliminado.' });
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
      console.log("Modificar esto para que pida los datos por webservice al Id"+event.data.id);
      this.newItem = false;
      //this.item = this.cloneItem(event.data);

      this.ModeloProveedorService.getItem(event.data.id).then(item => {
          this.item = <Proveedor>item;
      });

      this.displayDialog = true;
  }

  cloneItem(c: Proveedor): Proveedor {
      console.log("Quizás este método no es necesario");
      let item = new ObjetoProveedor();
      for (let prop in c) {
          item[prop] = c[prop];
      }
      return item;
  }

  modifyItemListado(objListado: any, objItem: any): any {
      let item = new ObjetoProveedor();
      for (let prop in objListado) {
          objListado[prop] = objItem[prop];
      }
      return objListado;
  }


  findSelectedItemIndex(): number {
      return this.items.indexOf(this.selectedItem);
  }

}
