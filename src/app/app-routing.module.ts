import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },  {
    path: 'form',
    loadChildren: () => import('./user/form/form.module').then( m => m.FormPageModule)
  },
  {
    path: 'downloadform',
    loadChildren: () => import('./user/downloadform/downloadform.module').then( m => m.DownloadformPageModule)
  },
  {
    path: 'list-pdf',
    loadChildren: () => import('./admin/list-pdf/list-pdf.module').then( m => m.ListPdfPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
