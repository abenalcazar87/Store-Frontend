import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject, AfterContentInit, ViewChild  } from '@angular/core';
//import { Reserva } from '../../../models/reserva';
//import { ReservaAsiento } from '../../../models/reserva-asiento';

@Component({
  selector: 'app-show-pdf',
  templateUrl: './show-pdf.component.html',
  styleUrls: ['./show-pdf.component.scss']
})
export class ShowPdfComponent implements OnInit, AfterContentInit {

  //pdfSrc:string="assets/pdf/boleto.pdf";
  pdfSrc: string = "";

  @ViewChild('externalPdfViewer') public externalPdfViewer;
  @ViewChild('embeddedPdfViewer') public embeddedPdfViewer;
  @ViewChild('inlinePdfViewer') public inlinePdfViewer;
  //@ViewChild('pdfViewer') public pdfViewer;
  @ViewChild('pdfViewer') pdfViewer;

  constructor(public dialogRef: MatDialogRef<ShowPdfComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
   }

  ngOnInit() {
    
  }

  ngAfterContentInit() {
    debugger;    
    this.pdfSrc = this.data.url;
  }

}
