import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PDFDict, PDFDocument, TextAlignment} from 'pdf-lib'

declare var require: any
const FileSaver = require('file-saver');

@Component({
  selector: 'app-downloadform',
  templateUrl: './downloadform.page.html',
  styleUrls: ['./downloadform.page.scss'],
})


export class DownloadformPage implements OnInit {
  constructor() {
    
    
   }
  // @ViewChild("downloadPdf") pdfForm: ElementRef;


  async ngOnInit() {

  
    const formurl = "../../../assets/media/FRCS_FORM.pdf"
    const existingPdfBytes = await fetch(formurl).then(res => res.arrayBuffer());

    const pdfDocd = await PDFDocument.create();  

    for (let i = 1; i < 3 ; i++) {
 
      const fmcs = await PDFDocument.load(existingPdfBytes)

      const form = fmcs.getForm()
      const nn = form.getTextField('Text201')
      const nnn = form.getTextField('Text204')
      const nedw = form.getTextField('Text216')

      nn.setText("test " + i)
      nnn.setText("Testing liao good")
      nedw.setText("Yo sup " + i)
 
      const newpageBytes = await fmcs.save()

      const newpage = await PDFDocument.load(newpageBytes)

      const [page1] = await pdfDocd.copyPages(newpage, [0])
      const [page2] = await pdfDocd.copyPages(newpage, [1])

      pdfDocd.addPage(page1)
      pdfDocd.addPage(page2)
      
    }
    const pdfBytes = await pdfDocd.save()

    const pdfName = 'your_pdf_file'; // pdf file name

    var blob = new Blob([pdfBytes], {type: "application/pdf"}); // prepare file

    FileSaver.saveAs(blob, pdfName); //download file
  }

  // downloadFile(data: Response) {
  //   const blob = new Blob([data], { type: 'application/pdf' });
  //   const url= window.URL.createObjectURL(blob);
  //   window.open(url);
  // }

}
