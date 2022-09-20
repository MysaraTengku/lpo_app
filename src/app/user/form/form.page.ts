import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

import { AngularFirestore } from '@angular/fire/compat/firestore';
import * as moment from 'moment';
import { serverTimestamp } from 'firebase/firestore';
import { ModalController, NavController } from '@ionic/angular';
import { FRCSmodalPage } from '../frcsmodal/frcsmodal.page';
import { FORMERR } from 'dns';

declare var require: any;
@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
})
export class FormPage implements OnInit {
  propSol = ['PS-Facilities-Site', 'PS-Projects'];
  envSol = ['ES-Commercial', 'ES-RAM', 'ES-Projects'];
  envCountry = [
    'US East',
    'US West / Americas South',
    'IOL Upstream',
    'IOL Downstream',
    'UK/NOR/CYP/EGY',
    'Benelux/FR/IT/GER',
    'AP North',
    'AP South',
  ];

  eps = ['GSC SSHE', 'Global S&S', 'E&PS Admin/Others'];
  task_obs = [
    'Asbestos/Lead Work',
    'Carpentry/Woodwork',
    'Ceiling Installation',
    'Cleaning/Housekeeping',
    'Construction/Installation',
    'Crane Operations/Rigging/Lifting',
    'Demolition/Removal',
    'Drilling/Workover/Workline',
    'Earthmoving/Excavation/Trenching',
    'Electrical Repair/Maintenance',
    'Energy Isolation/Control',
    'Flooring Installation',
    'Food Preparation / Handling',
    'Gauging/Sampling',
    'HVAC',
    'Inspection',
    'Loading/Unloading',
    'Masonry/Concrete/Paving',
    'Mobile Rem/Vac Event',
    'Office Work',
    'O&M (Remediation System)',
    'Painting/Coating/Insulation',
    'Plumbing/Piping',
    'Repair/Maint.-Mech-Sched/Routine',
    'Scaffolding Erecting/Dismantling',
    'Security',
    'Shipping / Receiving',
    'Subsurface Clearance',
    'Surveying',
    'Transportation-Equip/Matl/Supplies ',
    'Vegetation Control – Landscaping',
    'Wall Installation',
    'Other (Specify)',
  ];

  ass_high_risk = [
    'Working at Height',
    'Working Near Moving Equipment',
    'Lifting and Rigging',
    'Excavation',
    'Energy Isolation',
    'Hot Work',
    'Confined Space',
    'Defeat of Critical Safety Devices',
    'Does not apply',
  ];

  slide = 1;

  particulars = {
    siteName: '',
    country: '',
    classification: '',
    time: new Date().toISOString(),
    date: new Date().toISOString(),
    obs_name: '',
    obs_title: '',
    obs_comp: '',
    obe_title: '',
    obe_comp: '',
    region: '',
    respDeptDiv: '',
    envSol: '',
    envCountry: '',
    eps: '',
  };

  taskObs = {
    taskobs: [],
    ass_high_risk: '',
    brief_desc: '',
    pos_comments: '',
    fb_sess_cond: '',
    obs_superv: '',
    fb_sess_date: new Date().toISOString(),
    fb_sess_time: new Date().toISOString(),
  };

  frcs = {
    _00101: { choice: '', val: '', comments: '' },
    _00102: { choice: '', val: '', comments: '' },

    frcs_form: [],
  };

  constructor(
    private data: DataService,
    private firestore: AngularFirestore,
    private navCtrl: NavController,
    public modalCtrl: ModalController
  ) {}

  ngOnInit() {}

  logForm(task) {
    console.log(this.particulars);
    if (task === 'next') {
      this.slide += 1;
    } else if (task === 'previous') {
      this.slide -= 1;
    } else {
      console.log(this.particulars);
      this.data.addForm({user: this.particulars.obs_name, time: serverTimestamp(),
        parts: this.particulars,
        taskObs: this.taskObs,
        frcs: this.frcs
      }).then(e => {
          this.navCtrl.back();
      }).catch(e => {
        console.log("error occured")
      })
    }
  }

  frcsChange(item) {

    console.log(item)
  }



  async frcsModal(id, title) {
    const modal = await this.modalCtrl.create({
      component: FRCSmodalPage,
      componentProps: {
        '_id': id,
        '_title': title
      }
    });

    modal.onDidDismiss().then((modalDataResponse) => {
      
    });

    return await modal.present();

  }

}
