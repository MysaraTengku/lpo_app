import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'form',
    loadChildren: () => import('./user/form/form.module').then( m => m.FormPageModule)
  },
  {
    path: 'list-pdf',
    loadChildren: () => import('./admin/list-pdf/list-pdf.module').then( m => m.ListPdfPageModule)
  },
  {
    path: 'frcsmodal',
    loadChildren: () => import('./user/frcsmodal/frcsmodal.module').then( m => m.FRCSmodalPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
