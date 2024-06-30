// src/app/shared/menu-items.ts

// Filename: Menu-item.model.ts

export interface MenuItem {
  UserGroupID:number;
  ModuleID: number;
  PageName: string;
  IsActive: boolean;
  IsAccess: boolean;
  IsForApproval: boolean;
  Default: string;
  subItems?: MenuItem[];
}


// export const menuItems: MenuItem[] = [
//   {
//     name: 'Dashboard',
//     active: true,
//     icon: 'icon-home'
//   },
//   {
//     name: 'Commission',
//     active: true,
//     icon: 'icon-diamond',
//     subItems: [
//       {
//         name: 'Commission Setup',
//         active: true,
//         icon: ''
//       },
//       {
//         name: 'subitem 1',
//         active: true,
//         icon: ''
//       }
//     ]
//   },
//   {
//     name: 'Employee Management',
//     active: true,
//     icon: 'icon-profile-circle',
//     subItems: [
//       {
//         name: 'Employee',
//         active: true,
//         icon: ''
//       },
//       {
//         name: 'Employee Group',
//         active: true,
//         icon: ''
//       }
//     ]
//   }
// ];
