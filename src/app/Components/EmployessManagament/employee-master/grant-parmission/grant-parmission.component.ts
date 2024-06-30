import { updateMenuItem } from './../../../../Store/SidebarAction/sidebar.action';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MenuItem } from '../../../../Shared/Models/Menu-item.model';
import { Store } from '@ngrx/store';
import { getMenuItemById } from '../../../../Store/SidebarAction/sidebar.action';
import {
  selectLoading,
  selectSelectedMenuItem,
} from '../../../../Store/SidebarAction/sidebar.selectors';
import { CryptoService } from '../../../../helperService/CryptoService/crypto.service';

export function customDecode(inputStirng : string){
    return inputStirng.replace('_','+').replace('_','/').padEnd(4,'=')
}

@Component({
  selector: 'app-grant-parmission',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './grant-parmission.component.html',
  styleUrl: './grant-parmission.component.css',
})
export class GrantParmissionComponent implements OnInit {
  loading$: boolean = false;
  menuItems: MenuItem[] = []; // Declared the menuItems property
  userGroupID: number | undefined;
  activateId =  this._activateroute.snapshot.paramMap.get('userGroupID');


  constructor(private _store: Store,
    private _activateroute: ActivatedRoute,
    private $cryptDataService: CryptoService,
  ) {}

  ngOnInit(): void {
    console.log(this.activateId);

    this._activateroute.queryParams.subscribe(params => {
      const encryptedUserGroupID = params['userGroupID'];
      const userGroupID = this.$cryptDataService.decryptData(encryptedUserGroupID);
      this.activateId = userGroupID
    });


    if (this.activateId !== null) {
      this._store.dispatch(getMenuItemById({ UserGroupID: Number(this.activateId) }));
    }

    this._store.select(selectLoading).subscribe((loading) => {
      this.loading$ = loading;
    });

    this._store.select(selectSelectedMenuItem).subscribe((items) => {
      if (Array.isArray(items)) {
        this.menuItems = items;
      } else {
        this.menuItems = []; // Wrap single item in an array
      }
    });
  }


  toggleItem(item: MenuItem) {
    const mutableItem: MenuItem = { ...item };
    mutableItem.IsAccess = !mutableItem.IsAccess;
    const menuItem: Partial<MenuItem> = {
      UserGroupID: this.userGroupID || 0,
      ModuleID: mutableItem.ModuleID,
      IsAccess: mutableItem.IsAccess,
    };
    this._store.dispatch(updateMenuItem({ menuItem }));
  }


}
