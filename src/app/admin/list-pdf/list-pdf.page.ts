import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { PDFDict, PDFDocument, TextAlignment} from 'pdf-lib'
import * as moment from 'moment';
declare var require: any
import { LoadingController } from '@ionic/angular';


const FileSaver = require('file-saver');





@Component({
  selector: 'app-list-pdf',
  templateUrl: './list-pdf.page.html',
  styleUrls: ['./list-pdf.page.scss'],
})
export class ListPdfPage implements OnInit {
  forms = []
  constructor(private data: DataService, public loadingController: LoadingController) { }

  ngOnInit() {
   this.data.getForms().subscribe(data => {
      this.forms = data
      console.log(data)
    })
  }

  async downloadForm(username ,dataForm) {
    this.presentLoading()
    const formurl = "../../../assets/media/LPO_TEST.pdf"
    const existingPdfBytes = await fetch(formurl).then(res => res.arrayBuffer());

    const pdfDoc = await PDFDocument.load(existingPdfBytes)

    const form = pdfDoc.getForm()


    //First Section 1
    const site = form.getTextField("site")
    const city = form.getTextField("city")
    const obs_date = form.getTextField("obs_date")
    const obs_time = form.getTextField("obs_time")
    const am_chk = form.getCheckBox("AM")
    const pm_chk = form.getCheckBox("PM")
    const peer_to_peer = form.getCheckBox("peer_to_peer")
    const super_to_job = form.getCheckBox("superv_to_job")


    //section 2
    const observer_name = form.getTextField("observers_name")
    const observer_title = form.getTextField("observers_title")
    const observer_comp = form.getTextField("observers_comp")
    const observees_title = form.getTextField("oberservers_title")
    const observees_comp = form.getTextField("observees_comp")

    // region chkbox
    const africa = form.getCheckBox("Africa")
    const americas_south = form.getCheckBox("Americas South")
    const asia = form.getCheckBox("Asia")
    const canada = form.getCheckBox("Canada")
    const europe = form.getCheckBox("Europe")
    const middle_east = form.getCheckBox("Middle East")
    const united_state = form.getCheckBox("United States")

    // responsible Dept
    const resp_dept = form.getTextField("responsible_dept")

    // property solutions
    const ps_facilities  = form.getCheckBox("ps_facilities")
    const ps_projects = form.getCheckBox("ps_project")

    // environmental solutions
    const es_comm  = form.getCheckBox("es_commercial")
    const es_ram  = form.getCheckBox("es_ram")
    const es_proj  = form.getCheckBox("es_projects")


    const us_east  = form.getCheckBox("us_west")
    const us_west_as  = form.getCheckBox("us_west_americas_south")
    const iol_upstream  = form.getCheckBox("iol_upstream")
    const iol_downstream  = form.getCheckBox("iol_downstream")
    const uk_nor_  = form.getCheckBox("uk_nor_cyp_egy")
    const benelux_fr_  = form.getCheckBox("benelux_fr_it_ger")
    const ap_north  = form.getCheckBox("ap_north")
    const ap_south  = form.getCheckBox("ap_south")

    // E&PS
    const gsc_sshe  = form.getCheckBox("gsc_sshe")
    const global_SS  = form.getCheckBox("global_s&s")
    const eps_admin_others  = form.getCheckBox("e&ps_admin_others")




    // task observed
    const asbestos  = form.getCheckBox("AsbestosLead Work")
    const carpentry  = form.getCheckBox("CarpentryWoodwork")
    const cei_install  = form.getCheckBox("Ceiling Installation")
    const clean_house  = form.getCheckBox("CleaningHousekeeping")
    const construction  = form.getCheckBox("ConstructionInstallation")
    const crane_ops  = form.getCheckBox("Crane OperationsRiggingLifting")
    const demo_rem  = form.getCheckBox("DemolitionRemoval")
    const drilling  = form.getCheckBox("DrillingWorkoverWorkline")
    const earth_ext  = form.getCheckBox("EarthmovingExcavationTrenching")

    const elec_rep_main  = form.getCheckBox("Electrical RepairMaintenance")
    const energy_iso  = form.getCheckBox("Energy IsolationControl")
    const flooring_install  = form.getCheckBox("Flooring Installation")
    const food_prep  = form.getCheckBox("Food Preparation  Handling")
    const gaug_sampling  = form.getCheckBox("GaugingSampling")
    const hvac  = form.getCheckBox("HVAC")
    const inspection  = form.getCheckBox("Inspection")
    const load_unload  = form.getCheckBox("LoadingUnloading")
    const mason_conct  = form.getCheckBox("MasonryConcretePaving")

    const mobile_rem  = form.getCheckBox("Mobile RemVac Event")
    const office_work  = form.getCheckBox("Office Work")
    const om_remediation  = form.getCheckBox("OM Remediation System")
    const painting_coat  = form.getCheckBox("PaintingCoatingInsulation")
    const plumbing  = form.getCheckBox("PlumbingPiping")
    const repair_main  = form.getCheckBox("RepairMaintMechSchedRoutine")
    const scaffolding_erec  = form.getCheckBox("Scaffolding ErectingDismantling")


    // associated high risk work (LSA)
    const work_at_height  = form.getCheckBox("Working at Height")
    const work_near_move  = form.getCheckBox("Working Near Moving Equipment")
    const lift_rigg  = form.getCheckBox("Lifting and Rigging")
    const excavation  = form.getCheckBox("Excavation")
    const ener_iso  = form.getCheckBox("Energy Isolation")
    const host_work = form.getCheckBox("Hot Work")
    const conf_space  = form.getCheckBox("Confined Space")
    const defeat_of_crit  = form.getCheckBox("Defeat of Critical Safety Devices")
    const does_not_apply  = form.getCheckBox("Does not apply")
    
    
    // brief description of task observed
    const brief_desc = form.getTextField("brief_description")


    // positive comments
    const positive_comments = form.getTextField("positive_comments")

    //feedback session
    const conducted_by = form.getTextField("feedback_session_conducted_by")
    const observees_super = form.getTextField("observees_supervisor")
    const session_date = form.getTextField("feesback_session_date")
    const session_time = form.getTextField("feedback_session_time")



    // solution developed by FRCS
    const chklist_1 = form.getTextField("chklist_1")
    const factor_1 = form.getTextField("factor_1")
    const solution_1 = form.getTextField("solution_1")
    const person_resp_1 = form.getTextField("person_resp_1")
    const target_1 = form.getTextField("target_1")
    const actual_1 = form.getTextField("actual_1")
    const vv_date_1 = form.getTextField("v&v_date_1")

    const chklist_2 = form.getTextField("chklist_2")
    const factor_2= form.getTextField("factor_2")
    const solution_2 = form.getTextField("solution_2")
    const person_resp_2 = form.getTextField("person_resp_2")
    const target_2 = form.getTextField("target_2")
    const actual_2 = form.getTextField("actual_2")
    const vv_date_2 = form.getTextField("v&v_date_2")


    const super_qual_chk  = form.getTextField("supervisor_qual_chk")
    const title_comp  = form.getTextField("title_company")
    const date  = form.getTextField("10_date")


    // v&v comments
    const c_vv_date_1  = form.getTextField("v&v_1")
    const job_title_1  = form.getTextField("job_title_1")
    const comments_1  = form.getTextField("comments_1")
    const c_vv_date_2= form.getTextField("v&v_2")
    const job_title_2  = form.getTextField("job_title_2")
    const comments_2  = form.getTextField("comments_2")

    //personal protective equipment
    const ppe_1c  = form.getTextField("00101_c")
    const ppe_1q  = form.getTextField("00101_q")
    const ppe_1comm  = form.getTextField("00101_comments")


    //--------------------------- Set name/chkbox ------------------------//

    // 1 ROW
    site.setText(dataForm.siteName)
    city.setText(dataForm.country)
    obs_date.setText(moment(dataForm.date).format("DD/MM/YYYY"))
    obs_time.setText(moment(dataForm.time).format("HH:mm"))

    const time = parseInt(moment(dataForm.time).format("HH")) 
    // console.log(time < 12)
    time < 12  ? am_chk.check() : pm_chk.check() // check AM/PM
    dataForm.classification == "peer" ? peer_to_peer.check() : super_to_job.check(); // peer / superv_to_job


    // 2 ROW    
    observer_name.setText(dataForm.obs_name)
    observer_title.setText(dataForm.obs_title)
    observer_comp.setText(dataForm.obs_comp)
    observees_title.setText(dataForm.obe_title)
    observees_comp.setText(dataForm.obe_comp)

   

    const pdfBytes = await pdfDoc.save()

    const pdfName = `${username}_LPO Non-compliance`; // pdf file name

    var blob = new Blob([pdfBytes], {type: "application/pdf"}); // prepare file

    FileSaver.saveAs(blob, pdfName); //download file
    this.loadingController.dismiss()
  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Preparing...',
    });
    await loading.present();
  }
}
