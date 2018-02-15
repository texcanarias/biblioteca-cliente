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
        label: 'Folder 1',
        collapsedIcon: 'fa-folder',
        expandedIcon: 'fa-folder-open',
        children: [
          {
            label: 'Folder 2',
            collapsedIcon: 'fa-folder',
            expandedIcon: 'fa-folder-open',
            children: [
              {
                label: 'File 2',
                icon: 'fa-file-o'
              }
            ]
          },
          {
            label: 'Folder 2',
            collapsedIcon: 'fa-folder',
            expandedIcon: 'fa-folder-open'
          },
          {
            label: 'File 1',
            icon: 'fa-file-o'
          }
        ]
      }
    ];    
  }

}
