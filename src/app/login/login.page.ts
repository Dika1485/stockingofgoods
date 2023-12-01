import { AuthenticationService } from '../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Http } from '@capacitor-community/http';
import { Preferences } from '@capacitor/preferences';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule,ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

const TOKEN_KEY = 'mytoken';
const USERNAME = 'myname';
const ID = 'myid';
@Component({
selector: 'app-login',
templateUrl: './login.page.html',
styleUrls: ['./login.page.scss'],
standalone: true,
imports: [IonicModule, CommonModule, FormsModule]
})
export class LoginPage implements OnInit {
username: any;
password: any;
constructor(
private authService: AuthenticationService,
private alertController: AlertController,
private router: Router
) { }
ngOnInit() {
}
login() {
  if (this.username != null && this.password != null) {
    let url = this.authService.apiURL() + "login.php";
    Http.request({
      method: "POST",
      url: url,
      headers: { "Content-Type": "application/json" },
      data: {
        username: this.username,
        password: this.password
      },
    }).then((data) => {
      console.log(data);
      if (data['data']['status_login'] == 'success') {
        this.setdata(data);
        // this.authService.set(data['data']['username'],data['data']['token'],data['data']['id']);
        // this.username = '';
        // this.password = '';
        // Preferences.set({ key: TOKEN_KEY, value: data['data']['token'] });
        // Preferences.set({ key: USERNAME, value: data['data']['username'] });
        // Preferences.set({ key: ID, value: data['data']['id'] });
        // location.reload();
        // this.router.navigate(['/goods']);
      } else {
        this.alertController.create({
          header: 'Notification',message: 'Username or Password is Wrong',
          buttons: ['OK']
        }).then(res => {
          res.present();
        });
      }
    }, (err) => {
      this.alertController.create({
        header: 'Notification',
        message: 'Login Failed, Check the Connection' + err,
        buttons: ['OK']
      }).then(res => {
        res.present();
      });
    })
  } else {
    this.alertController.create({
      header: 'Notification',
      message: 'Username and Password must not Empty',
      buttons: ['OK']
    }).then(res => {
      res.present();
    });
  }

  // if (this.username == "admin" && this.password == "admin") {
  //   this.router.navigate(['/goods']);
  //   this.username="";
  //   this.password="";
  // }

  // if (this.authService.login(this.username, this.password)) {
  //   this.router.navigate(['/goods']);
  // } else {
  //   console.log('Invalid credentials');
  // }
}
setdata=async (data:any) => {
  await this.authService.set(data['data']['username'],data['data']['token'],data['data']['id']);
  this.username = '';
  this.password = '';
  Preferences.set({ key: TOKEN_KEY, value: data['data']['token'] });
  Preferences.set({ key: USERNAME, value: data['data']['username'] });
  Preferences.set({ key: ID, value: data['data']['id'] });
  // location.reload();
  this.router.navigate(['/goods']);
}

}