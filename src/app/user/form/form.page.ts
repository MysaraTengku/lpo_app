import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

import { AngularFirestore } from '@angular/fire/compat/firestore';
import * as moment from 'moment';
import {serverTimestamp } from 'firebase/firestore';
import { NavController } from '@ionic/angular';

declare var require: any;
@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
})
export class FormPage implements OnInit {

  formitem = {
    siteName: '',
    country: '',
    classification: '',
    time: '',
    date: '',
    obs_name:'',
    obs_title:'',
    obs_comp:'',
    obe_title:'',
    obe_comp:'',
  }

  constructor(private data: DataService, private firestore: AngularFirestore,
    private navCtrl: NavController
    ) {
    
   }

  ngOnInit() {
    // const date = new Date("2022-09-14T01:07:00+08:00")
    const date = moment("2022-09-14T01:07:00+08:00").format("DD/MM/YYYY")
    const time = moment("2022-09-14T01:07:00+08:00").format("HH:mm")
    console.log(date)
    console.log(time)
  }

  logForm() {
    console.log(this.formitem)
    this.data.addForm({user: this.formitem.obs_name, time: serverTimestamp(), 
      form: this.formitem}).then(e => {

        this.navCtrl.back();


    }).catch(e => {
      console.log("error occured")
    })
  }


  

}


