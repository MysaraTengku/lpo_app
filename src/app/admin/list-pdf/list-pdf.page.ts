import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { PDFDict, PDFDocument, TextAlignment } from 'pdf-lib';
import * as moment from 'moment';
declare var require: any;
import {
  IonInfiniteScroll,
  LoadingController,
  ToastController,
} from '@ionic/angular';
import { async } from '@angular/core/testing';

const FileSaver = require('file-saver');

@Component({
  selector: 'app-list-pdf',
  templateUrl: './list-pdf.page.html',
  styleUrls: ['./list-pdf.page.scss'],
})
export class ListPdfPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  forms_length = 0
  forms = [];
  lastVis = ""
  constructor(
    private data: DataService,
    private toastCtrl: ToastController,
    public loadingController: LoadingController
  ) {}

  ngOnInit() {
    this.data.getForms().subscribe((data) => {
      console.log(data);
      this.forms = data.forms;
      this.lastVis = data.lastVisible
      console.log(data.forms.length)
    });

    this.data.getSize().subscribe((size) => {
      this.forms_length = size
      console.log(size)
    })

    
   
  }
  loadData(event) {

    if (this.forms_length > 10) {
      this.data.getNext(this.lastVis).subscribe(next => {
        console.log(next.forms)
        this.forms = this.forms.concat(next.forms)
        this.lastVis = next.lastVisible

        console.log('Done');
        event.target.complete();
  
        if (this.forms.length === this.forms_length) {
          event.target.disabled = true;
        }
      })
    } else {
      event.target.complete();
      event.target.disabled = true;
    }

  }
  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

  async downloadForm(data) {
    try {
      let username = data.user;
      let parts = data.parts;
      let taskobs = data.taskObs;
      let frcs = data.frcs;
      this.presentLoading();

      const formurl = '../../../assets/media/LPO_TEST.pdf';

      const existingPdfBytes = await fetch(formurl).then((res) =>
        res.arrayBuffer()
      );

      const pdfDoc = await PDFDocument.load(existingPdfBytes);

      const form = pdfDoc.getForm();

      //First Section 1
      const site = form.getTextField('site');
      const city = form.getTextField('city');
      const obs_date = form.getTextField('obs_date');
      const obs_time = form.getTextField('obs_time');
      const am_chk = form.getCheckBox('AM');
      const pm_chk = form.getCheckBox('PM');
      const peer_to_peer = form.getCheckBox('peer_to_peer');
      const super_to_job = form.getCheckBox('superv_to_job');

      //section 2
      const observer_name = form.getTextField('observers_name');
      const observer_title = form.getTextField('observers_title');
      const observer_comp = form.getTextField('observers_comp');
      const observees_title = form.getTextField('oberservers_title');
      const observees_comp = form.getTextField('observees_comp');

      // region chkbox
      const africa = form.getCheckBox('Africa');
      const americas_south = form.getCheckBox('Americas South');
      const asia = form.getCheckBox('Asia');
      const canada = form.getCheckBox('Canada');
      const europe = form.getCheckBox('Europe');
      const middle_east = form.getCheckBox('Middle East');
      const united_state = form.getCheckBox('United States');

      // responsible Dept
      const resp_dept = form.getTextField('responsible_dept');

      // property solutions
      const ps_facilities = form.getCheckBox('ps_facilities');
      const ps_projects = form.getCheckBox('ps_project');

      // environmental solutions
      const es_comm = form.getCheckBox('es_commercial');
      const es_ram = form.getCheckBox('es_ram');
      const es_proj = form.getCheckBox('es_projects');

      const us_east = form.getCheckBox('us_west');
      const us_west_as = form.getCheckBox('us_west_americas_south');
      const iol_upstream = form.getCheckBox('iol_upstream');
      const iol_downstream = form.getCheckBox('iol_downstream');
      const uk_nor_ = form.getCheckBox('uk_nor_cyp_egy');
      const benelux_fr_ = form.getCheckBox('benelux_fr_it_ger');
      const ap_north = form.getCheckBox('ap_north');
      const ap_south = form.getCheckBox('ap_south');

      // E&PS
      const gsc_sshe = form.getCheckBox('gsc_sshe');
      const global_SS = form.getCheckBox('global_s&s');
      const eps_admin_others = form.getCheckBox('e&ps_admin_others');

      // task observed
      const asbestos = form.getCheckBox('AsbestosLead Work');
      const carpentry = form.getCheckBox('CarpentryWoodwork');
      const cei_install = form.getCheckBox('Ceiling Installation');
      const clean_house = form.getCheckBox('CleaningHousekeeping');
      const construction = form.getCheckBox('ConstructionInstallation');
      const crane_ops = form.getCheckBox('Crane OperationsRiggingLifting');
      const demo_rem = form.getCheckBox('DemolitionRemoval');
      const drilling = form.getCheckBox('DrillingWorkoverWorkline');
      const earth_ext = form.getCheckBox('EarthmovingExcavationTrenching');

      const elec_rep_main = form.getCheckBox('Electrical RepairMaintenance');
      const energy_iso = form.getCheckBox('Energy IsolationControl');
      const flooring_install = form.getCheckBox('Flooring Installation');
      const food_prep = form.getCheckBox('Food Preparation  Handling');
      const gaug_sampling = form.getCheckBox('GaugingSampling');
      const hvac = form.getCheckBox('HVAC');
      const inspection = form.getCheckBox('Inspection');
      const load_unload = form.getCheckBox('LoadingUnloading');
      const mason_conct = form.getCheckBox('MasonryConcretePaving');

      const mobile_rem = form.getCheckBox('Mobile RemVac Event');
      const office_work = form.getCheckBox('Office Work');
      const om_remediation = form.getCheckBox('OM Remediation System');
      const painting_coat = form.getCheckBox('PaintingCoatingInsulation');
      const plumbing = form.getCheckBox('PlumbingPiping');
      const repair_main = form.getCheckBox('RepairMaintMechSchedRoutine');
      const scaffolding_erec = form.getCheckBox(
        'Scaffolding ErectingDismantling'
      );

      const security = form.getCheckBox('Security');
      const shipping_rec = form.getCheckBox('Shipping  Receiving');
      const subsurface_clear = form.getCheckBox('Subsurface Clearance');
      const survey = form.getCheckBox('Surveying');
      const transport_eqp = form.getCheckBox('TransportationEquipMatlSupplies');
      const veg_ctrl = form.getCheckBox('Vegetation Control  Landscaping');
      const wall_intstall = form.getCheckBox('Wall Installation');
      const other_spec = form.getCheckBox('Other Specify');
      const other_spec_text = form.getTextField('other_specify_text');

      // associated high risk work (LSA)
      const work_at_height = form.getCheckBox('Working at Height');
      const work_near_move = form.getCheckBox('Working Near Moving Equipment');
      const lift_rigg = form.getCheckBox('Lifting and Rigging');
      const excavation = form.getCheckBox('Excavation');
      const ener_iso = form.getCheckBox('Energy Isolation');
      const host_work = form.getCheckBox('Hot Work');
      const conf_space = form.getCheckBox('Confined Space');
      const defeat_of_crit = form.getCheckBox(
        'Defeat of Critical Safety Devices'
      );
      const does_not_apply = form.getCheckBox('Does not apply');

      // brief description of task observed
      const brief_desc = form.getTextField('brief_description');

      // positive comments
      const positive_comments = form.getTextField('positive_comments');

      //feedback session
      const conducted_by = form.getTextField('feedback_session_conducted_by');
      const observees_super = form.getTextField('observees_supervisor');
      const session_date = form.getTextField('feedback_session_date');
      const session_time = form.getTextField('feedback_session_time');

      // solution developed by FRCS
      const chklist_1 = form.getTextField('chklist_1');
      const factor_1 = form.getTextField('factor_1');
      const solution_1 = form.getTextField('solution_1');
      const person_resp_1 = form.getTextField('person_resp_1');
      const target_1 = form.getTextField('target_1');
      const actual_1 = form.getTextField('actual_1');
      const vv_date_1 = form.getTextField('v&v_date_1');

      const chklist_2 = form.getTextField('chklist_2');
      const factor_2 = form.getTextField('factor_2');
      const solution_2 = form.getTextField('solution_2');
      const person_resp_2 = form.getTextField('person_resp_2');
      const target_2 = form.getTextField('target_2');
      const actual_2 = form.getTextField('actual_2');
      const vv_date_2 = form.getTextField('v&v_date_2');

      const super_qual_chk = form.getTextField('supervisor_qual_chk');
      const title_comp = form.getTextField('title_company');
      const date = form.getTextField('10_date');

      // v&v comments
      const c_vv_date_1 = form.getTextField('v&v_1');
      const job_title_1 = form.getTextField('job_title_1');
      const comments_1 = form.getTextField('comments_1');
      const c_vv_date_2 = form.getTextField('v&v_2');
      const job_title_2 = form.getTextField('job_title_2');
      const comments_2 = form.getTextField('comments_2');

      //personal protective equipment
      const ppe_1c = form.getTextField('00101_c');
      const ppe_1q = form.getTextField('00101_q');
      const ppe_1comm = form.getTextField('00101_comments');

      //--------------------------- Set name/chkbox ------------------------//

      // 1 ROW
      site.setText(parts.siteName);
      city.setText(parts.country);
      obs_date.setText(moment(parts.date).format('DD/MM/YYYY'));
      obs_time.setText(moment(parts.time).format('HH:mm'));

      const time = parseInt(moment(parts.time).format('HH'));

      time < 12 ? am_chk.check() : pm_chk.check(); // check AM/PM
      parts.classification == 'peer'
        ? peer_to_peer.check()
        : super_to_job.check(); // peer / superv_to_job

      // 2 ROW
      observer_name.setText(parts.obs_name);
      observer_title.setText(parts.obs_title);
      observer_comp.setText(parts.obs_comp);
      observees_title.setText(parts.obe_title);
      observees_comp.setText(parts.obe_comp);

      // 3 ROW
      if (parts.region === 'africa') {
        africa.check();
      }
      if (parts.region === 'americasSouth') {
        americas_south.check();
      }
      if (parts.region === 'asia') {
        asia.check();
      }
      if (parts.region === 'canada') {
        canada.check();
      }
      if (parts.region === 'europe') {
        europe.check();
      }
      if (parts.region === 'middleEast') {
        middle_east.check();
      }
      if (parts.region === 'unitedStated') {
        united_state.check();
      }

      resp_dept.setText(parts.respDeptDiv);
      if (parts.propSol === 'PS-Facilities-Site') {
        ps_facilities.check();
      }
      if (parts.propSol === 'PS-Projects') {
        ps_projects.check();
      }

      if (parts.envSol === 'ES-Commercial') {
        es_comm.check();
      }
      if (parts.envSol === 'ES-RAM') {
        es_ram.check();
      }
      if (parts.envSol === 'ES-Projects') {
        es_proj.check();
      }

      if (parts.envCountry.includes('US East')) {
        us_east.check();
      }
      if (parts.envCountry.includes('US West / Americas South')) {
        us_west_as.check();
      }
      if (parts.envCountry.includes('IOL Upstream')) {
        iol_upstream.check();
      }
      if (parts.envCountry.includes('IOL Downstream')) {
        iol_downstream.check();
      }
      if (parts.envCountry.includes('UK/NOR/CYP/EGY')) {
        uk_nor_.check();
      }
      if (parts.envCountry.includes('Benelux/FR/IT/GER')) {
        benelux_fr_.check();
      }
      if (parts.envCountry.includes('AP North')) {
        ap_north.check();
      }
      if (parts.envCountry.includes('AP South')) {
        ap_south.check();
      }

      if (parts.eps === 'GSC SSHE') {
        gsc_sshe.check();
      }
      if (parts.eps === 'Global S&S') {
        global_SS.check();
      }
      if (parts.eps === 'E&PS Admin/Others') {
        eps_admin_others.check();
      }

      if (taskobs.taskobs.includes('Asbestos/Lead Work')) {
        asbestos.check();
      }
      if (taskobs.taskobs.includes('Carpentry/Woodwork')) {
        carpentry.check();
      }
      if (taskobs.taskobs.includes('Ceiling Installation')) {
        cei_install.check();
      }
      if (taskobs.taskobs.includes('Cleaning/Housekeeping')) {
        clean_house.check();
      }
      if (taskobs.taskobs.includes('Construction/Installation')) {
        construction.check();
      }
      if (taskobs.taskobs.includes('Crane Operations/Rigging/Lifting')) {
        crane_ops.check();
      }
      if (taskobs.taskobs.includes('Demolition/Removal')) {
        demo_rem.check();
      }
      if (taskobs.taskobs.includes('Drilling/Workover/Workline')) {
        drilling.check();
      }
      if (taskobs.taskobs.includes('Earthmoving/Excavation/Trenching')) {
        earth_ext.check();
      }
      if (taskobs.taskobs.includes('Electrical Repair/Maintenance')) {
        elec_rep_main.check();
      }
      if (taskobs.taskobs.includes('Energy Isolation/Control')) {
        energy_iso.check();
      }
      if (taskobs.taskobs.includes('Flooring Installation')) {
        flooring_install.check();
      }
      if (taskobs.taskobs.includes('Food Preparation / Handling')) {
        food_prep.check();
      }
      if (taskobs.taskobs.includes('Gauging/Sampling')) {
        gaug_sampling.check();
      }
      if (taskobs.taskobs.includes('HVAC')) {
        hvac.check();
      }
      if (taskobs.taskobs.includes('Inspection')) {
        inspection.check();
      }
      if (taskobs.taskobs.includes('Loading/Unloading')) {
        load_unload.check();
      }
      if (taskobs.taskobs.includes('Masonry/Concrete/Paving')) {
        mason_conct.check();
      }
      if (taskobs.taskobs.includes('Mobile Rem/Vac Event')) {
        mobile_rem.check();
      }
      if (taskobs.taskobs.includes('Office Work')) {
        office_work.check();
      }
      if (taskobs.taskobs.includes('O&M (Remediation System)')) {
        om_remediation.check();
      }
      if (taskobs.taskobs.includes('Painting/Coating/Insulation')) {
        painting_coat.check();
      }
      if (taskobs.taskobs.includes('Plumbing/Piping')) {
        plumbing.check();
      }
      if (taskobs.taskobs.includes('Repair/Maint.-Mech-Sched/Routine')) {
        repair_main.check();
      }
      if (taskobs.taskobs.includes('Scaffolding Erecting/Dismantling')) {
        scaffolding_erec.check();
      }
      if (taskobs.taskobs.includes('Security')) {
        security.check();
      }
      if (taskobs.taskobs.includes('Shipping / Receiving')) {
        shipping_rec.check();
      }
      if (taskobs.taskobs.includes('Subsurface Clearance')) {
        subsurface_clear.check();
      }
      if (taskobs.taskobs.includes('Surveying')) {
        survey.check();
      }
      if (taskobs.taskobs.includes('Transportation-Equip/Matl/Supplies')) {
        transport_eqp.check();
      }
      if (taskobs.taskobs.includes('Vegetation Control – Landscaping')) {
        veg_ctrl.check();
      }
      if (taskobs.taskobs.includes('Wall Installation')) {
        wall_intstall.check();
      }
      if (taskobs.taskobs.includes('Other (Specify)')) {
        other_spec.check();
      }
      other_spec_text.setText(taskobs.other_spec);

      if (taskobs.ass_high_risk === 'Working at Height') {
        work_at_height.check();
      }
      if (taskobs.ass_high_risk === 'Working Near Moving Equipment') {
        work_near_move.check();
      }
      if (taskobs.ass_high_risk === 'Lifting and Rigging') {
        lift_rigg.check();
      }
      if (taskobs.ass_high_risk === 'Excavation') {
        excavation.check();
      }
      if (taskobs.ass_high_risk === 'Energy Isolation') {
        ener_iso.check();
      }
      if (taskobs.ass_high_risk === 'Hot Work') {
        host_work.check();
      }
      if (taskobs.ass_high_risk === 'Confined Space') {
        conf_space.check();
      }
      if (taskobs.ass_high_risk === 'Defeat of Critical Safety Devices') {
        defeat_of_crit.check();
      }
      if (taskobs.ass_high_risk === 'Does not apply') {
        does_not_apply.check();
      }

      brief_desc.setText(taskobs.brief_desc);
      positive_comments.setText(taskobs.pos_comments);
      conducted_by.setText(taskobs.fb_sess_cond);
      observees_super.setText(taskobs.obs_superv);
      session_date.setText(moment(taskobs.fb_sess_date).format('DD/MM/YYYY'));

      const pm_am = time < 12 ? ' AM' : ' PM';
      session_time.setText(
        moment(taskobs.fb_sess_time).format('HH:mm') + pm_am
      );

      // FRCS form
      const frcs_form = '../../../assets/media/FRCS_FORM.pdf';
      const load_frcs = await fetch(frcs_form).then((res) => res.arrayBuffer());

      const frcs_data = frcs.frcs_form;
      for (let i = 0; i < frcs_data.length; i++) {
        const d = frcs_data[i];

        console.log(d);

        const frcs_f = await PDFDocument.load(load_frcs);
        const form = frcs_f.getForm();

        const title = form.getTextField('Text201');

        const fact1 = form.getTextField('Text202');
        const sol1 = form.getTextField('Text206');
        const fact2 = form.getTextField('Text203');
        const sol2 = form.getTextField('Text207');
        const fact3 = form.getTextField('Text204');
        const sol3 = form.getTextField('Text208');
        const fact4 = form.getTextField('Text205');
        const sol4 = form.getTextField('Text209');
        const fact5n = form.getTextField('Text210');
        const sol5n = form.getTextField('Text214');
        const fact5y = form.getTextField('Text211');
        const sol5y = form.getTextField('Text215');
        const fact6 = form.getTextField('Text212');
        const sol6 = form.getTextField('Text216');
        const fact7 = form.getTextField('Text213');
        const sol7 = form.getTextField('Text217');

        // --------- Set Data -----------//
        title.setText(d._title);
        fact1.setText(d.fact1.root);
        sol1.setText(d.fact1.solution);

        fact2.setText(d.fact2.root);
        sol2.setText(d.fact2.solution);

        fact3.setText(d.fact3.root);
        sol3.setText(d.fact3.solution);

        fact4.setText(d.fact4.root);
        sol4.setText(d.fact4.solution);

        if (d.fact5.choice && d.fact5.choice === 'yes') {
          fact5y.setText(d.fact5.root);
          sol5y.setText(d.fact5.solution);
        }
        if (d.fact5.choice && d.fact5.choice === 'no') {
          fact5n.setText(d.fact5.root);
          sol5n.setText(d.fact5.solution);
        }
        fact6.setText(d.fact6.root);
        sol6.setText(d.fact6.solution);

        fact7.setText(d.fact7.root);
        sol7.setText(d.fact7.solution);

        const newpageBytes = await frcs_f.save();

        const newpage = await PDFDocument.load(newpageBytes);

        const [page1] = await pdfDoc.copyPages(newpage, [0]);
        const [page2] = await pdfDoc.copyPages(newpage, [1]);

        pdfDoc.addPage(page1);
        pdfDoc.addPage(page2);
      }

      const pdfBytes = await pdfDoc.save();

      const pdfName = `${username}_LPO Non-compliance`; // pdf file name

      var blob = new Blob([pdfBytes], { type: 'application/pdf' }); // prepare file

      FileSaver.saveAs(blob, pdfName); //download file
      this.loadingController.dismiss();
    } catch (e) {
      console.log(e);
      this.presentToast();
      this.loadingController.dismiss();
    }
  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Preparing...',
    });
    await loading.present();
  }

  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: 'Error occured please contact developer',
      duration: 2000,
    });
    toast.present();
  }
}
