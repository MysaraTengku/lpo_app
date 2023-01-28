import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

import { AngularFirestore } from '@angular/fire/compat/firestore';
import { serverTimestamp } from 'firebase/firestore';
import {
  ModalController,
  NavController,
  ToastController,
} from '@ionic/angular';
import { FRCSmodalPage } from '../frcsmodal/frcsmodal.page';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
})
export class FormPage implements OnInit {
  slide = 3;
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
    other_spec: '',
    ass_high_risk: '',
    brief_desc: '',
    pos_comments: '',
    // fb_sess_cond: '',
    // obs_superv: '',
    // fb_sess_date: new Date().toISOString(),
    // fb_sess_time: new Date().toISOString(),
  };

  frcs = {
    _00101: { choice: '', val: '', comments: '' },
    _00102: { choice: '', val: '', comments: '' },
    _00103: { choice: '', val: '', comments: '' },
    _00104: { choice: '', val: '', comments: '' },
    _00105: { choice: '', val: '', comments: '' },
    _00106: { choice: '', val: '', comments: '' },
    _00107: { choice: '', val: '', comments: '' },
    _00108: { choice: '', val: '', comments: '' },
    _00109: { choice: '', val: '', comments: '' },
    _00114: { choice: '', val: '', comments: '' },

    _00201: { choice: '', val: '', comments: '' },
    _00202: { choice: '', val: '', comments: '' },
    _00203: { choice: '', val: '', comments: '' },
    _00204: { choice: '', val: '', comments: '' },
    _00205: { choice: '', val: '', comments: '' },
    _00206: { choice: '', val: '', comments: '' },
    _00215: { choice: '', val: '', comments: '' },

    _00301: { choice: '', val: '', comments: '' },
    _00306: { choice: '', val: '', comments: '' },
    _00307: { choice: '', val: '', comments: '' },
    _00308: { choice: '', val: '', comments: '' },
    _00311: { choice: '', val: '', comments: '' },
    _00312: { choice: '', val: '', comments: '' },
    _00319: { choice: '', val: '', comments: '' },
    _00320: { choice: '', val: '', comments: '' },
    _00322: { choice: '', val: '', comments: '' },
    _00323: { choice: '', val: '', comments: '' },
    _00327: { choice: '', val: '', comments: '' },

    _00401: { choice: '', val: '', comments: '' },
    _00408: { choice: '', val: '', comments: '' },
    _00409: { choice: '', val: '', comments: '' },
    _00414: { choice: '', val: '', comments: '' },
    _00420: { choice: '', val: '', comments: '' },
    _00421: { choice: '', val: '', comments: '' },
    _00426: { choice: '', val: '', comments: '' },
    _00453: { choice: '', val: '', comments: '' },
    _00454: { choice: '', val: '', comments: '' },

    _00816: { choice: '', val: '', comments: '' },
    _00456: { choice: '', val: '', comments: '' },
    _01501: { choice: '', val: '', comments: '' },
    _01502: { choice: '', val: '', comments: '' },
    _01505: { choice: '', val: '', comments: '' },
    _01506: { choice: '', val: '', comments: '' },
    _01507: { choice: '', val: '', comments: '' },
    _01556: { choice: '', val: '', comments: '' },
    _01555: { choice: '', val: '', comments: '' },

    _01701: { choice: '', val: '', comments: '' },
    _01703: { choice: '', val: '', comments: '' },
    _01707: { choice: '', val: '', comments: '' },

    frcs_form: [],
  };

  soldev = {
    chkline1: '',
    factor1: '',
    solution1: '',
    personResp1: '',
    trgetCompDate1: new Date(
      new Date().getFullYear(),
      new Date().getMonth() + 1
    ).toISOString(),
    actCompDate1: new Date(
      new Date().getFullYear(),
      new Date().getMonth() + 1
    ).toISOString(),
    vvdate1: new Date(
      new Date().getFullYear(),
      new Date().getMonth() + 1
    ).toISOString(),

    chkline2: '',
    factor2: '',
    solution2: '',
    personResp2: '',
    trgetCompDate2: new Date(
      new Date().getFullYear(),
      new Date().getMonth() + 1
    ).toISOString(),
    actCompDate2: new Date(
      new Date().getFullYear(),
      new Date().getMonth() + 1
    ).toISOString(),
    vvdate2: new Date(
      new Date().getFullYear(),
      new Date().getMonth() + 1
    ).toISOString(),

    supQuaChk: '',
    supTitle_comp: '',
    supDate: '',

    vv1: '',
    vvjb1: '',
    vvcomments1: '',

    vv2: '',
    vvjb2: '',
    vvcomments2: '',
  };

  formData = {
   
    questiomable: false,  // if questionable declare true
    last_reviewed: '', // last admin reviewed the document i.e admin check
  };
  admin = false;
  constructor(
    private data: DataService,
    private firestore: AngularFirestore,
    private navCtrl: NavController,
    public modalCtrl: ModalController,
    private toast: ToastController,
    private route: ActivatedRoute, private router: Router
  ) {}

  ngOnInit( ) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.admin = this.router.getCurrentNavigation().extras.state.admin
      }
    });
  }

  logForm(task) {
    if (task === 'next') {
      this.slide += 1;
    } else if (task === 'previous') {
      this.slide -= 1;
    } else {

      this.formData.questiomable = this.frcs.frcs_form.length > 0 ? true : false;

      this.data
        .addForm({
          user: this.particulars.obs_name,
          time: serverTimestamp(),
          parts: this.particulars,
          taskObs: this.taskObs,
          frcs: this.frcs,
          soldev: this.soldev,
          formData: this.formData,
        })
        .then((e) => {
          this.presentToast();
          this.navCtrl.navigateRoot('/');
        })
        .catch((e) => {
          console.log('error occured');
        });
    }

    // run autofill if slide === 9
    if (this.slide === 9) {
      console.log('run');
      this.soldev.chkline1 =
        this.frcs.frcs_form[0] && this.frcs.frcs_form[0]._id
          ? this.frcs.frcs_form[0]._id.replace('_', '')
          : '';
      this.soldev.chkline2 =
        this.frcs.frcs_form[1] && this.frcs.frcs_form[1]._id
          ? this.frcs.frcs_form[1]._id.replace('_', '')
          : '';
      this.soldev.factor1 = this.getFact(0);
      this.soldev.solution1 = this.getSolution(0);

      this.soldev.factor2 = this.getFact(1);
      this.soldev.solution2 = this.getSolution(1);
    }
  }

  getFact(index) {
    let key = ['fact1', 'fact2', 'fact3', 'fact4', 'fact5', 'fact6', 'fact7'];
    if (this.frcs.frcs_form[index]) {
      for (let frcs in this.frcs.frcs_form[0]) {
        if (key.includes(frcs) && this.frcs.frcs_form[0][frcs].root) {
          return this.frcs.frcs_form[0][frcs].root;
        }
      }
    } else {
      return '';
    }
  }

  getSolution(index) {
    let key = ['fact1', 'fact2', 'fact3', 'fact4', 'fact5', 'fact6', 'fact7'];
    if (this.frcs.frcs_form[index]) {
      for (let frcs in this.frcs.frcs_form[0]) {
        if (key.includes(frcs) && this.frcs.frcs_form[0][frcs].root) {
          return this.frcs.frcs_form[0][frcs].solution;
        }
      }
    } else {
      return '';
    }
  }

  frcsChange(item) {
    // console.log(item)
  }

  async frcsModal(id, title) {
    const modal = await this.modalCtrl.create({
      component: FRCSmodalPage,
      componentProps: {
        _id: id,
        _title: title,
        _data: this.frcs.frcs_form.find(({ _id }) => _id == id),
      },
    });

    modal.onDidDismiss().then((modalDataResponse) => {
      const data = modalDataResponse.data;
      // if id available
      if (data.isDelete) {
        console.log('delete');
        this.frcs.frcs_form = this.frcs.frcs_form.filter(
          ({ isDelete }) => isDelete !== true
        );
      } else if (data._id && !data.done) {
        data.done = true;
        this.frcs.frcs_form.push(data);
      } else if (data._id && !data.done) {
        this.frcs.frcs_form.map((e) => {
          if (e._id === data._id) {
            e = data;
          }
        });
      }
    });

    return await modal.present();
  }
  async presentToast() {
    const toast = await this.toast.create({
      message: 'Form Submitted!',
      duration: 2000,
    });

    await toast.present();
  }
}
