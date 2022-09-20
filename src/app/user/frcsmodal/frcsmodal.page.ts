import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-frcsmodal',
  templateUrl: './frcsmodal.page.html',
  styleUrls: ['./frcsmodal.page.scss'],
})
export class FRCSmodalPage implements OnInit {

  frcs = {
    fact5: {choice: '',
    root: "",
    solution: ""
  }
  }

  constructor(private modalCtr: ModalController,
    private navParams: NavParams
    ) { }

  ngOnInit() {
    console.log(this.navParams.data._id)
    console.log(this.navParams.data._title)
  }

  async close() {
    const closeModal: string = "Modal Closed";
    await this.modalCtr.dismiss(closeModal);
  }
}
