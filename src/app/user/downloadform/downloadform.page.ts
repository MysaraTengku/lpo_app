import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PDFDocument} from 'pdf-lib'

declare var require: any
const FileSaver = require('file-saver');

@Component({
  selector: 'app-downloadform',
  templateUrl: './downloadform.page.html',
  styleUrls: ['./downloadform.page.scss'],
})


export class DownloadformPage implements OnInit {
  @ViewChild('myCanvas', {static: true}) myCanvas: ElementRef; // canvas
  constructor() {
    
    
   }
  // @ViewChild("downloadPdf") pdfForm: ElementRef;


  async ngOnInit() {

    let reader = new FileReader()
    
    // let data = document.getElementById("downloadPdf");  

    const formurl = "../../../assets/media/LPO_TEST.pdf"
    const existingPdfBytes = await fetch(formurl).then(res => res.arrayBuffer());

    const pdfDoc = await PDFDocument.load(existingPdfBytes)

    const form = pdfDoc.getForm()

    const sitename = form.getTextField("SITENAME")
    const city = form.getTextField("CITY")
    const OBSERVATION_DATE = form.getTextField("OBSERVATION_DATE")
    const AM = form.getCheckBox("AM")
    const STJE = form.getCheckBox("Supervisor to Job Expert")

    sitename.setText("Its working")
    city.setText("SG")
    OBSERVATION_DATE.setText("31/01/1997")

    AM.check()
    STJE.check()

    
    const pdfBytes = await pdfDoc.save()
    console.log(existingPdfBytes)
    const pdfUrl = './assets/sample.pdf';
    const pdfName = 'your_pdf_file';
    var blob = new Blob([pdfBytes], {type: "application/pdf"});
    FileSaver.saveAs(blob, pdfName);
  }

  // downloadFile(data: Response) {
  //   const blob = new Blob([data], { type: 'application/pdf' });
  //   const url= window.URL.createObjectURL(blob);
  //   window.open(url);
  // }

}
