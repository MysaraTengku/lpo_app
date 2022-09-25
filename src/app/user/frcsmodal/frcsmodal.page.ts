import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { ActionSheetController, ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-frcsmodal',
  templateUrl: './frcsmodal.page.html',
  styleUrls: ['./frcsmodal.page.scss'],
})



export class FRCSmodalPage implements OnInit {
  frcs = {
    _id: this.navParams.data._id,
    _title: this.navParams.data._title,
    _complete: false,
    isDelete: false,
    fact1: {
      root: '',
      solution: '',
    },
    fact2: {
      root: '',
      solution: '',
    },
    fact3: {
      root: '',
      solution: '',
    },
    fact4: {
      root: '',
      solution: '',
    },
    fact5: {
      choice: '',
      root: '',
      solution: '',
    },
    fact6: {
      root: '',
      solution: '',
    },
    fact7: {
      root: '',
      solution: '',
    },

  };

  constructor(
    private modalCtr: ModalController,
    private navParams: NavParams,
    public actionSheetController: ActionSheetController
  ) {}


  ngOnInit() {
    console.log(this.navParams.data._id)
    console.log(this.navParams.data._title)
    
    console.log('fired')
    const data = this.navParams.data._data
    
    if (data) {
      this.frcs = data
    }
  }
  ngAfterViewInit() {

  }

  async close() {
    // const closeModal: string = 'Modal Closed';
    await this.modalCtr.dismiss("");
  }

  async logForm() {
    console.log(this.frcs)
    this.frcs._complete = true
    await this.modalCtr.dismiss(this.frcs);
  }

  menu() {
  this.presentActionSheet()
   
  }
  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Edit',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.frcs.isDelete = true
          this.modalCtr.dismiss(this.frcs);
        }
      }, {
        text: 'Reset Form',
        icon: 'refresh',
        handler: () => {
          console.log('refreshed');
          this.frcs = this.reset() 
          
        }
      }]
    });
    await actionSheet.present();

    const { role, data } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role and data', role, data);
  }


  reset() {
    return {
      _id: this.navParams.data._id,
      _title: this.navParams.data._title,
      _complete: false,
      isDelete: false,
      fact1: {
        root: '',
        solution: '',
      },
      fact2: {
        root: '',
        solution: '',
      },
      fact3: {
        root: '',
        solution: '',
      },
      fact4: {
        root: '',
        solution: '',
      },
      fact5: {
        choice: '',
        root: '',
        solution: '',
      },
      fact6: {
        root: '',
        solution: '',
      },
      fact7: {
        root: '',
        solution: '',
      },
      
    }
  }
}
