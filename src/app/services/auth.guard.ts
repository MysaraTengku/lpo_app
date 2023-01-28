import { Injectable } from '@angular/core';
import { async } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Route,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  state = false;
  constructor(
    // private auth: DataService,
    private auth: DataService,
    private alertController: AlertController  ) {}

  canActivate() {

   
    // console.log(this.auth.isLoggedIn())
    // this.presentPass()
    return true;
  }


  // async presentPass() {
  //   const alert = await this.alertController.create({
  //     header: 'Enter Password',
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         role: 'cancel',
  //         handler: () => {
  //           console.log('Cancel clicked');
  //         },
  //       },
  //       {
  //         text: 'Submit',
  //         handler: (data) => {
  //           console.log(data);
  //           this.auth.getFormPage(data.password).subscribe(e => {
  //             if (e && e.user) {
  //               this.state = true
  //               this.canActivate()
  //               console.log(e)
  //             }
  //           })
  //         },
  //       },
  //     ],
  //     inputs: [
  //       {
  //         name: 'password',
  //         type: 'password',
  //         placeholder: 'Password',
  //       },
  //     ],
  //   });

  //   await alert.present();
  // }
}
