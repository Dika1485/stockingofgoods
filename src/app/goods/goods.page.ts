import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule,ModalController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { home, key } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-goods',
  templateUrl: './goods.page.html',
  styleUrls: ['./goods.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class GoodsPage implements OnInit {

  // constructor() { 
  //   Public _apiService: ApiService;
  //   Private modal:ModalController;
  // }
  constructor(public _apiService: ApiService,private modal: ModalController,private router: Router,
    private authService: AuthenticationService,){};
  modal_update = false;
  modal_create = false;
  dataGoods:any=[];
  id:any;
  item:any;
  stock:any;

  ngOnInit() {
    this.getGoods();
  }
  getGoods() {
    console.log(this.authService.getId());
    this._apiService.read(this.authService.getId(),'read.php').subscribe({
      next: (res: any) => {
        console.log('success', res);
        this.dataGoods = res;
      },
      error: (err: any) => {
        console.log(err);
      },
    })
  }
  logout(){
    this.router.navigate(['/login']);
    this.authService.logout();
  }
  reset_model() {
    this.id = null;
    this.item = '';
    this.stock = '';
  }
  cancel() {
    // this.modal.dismiss();
    this.modal_create = false;
    this.modal_update = false;
    this.reset_model();
  }
  createGoods() {
    if (this.item != '' && this.stock != '') {
      let data = {
        item: this.item,
        stock: this.stock,
        id: this.authService.getId()
      }
      this._apiService.create(data, 'create.php').subscribe({
        next: (result: any) => {
          this.reset_model();
          console.log('Insert Goods Success');
          this.getGoods();
          this.modal_create = false;
          this.modal.dismiss();
        },
        error: (err: any) => {
          console.log('Insert Goods Failed');
        }
      })
    }
    else {
      console.log('Insert Goods Failed because Data is Empty');
    }
  }
  deleteGoods(id: any) {
    this._apiService.delete(id,'delete.php?id=').subscribe({
      next: (res: any) => {
        console.log('success', res);
        this.getGoods();
        console.log('Delete Goods Success');
      },
      error: (error: any) => {
        console.log('Failed');
      }
    })
  }
  readId(id: any) {
    this._apiService.readid(id,'readid.php?id=').subscribe({
      next: (result: any) => {
        console.log('success', result);
        let goods = result;
        this.id = goods.id;
        this.item = goods.item;
        this.stock = goods.stock;
      },
      error: (error: any) => {
        console.log('Read data is Failed');
      }
    })
  }
  open_modal_create(isOpen: boolean) {
    this.modal_create = isOpen;
    this.reset_model();
    this.modal_create = true;
    this.modal_update = false;
  }
  open_modal_update(isOpen: boolean, idget: any) {
    this.modal_update = isOpen;
    this.id = idget;
    console.log(this.id);
    this.readId(this.id);
    this.modal_create = false;
    this.modal_update = true;
  }
  updateGoods() {
    let data = {
      id: this.id,
      item: this.item,
      stock: this.stock
    }
    this._apiService.update(data, 'update.php').subscribe({
      next: (result: any) => {
        console.log(result);
        this.reset_model();
        this.getGoods();
        console.log('Update Goods Success');
        this.modal_update = false;
        this.modal.dismiss();
      },
      error: (err: any) => {
        console.log('Update Goods Failed');
      }
    })
  }
}