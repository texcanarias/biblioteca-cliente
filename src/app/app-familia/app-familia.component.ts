import { AppBaseComponent } from '../app-base/app-base.component';

import { Component } from '@angular/core';
/*import { Proveedor } from '../service/app-proveedores/proveedor';
import { AppProveedoresService } from '../service/app-proveedores/app-proveedores.service';
import { SelectItem } from 'primeng/primeng'
import { ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';*/
import {TreeModule} from 'primeng/primeng';
import {TreeNode} from 'primeng/primeng';
import {Tree} from 'primeng/primeng';
import {TreeDragDropService} from 'primeng/primeng';

@Component({
  selector: 'app-app-familia',
  templateUrl: './app-familia.component.html',
  styleUrls: ['./app-familia.component.css']
})
export class AppFamiliaComponent extends AppBaseComponent {

  filesTree: TreeNode[];

  constructor() { 
    super();
  }

  ngOnInit() {
    super.ngOnInit();

    this.filesTree = [
      {
        data:1,
        label: 'Folder 1',
        collapsedIcon: 'fa-folder',
        expandedIcon: 'fa-folder-open',
        children: [
          {
            data:2,
            label: 'Folder 2',
            collapsedIcon: 'fa-folder',
            expandedIcon: 'fa-folder-open',
            children: [
              {
                data:3,
                droppable: false,
                label: 'File 2',
                icon: 'fa-file-o'
              }
            ]
          },
          {
            data:4,
            label: 'Folder 2',
            collapsedIcon: 'fa-folder',
            expandedIcon: 'fa-folder-open'
          },
          {
            data:5,
            droppable: false,
            label: 'File 1',
            icon: 'fa-file-o'
          }
        ]
      }
    ];    
  }

  customNodeSelect(event){
    console.log("customNodeSelect");
    console.dir(event);
  }

  customNodeUnselect(event){
    console.log("customNodeUnSelect");
    console.dir(event);
  }

  customNodeExpand(event){
    console.log("customExpand");
    console.dir(event);
  }

  customNodeCollapse(event){
    console.log("customNodeCollapse");
    console.dir(event);
  }

  customNodeContextMenuSelect(event){
    console.log("customNodeContextMenuSelect");
    console.dir(event);
  }

  customNodeDrop(event){
    console.log("customNodeDrop");
    console.dir(event);
  }


}
