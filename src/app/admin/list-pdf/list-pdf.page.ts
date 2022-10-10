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
      let soldev = data.soldev

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
      const c_vv_1 = form.getTextField('v&v_1');
      const c_job_title_1 = form.getTextField('job_title_1');
      const c_comments_1 = form.getTextField('comments_1');
      const c_vv_2 = form.getTextField('v&v_2');
      const c_job_title_2 = form.getTextField('job_title_2');
      const c_comments_2 = form.getTextField('comments_2');

      //personal protective equipment
      const ppe_1c = form.getTextField('00101_c');
      const ppe_1q = form.getTextField('00101_q');
      const ppe_1comm = form.getTextField('00101_comments');

      const ppe_2c = form.getTextField('00102_c');
      const ppe_2q = form.getTextField('00102_q');
      const ppe_2comm = form.getTextField('00102_comments');

      const ppe_3c = form.getTextField('00103_c');
      const ppe_3q = form.getTextField('00103_q');
      const ppe_3comm = form.getTextField('00103_comments');

      const ppe_4c = form.getTextField('00104_c');
      const ppe_4q = form.getTextField('00104_q');
      const ppe_4comm = form.getTextField('00104_comments');

      const ppe_5c = form.getTextField('00105_c');
      const ppe_5q = form.getTextField('00105_q');
      const ppe_5comm = form.getTextField('00105_comments');

      const ppe_6c = form.getTextField('00106_c');
      const ppe_6q = form.getTextField('00106_q');
      const ppe_6comm = form.getTextField('00106_comments');

      const ppe_7c = form.getTextField('00107_c');
      const ppe_7q = form.getTextField('00107_q');
      const ppe_7comm = form.getTextField('00107_comments');

      const ppe_8c = form.getTextField('00108_c');
      const ppe_8q = form.getTextField('00108_q');
      const ppe_8comm = form.getTextField('00108_comments');

      const ppe_9c = form.getTextField('00114_c');
      const ppe_9q = form.getTextField('00114_q');
      const ppe_9comm = form.getTextField('00114_comments');

      // body use & positioning

      const ppe_10c = form.getTextField('00201_c');
      const ppe_10q = form.getTextField('00201_q');
      const ppe_10comm = form.getTextField('00201_comments');
      
      const ppe_11c = form.getTextField('00202_c');
      const ppe_11q = form.getTextField('00202_q');
      const ppe_11comm = form.getTextField('00202_comments');
      
      const ppe_12c = form.getTextField('00203_c');
      const ppe_12q = form.getTextField('00203_q');
      const ppe_12comm = form.getTextField('00203_comments');

      const ppe_13c = form.getTextField('00204_c');
      const ppe_13q = form.getTextField('00204_q');
      const ppe_13comm = form.getTextField('00204_comments');

      const ppe_14c = form.getTextField('00205_c');
      const ppe_14q = form.getTextField('00205_q');
      const ppe_14comm = form.getTextField('00205_comments');

      const ppe_15c = form.getTextField('00206_c');
      const ppe_15q = form.getTextField('00206_q');
      const ppe_15comm = form.getTextField('00206_comments');

      const ppe_16c = form.getTextField('00215_c');
      const ppe_16q = form.getTextField('00215_q');
      const ppe_16comm = form.getTextField('00215_comments');

      
      // work environment

      const ppe_17c = form.getTextField('00301_c');
      const ppe_17q = form.getTextField('00301_q');
      const ppe_17comm = form.getTextField('00301_comments');

      const ppe_18c = form.getTextField('00306_c');
      const ppe_18q = form.getTextField('00306_q');
      const ppe_18comm = form.getTextField('00306_comments');

      const ppe_19c = form.getTextField('00307_c');
      const ppe_19q = form.getTextField('00307_q');
      const ppe_19comm = form.getTextField('00307_comments');

      const ppe_20c = form.getTextField('00308_c');
      const ppe_20q = form.getTextField('00308_q');
      const ppe_20comm = form.getTextField('00308_comments');

      const ppe_21c = form.getTextField('00311_c');
      const ppe_21q = form.getTextField('00311_q');
      const ppe_21comm = form.getTextField('00311_comments');

      const ppe_22c = form.getTextField('00312_c');
      const ppe_22q = form.getTextField('00312_q');
      const ppe_22comm = form.getTextField('00312_comments');

      const ppe_23c = form.getTextField('00319_c');
      const ppe_23q = form.getTextField('00319_q');
      const ppe_23comm = form.getTextField('00319_comments');

      const ppe_24c = form.getTextField('00320_c');
      const ppe_24q = form.getTextField('00320_q');
      const ppe_24comm = form.getTextField('00320_comments');

      const ppe_25c = form.getTextField('00322_c');
      const ppe_25q = form.getTextField('00322_q');
      const ppe_25comm = form.getTextField('00322_comments');

      const ppe_26c = form.getTextField('00323_c');
      const ppe_26q = form.getTextField('00323_q');
      const ppe_26comm = form.getTextField('00323_comments');

      const ppe_27c = form.getTextField('00327_c');
      const ppe_27q = form.getTextField('00327_q');
      const ppe_27comm = form.getTextField('00327_comments');

      // operating proceduers-general

      const ppe_28c = form.getTextField('00401_c');
      const ppe_28q = form.getTextField('00401_q');
      const ppe_28comm = form.getTextField('00401_comments');

      const ppe_29c = form.getTextField('00408_c');
      const ppe_29q = form.getTextField('00408_q');
      const ppe_29comm = form.getTextField('00408_comments');

      const ppe_30c = form.getTextField('00409_c');
      const ppe_30q = form.getTextField('00409_q');
      const ppe_30comm = form.getTextField('00409_comments');

      const ppe_31c = form.getTextField('00414_c');
      const ppe_31q = form.getTextField('00414_q');
      const ppe_31comm = form.getTextField('00414_comments');

      const ppe_32c = form.getTextField('00420_c');
      const ppe_32q = form.getTextField('00420_q');
      const ppe_32comm = form.getTextField('00420_comments');

      const ppe_33c = form.getTextField('00421_c');
      const ppe_33q = form.getTextField('00421_q');
      const ppe_33comm = form.getTextField('00421_comments');

      const ppe_34c = form.getTextField('00426_c');
      const ppe_34q = form.getTextField('00426_q');
      const ppe_34comm = form.getTextField('00426_comments');

      const ppe_35c = form.getTextField('00453_c');
      const ppe_35q = form.getTextField('00453_q');
      const ppe_35comm = form.getTextField('00453_comments');

      const ppe_36c = form.getTextField('00454_c');
      const ppe_36q = form.getTextField('00454_q');
      const ppe_36comm = form.getTextField('00454_comments');

      const ppe_37c = form.getTextField('00816_c');
      const ppe_37q = form.getTextField('00816_q');
      const ppe_37comm = form.getTextField('00816_comments');

      const ppe_38c = form.getTextField('00456_c');
      const ppe_38q = form.getTextField('00456_q');
      const ppe_38comm = form.getTextField('00456_comments');

      // tools equipment

      const ppe_39c = form.getTextField('01501_c');
      const ppe_39q = form.getTextField('01501_q');
      const ppe_39comm = form.getTextField('01501_comments');

      const ppe_40c = form.getTextField('01502_c');
      const ppe_40q = form.getTextField('01502_q');
      const ppe_40comm = form.getTextField('01502_comments');

      const ppe_41c = form.getTextField('01505_c');
      const ppe_41q = form.getTextField('01505_q');
      const ppe_41comm = form.getTextField('01505_comments');

      const ppe_42c = form.getTextField('01506_c');
      const ppe_42q = form.getTextField('01506_q');
      const ppe_42comm = form.getTextField('01506_comments');

      const ppe_43c = form.getTextField('01507_c');
      const ppe_43q = form.getTextField('01507_q');
      const ppe_43comm = form.getTextField('01507_comments');

      const ppe_44c = form.getTextField('01556_c');
      const ppe_44q = form.getTextField('01556_q');
      const ppe_44comm = form.getTextField('01556_comments');

      const ppe_45c = form.getTextField('01555_c');
      const ppe_45q = form.getTextField('01555_q');
      const ppe_45comm = form.getTextField('01555_comments');

      // environmental procedures

      const ppe_46c = form.getTextField('01701_c');
      const ppe_46q = form.getTextField('01701_q');
      const ppe_46comm = form.getTextField('01701_comments');

      const ppe_47c = form.getTextField('01703_c');
      const ppe_47q = form.getTextField('01703_q');
      const ppe_47comm = form.getTextField('01703_comments');

      const ppe_48c = form.getTextField('01707_c');
      const ppe_48q = form.getTextField('01707_q');
      const ppe_48comm = form.getTextField('01707_comments');

      const c_total = form.getTextField('c_total')
      const q_total = form.getTextField('q_total')
      const t_correct = form.getTextField('total_correct')

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

      chklist_1.setText(soldev.chkline1)
      factor_1.setText(soldev.factor1)
      solution_1.setText(soldev.solution1)
      person_resp_1.setText(soldev.personResp1)
      target_1.setText(soldev.trgetCompDate1 ? moment(soldev.trgetCompDate1).format('DD/MM/YYYY') : "")
      actual_1.setText(soldev.actCompDate1 ? moment(soldev.actCompDate1).format('DD/MM/YYYY') : "" )
      vv_date_1.setText(soldev.vvdate1 ? moment(soldev.vvdate1).format('DD/MM/YYYY') : "" )

      chklist_2.setText(soldev.chkline2)
      factor_2.setText(soldev.factor2)
      solution_2.setText(soldev.solution2)
      person_resp_2.setText(soldev.personResp2)
      target_2.setText(soldev.trgetCompDate2 ? moment(soldev.trgetCompDate2).format('DD/MM/YYYY') : "")
      actual_2.setText(soldev.actCompDate2 ? moment(soldev.actCompDate2).format('DD/MM/YYYY') : "")
      vv_date_2.setText(soldev.vvdate2 ? moment(soldev.vvdate2).format('DD/MM/YYYY') : "")

      
      super_qual_chk.setText(soldev.supQuaChk)
      title_comp.setText(soldev.supTitle_comp)
      date.setText(soldev.supDate ? moment(soldev.supDate).format('DD/MM/YYYY') : "")
      
      c_vv_1.setText(soldev.vv1)
      c_job_title_1.setText(soldev.vvjb1)
      c_comments_1.setText(soldev.vvcomments1)
      c_vv_2.setText(soldev.vv2)
      c_job_title_2.setText(soldev.vvjb2)
      c_comments_2.setText(soldev.vvcomments2)


      //number of times form

      ppe_1c.setText(frcs._00101.choice == "correct" ? frcs._00101.val.toString() : "")
      ppe_1q.setText(frcs._00101.choice == "questionable" ? frcs._00101.val.toString() : "")
      ppe_1comm.setText(frcs._00101.choice == "questionable" ? frcs._00101.comments : "")

      ppe_2c.setText(frcs._00102.choice == "correct" ? frcs._00102.val.toString() : "")
      ppe_2q.setText(frcs._00102.choice == "questionable" ? frcs._00102.val.toString() : "")
      ppe_2comm.setText(frcs._00102.choice == "questionable" ? frcs._00102.comments : "")

      ppe_3c.setText(frcs._00103.choice == "correct" ? frcs._00103.val.toString() : "")
      ppe_3q.setText(frcs._00103.choice == "questionable" ? frcs._00103.val.toString() : "")
      ppe_3comm.setText(frcs._00103.choice == "questionable" ? frcs._00103.comments : "")

      ppe_4c.setText(frcs._00104.choice == "correct" ? frcs._00104.val.toString() : "")
      ppe_4q.setText(frcs._00104.choice == "questionable" ? frcs._00104.val.toString() : "")
      ppe_4comm.setText(frcs._00104.choice == "questionable" ? frcs._00104.comments : "")

      ppe_5c.setText(frcs._00105.choice == "correct" ? frcs._00105.val.toString() : "")
      ppe_5q.setText(frcs._00105.choice == "questionable" ? frcs._00105.val.toString() : "")
      ppe_5comm.setText(frcs._00105.choice == "questionable" ? frcs._00105.comments : "")

      ppe_6c.setText(frcs._00106.choice == "correct" ? frcs._00106.val.toString() : "")
      ppe_6q.setText(frcs._00106.choice == "questionable" ? frcs._00106.val.toString() : "")
      ppe_6comm.setText(frcs._00106.choice == "questionable" ? frcs._00106.comments : "")

      ppe_7c.setText(frcs._00107.choice == "correct" ? frcs._00107.val.toString() : "")
      ppe_7q.setText(frcs._00107.choice == "questionable" ? frcs._00107.val.toString() : "")
      ppe_7comm.setText(frcs._00107.choice == "questionable" ? frcs._00107.comments : "")

      ppe_8c.setText(frcs._00108.choice == "correct" ? frcs._00108.val.toString() : "")
      ppe_8q.setText(frcs._00108.choice == "questionable" ? frcs._00108.val.toString() : "")
      ppe_8comm.setText(frcs._00108.choice == "questionable" ? frcs._00108.comments : "")

      ppe_9c.setText(frcs._00114.choice == "correct" ? frcs._00114.val.toString() : "")
      ppe_9q.setText(frcs._00114.choice == "questionable" ? frcs._00114.val.toString() : "")
      ppe_9comm.setText(frcs._00114.choice == "questionable" ? frcs._00114.comments : "")



      ppe_10c.setText(frcs._00201.choice == "correct" ? frcs._00201.val.toString() : "")
      ppe_10q.setText(frcs._00201.choice == "questionable" ? frcs._00201.val.toString() : "")
      ppe_10comm.setText(frcs._00201.choice == "questionable" ? frcs._00201.comments : "")

      ppe_11c.setText(frcs._00202.choice == "correct" ? frcs._00202.val.toString() : "")
      ppe_11q.setText(frcs._00202.choice == "questionable" ? frcs._00202.val.toString() : "")
      ppe_11comm.setText(frcs._00202.choice == "questionable" ? frcs._00202.comments : "")

      ppe_12c.setText(frcs._00203.choice == "correct" ? frcs._00203.val.toString() : "")
      ppe_12q.setText(frcs._00203.choice == "questionable" ? frcs._00203.val.toString().toString() : "")
      ppe_12comm.setText(frcs._00203.choice == "questionable" ? frcs._00203.comments : "")

      ppe_13c.setText(frcs._00204.choice == "correct" ? frcs._00204.val.toString() : "")
      ppe_13q.setText(frcs._00204.choice == "questionable" ? frcs._00204.val.toString() : "")
      ppe_13comm.setText(frcs._00204.choice == "questionable" ? frcs._00204.comments : "")

      ppe_14c.setText(frcs._00205.choice == "correct" ? frcs._00205.val.toString() : "")
      ppe_14q.setText(frcs._00205.choice == "questionable" ? frcs._00205.val.toString() : "")
      ppe_14comm.setText(frcs._00205.choice == "questionable" ? frcs._00205.comments : "")

      ppe_15c.setText(frcs._00206.choice == "correct" ? frcs._00206.val.toString() : "")
      ppe_15q.setText(frcs._00206.choice == "questionable" ? frcs._00206.val.toString() : "")
      ppe_15comm.setText(frcs._00206.choice == "questionable" ? frcs._00206.comments : "")

      ppe_16c.setText(frcs._00215.choice == "correct" ? frcs._00215.val.toString() : "")
      ppe_16q.setText(frcs._00215.choice == "questionable" ? frcs._00215.val.toString() : "")
      ppe_16comm.setText(frcs._00215.choice == "questionable" ? frcs._00215.comments : "")



      ppe_17c.setText(frcs._00301.choice == "correct" ? frcs._00301.val.toString() : "")
      ppe_17q.setText(frcs._00301.choice == "questionable" ? frcs._00301.val.toString() : "")
      ppe_17comm.setText(frcs._00301.choice == "questionable" ? frcs._00301.comments : "")

      ppe_18c.setText(frcs._00306.choice == "correct" ? frcs._00306.val.toString() : "")
      ppe_18q.setText(frcs._00306.choice == "questionable" ? frcs._00306.val.toString() : "")
      ppe_18comm.setText(frcs._00306.choice == "questionable" ? frcs._00306.comments : "")

      ppe_19c.setText(frcs._00307.choice == "correct" ? frcs._00307.val.toString() : "")
      ppe_19q.setText(frcs._00307.choice == "questionable" ? frcs._00307.val.toString() : "")
      ppe_19comm.setText(frcs._00307.choice == "questionable" ? frcs._00307.comments : "")

      ppe_20c.setText(frcs._00308.choice == "correct" ? frcs._00308.val.toString() : "")
      ppe_20q.setText(frcs._00308.choice == "questionable" ? frcs._00308.val.toString() : "")
      ppe_20comm.setText(frcs._00308.choice == "questionable" ? frcs._00308.comments : "")

      ppe_21c.setText(frcs._00311.choice == "correct" ? frcs._00311.val.toString() : "")
      ppe_21q.setText(frcs._00311.choice == "questionable" ? frcs._00311.val.toString() : "")
      ppe_21comm.setText(frcs._00311.choice == "questionable" ? frcs._00311.comments : "")

      ppe_22c.setText(frcs._00312.choice == "correct" ? frcs._00312.val.toString() : "")
      ppe_22q.setText(frcs._00312.choice == "questionable" ? frcs._00312.val.toString() : "")
      ppe_22comm.setText(frcs._00312.choice == "questionable" ? frcs._00312.comments : "")

      ppe_23c.setText(frcs._00319.choice == "correct" ? frcs._00319.val.toString().toString() : "")
      ppe_23q.setText(frcs._00319.choice == "questionable" ? frcs._00319.val.toString() : "")
      ppe_23comm.setText(frcs._00319.choice == "questionable" ? frcs._00319.comments : "")

      ppe_24c.setText(frcs._00320.choice == "correct" ? frcs._00320.val.toString() : "")
      ppe_24q.setText(frcs._00320.choice == "questionable" ? frcs._00320.val.toString() : "")
      ppe_24comm.setText(frcs._00320.choice == "questionable" ? frcs._00320.comments : "")

      ppe_25c.setText(frcs._00322.choice == "correct" ? frcs._00322.val.toString() : "")
      ppe_25q.setText(frcs._00322.choice == "questionable" ? frcs._00322.val.toString() : "")
      ppe_25comm.setText(frcs._00322.choice == "questionable" ? frcs._00322.comments : "")

      ppe_26c.setText(frcs._00323.choice == "correct" ? frcs._00323.val.toString() : "")
      ppe_26q.setText(frcs._00323.choice == "questionable" ? frcs._00323.val.toString() : "")
      ppe_26comm.setText(frcs._00323.choice == "questionable" ? frcs._00323.comments : "")

      ppe_27c.setText(frcs._00327.choice == "correct" ? frcs._00327.val.toString() : "")
      ppe_27q.setText(frcs._00327.choice == "questionable" ? frcs._00327.val.toString() : "")
      ppe_27comm.setText(frcs._00327.choice == "questionable" ? frcs._00327.comments : "")

      ppe_28c.setText(frcs._00401.choice == "correct" ? frcs._00401.val.toString() : "")
      ppe_28q.setText(frcs._00401.choice == "questionable" ? frcs._00401.val.toString() : "")
      ppe_28comm.setText(frcs._00401.choice == "questionable" ? frcs._00401.comments : "")

      ppe_29c.setText(frcs._00408.choice == "correct" ? frcs._00408.val.toString() : "")
      ppe_29q.setText(frcs._00408.choice == "questionable" ? frcs._00408.val.toString() : "")
      ppe_29comm.setText(frcs._00408.choice == "questionable" ? frcs._00408.comments : "")

      ppe_30c.setText(frcs._00409.choice == "correct" ? frcs._00409.val.toString() : "")
      ppe_30q.setText(frcs._00409.choice == "questionable" ? frcs._00409.val.toString() : "")
      ppe_30comm.setText(frcs._00409.choice == "questionable" ? frcs._00409.comments : "")

      ppe_31c.setText(frcs._00414.choice == "correct" ? frcs._00414.val.toString() : "")
      ppe_31q.setText(frcs._00414.choice == "questionable" ? frcs._00414.val.toString() : "")
      ppe_31comm.setText(frcs._00414.choice == "questionable" ? frcs._00414.comments : "")

      ppe_32c.setText(frcs._00420.choice == "correct" ? frcs._00420.val.toString() : "")
      ppe_32q.setText(frcs._00420.choice == "questionable" ? frcs._00420.val.toString() : "")
      ppe_32comm.setText(frcs._00420.choice == "questionable" ? frcs._00420.comments : "")

      ppe_33c.setText(frcs._00421.choice == "correct" ? frcs._00421.val.toString().toString() : "")
      ppe_33q.setText(frcs._00421.choice == "questionable" ? frcs._00421.val.toString() : "")
      ppe_33comm.setText(frcs._00421.choice == "questionable" ? frcs._00421.comments : "")

      ppe_34c.setText(frcs._00426.choice == "correct" ? frcs._00426.val.toString() : "")
      ppe_34q.setText(frcs._00426.choice == "questionable" ? frcs._00426.val.toString() : "")
      ppe_34comm.setText(frcs._00426.choice == "questionable" ? frcs._00426.comments : "")

      ppe_35c.setText(frcs._00453.choice == "correct" ? frcs._00453.val.toString() : "")
      ppe_35q.setText(frcs._00453.choice == "questionable" ? frcs._00453.val.toString() : "")
      ppe_35comm.setText(frcs._00453.choice == "questionable" ? frcs._00453.comments : "")

      ppe_36c.setText(frcs._00454.choice == "correct" ? frcs._00454.val.toString() : "")
      ppe_36q.setText(frcs._00454.choice == "questionable" ? frcs._00454.val.toString() : "")
      ppe_36comm.setText(frcs._00454.choice == "questionable" ? frcs._00454.comments : "")

      ppe_37c.setText(frcs._00816.choice == "correct" ? frcs._00816.val.toString() : "")
      ppe_37q.setText(frcs._00816.choice == "questionable" ? frcs._00816.val.toString() : "")
      ppe_37comm.setText(frcs._00816.choice == "questionable" ? frcs._00816.comments : "")

      ppe_38c.setText(frcs._00456.choice == "correct" ? frcs._00456.val.toString() : "")
      ppe_38q.setText(frcs._00456.choice == "questionable" ? frcs._00456.val.toString() : "")
      ppe_38comm.setText(frcs._00456.choice == "questionable" ? frcs._00456.comments : "")

      ppe_39c.setText(frcs._01501.choice == "correct" ? frcs._01501.val.toString() : "")
      ppe_39q.setText(frcs._01501.choice == "questionable" ? frcs._01501.val.toString() : "")
      ppe_39comm.setText(frcs._01501.choice == "questionable" ? frcs._01501.comments : "")

      ppe_40c.setText(frcs._01502.choice == "correct" ? frcs._01502.val.toString() : "")
      ppe_40q.setText(frcs._01502.choice == "questionable" ? frcs._01502.val.toString() : "")
      ppe_40comm.setText(frcs._01502.choice == "questionable" ? frcs._01502.comments : "")

      ppe_41c.setText(frcs._01505.choice == "correct" ? frcs._01505.val.toString() : "")
      ppe_41q.setText(frcs._01505.choice == "questionable" ? frcs._01505.val.toString() : "")
      ppe_41comm.setText(frcs._01505.choice == "questionable" ? frcs._01505.comments : "")

      ppe_42c.setText(frcs._01506.choice == "correct" ? frcs._01506.val.toString() : "")
      ppe_42q.setText(frcs._01506.choice == "questionable" ? frcs._01506.val.toString() : "")
      ppe_42comm.setText(frcs._01506.choice == "questionable" ? frcs._01506.comments : "")

      ppe_43c.setText(frcs._01507.choice == "correct" ? frcs._01507.val.toString() : "")
      ppe_43q.setText(frcs._01507.choice == "questionable" ? frcs._01507.val.toString() : "")
      ppe_43comm.setText(frcs._01507.choice == "questionable" ? frcs._01507.comments : "")

      ppe_44c.setText(frcs._01556.choice == "correct" ? frcs._01556.val.toString() : "")
      ppe_44q.setText(frcs._01556.choice == "questionable" ? frcs._01556.val.toString() : "")
      ppe_44comm.setText(frcs._01556.choice == "questionable" ? frcs._01556.comments : "")

      ppe_45c.setText(frcs._01555.choice == "correct" ? frcs._01555.val.toString() : "")
      ppe_45q.setText(frcs._01555.choice == "questionable" ? frcs._01555.val.toString() : "")
      ppe_45comm.setText(frcs._01555.choice == "questionable" ? frcs._01555.comments : "")

      ppe_46c.setText(frcs._01701.choice == "correct" ? frcs._01701.val.toString() : "")
      ppe_46q.setText(frcs._01701.choice == "questionable" ? frcs._01701.val.toString() : "")
      ppe_46comm.setText(frcs._01701.choice == "questionable" ? frcs._01701.comments : "")

      ppe_47c.setText(frcs._01703.choice == "correct" ? frcs._01703.val.toString() : "")
      ppe_47q.setText(frcs._01703.choice == "questionable" ? frcs._01703.val.toString() : "")
      ppe_47comm.setText(frcs._01703.choice == "questionable" ? frcs._01703.comments : "")

      ppe_48c.setText(frcs._01707.choice == "correct" ? frcs._01707.val.toString() : "")
      ppe_48q.setText(frcs._01707.choice == "questionable" ? frcs._01707.val.toString() : "")
      ppe_48comm.setText(frcs._01707.choice == "questionable" ? frcs._01707.comments : "")

      
      // count total
      // let c_count = 0
      // let q_count = 0

      let total_c = 0
      let total_q = 0
      let total_c_perc = 0
      for (let c in frcs) {
        if (frcs[c].choice === "correct") {
          total_c += frcs[c].val
          // c_count += 1
        }
        if (frcs[c].choice === "questionable") {
          total_q += frcs[c].val
          // q_count += 1
        }
      }
      total_c_perc = (total_c / (total_c + total_q)) * 100

      c_total.setText(total_c.toString())
      q_total.setText(total_q.toString())
      t_correct.setText(total_c_perc.toFixed(1).toString())

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
