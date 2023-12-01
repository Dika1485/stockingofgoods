import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
export const routes: Routes = [
  {
    path: '',
    // redirectTo: 'folder/inbox',
    redirectTo: 'goods',
    pathMatch: 'full',
  },
  // {
  //   path: 'folder/:id',
  //   loadComponent: () =>
  //     import('./folder/folder.page').then((m) => m.FolderPage),
  // },
  {
    path: 'goods',
    loadComponent: () => import('./goods/goods.page').then( m => m.GoodsPage),
    canLoad: [AuthGuard]
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  },
];
