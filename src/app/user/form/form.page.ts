import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PdfComponent } from 'src/app/pdf/pdf.component';
import template from "./template";


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
    date: ''
  }

  constructor() { }

  ngOnInit() {
  }
  @ViewChild("downloadPdf") pdfForm;
 

  logForm() {
    // var el: any = document.createElement( 'html' );
    // el.innerHTML = template

    // console.log(el.getElementsByTagName("div")[0])
    // var data = document.getElementsByTagName("div");  //Id of the table



  }


  

}
