import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { IToastDataInterface } from '../../interfaces/IToastDataInterface';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor(private toastCtrl: ToastController) {}

  public async presentToast(data: IToastDataInterface): Promise<void> {
    const toast = await this.toastCtrl.create({
      ...data,
      duration: data.duration ? data.duration : 2000,
      position: data.position ? data.position : 'middle',
      color: data.color ? data.color : 'success',
      buttons: data.buttons ? data.buttons : [{ side: 'end', text: 'OK', role: 'cancel' }],
    });

    await toast.present();
  }
}
