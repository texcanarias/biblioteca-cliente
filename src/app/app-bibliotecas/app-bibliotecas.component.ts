import { AppBaseComponent } from '../app-base/app-base.component';

import { Component } from '@angular/core';
import { Biblioteca } from '../service/app-bibliotecas/biblioteca';
import { AppBibliotecasService } from '../service/app-bibliotecas/app-bibliotecas.service';
import { SelectItem } from 'primeng/primeng'
import { ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';


class ObjetoBiblioteca implements Biblioteca {
    constructor(id?: number,  titulo?: string, autor?: string, posicion?:string, leido?: boolean, origen?:string) {
    }
}

@Component({
  selector: 'app-app-bibliotecas',
  templateUrl: './app-bibliotecas.component.html',
  styleUrls: ['./app-bibliotecas.component.css']
})
export class AppBibliotecasComponent extends AppBaseComponent {

  
  displayDialog: boolean;
  item: Biblioteca = new ObjetoBiblioteca();
  selectedItem: Biblioteca;
  newItem: boolean;
  items: Biblioteca[];

  leido: SelectItem[];

  msgs: any[] = []; //Array de mensajes de error    
  msgs_table: any[] = []; //Array de mensajes de error  

  constructor(private ModeloBibliotecaService: AppBibliotecasService,
              private confirmationService: ConfirmationService) {
      super();
  }

  ngOnInit() {
      super.ngOnInit();

      this.leido = [
        { label: 'Todos', value: null },
        { label: 'Si', value: "true" },
        { label: 'No', value: "false" }
    ];

      this.cargaTodo();
  }

  cargaTodo(){
      this.ModeloBibliotecaService.getItems().then(items => {
          this.items = <Biblioteca[]>items;
      });
  }

  showDialogToAdd() {
      this.newItem = true;
      this.item = new ObjetoBiblioteca();
      this.displayDialog = true;
  }

  save() {
      let items = [...this.items];
      if (this.checkSave()) {
          if (this.newItem) {
                  this.ModeloBibliotecaService.postItem(this.item)
                  .then((res: any) => {
                      let item = JSON.parse(res._body);
                      let a: Biblioteca = new ObjetoBiblioteca(item.id,  item.titulo, item.autor, item.posicion, item.leido, item.origen);
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
                  this.ModeloBibliotecaService.putItem(this.item)
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
  
      this.ModeloBibliotecaService.deleteItem(this.item)
          .then((res: any) => {
              this.items = this.items.filter((val, i) => i != this.findSelectedItemIndex());
              this.item = null;
              this.displayDialog = false;
              this.msgs_table.push({ severity: 'info', summary: 'Biblioteca eliminado', detail: 'El Biblioteca ha sido eliminado.' });
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
      console.log("Modificar esto para que pida los datos por webservice al Id "+event.data.id);
      this.newItem = false;
      //this.item = this.cloneItem(event.data);

      this.ModeloBibliotecaService.getItem(event.data.id).then(item => {
          this.item = <Biblioteca>item;
      });

      this.displayDialog = true;
  }

  cloneItem(c: Biblioteca): Biblioteca {
      console.log("Quizás este método no es necesario");
      let item = new ObjetoBiblioteca();
      for (let prop in c) {
          item[prop] = c[prop];
      }
      return item;
  }

  modifyItemListado(objListado: any, objItem: any): any {
      let item = new ObjetoBiblioteca();
      for (let prop in objListado) {
          objListado[prop] = objItem[prop];
      }
      return objListado;
  }


  findSelectedItemIndex(): number {
      return this.items.indexOf(this.selectedItem);
  }

}
