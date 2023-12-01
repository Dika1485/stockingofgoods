// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { BehaviorSubject } from 'rxjs';
// import { Preferences } from '@capacitor/preferences';
// const TOKEN_KEY = 'token-saya';
// @Injectable({
// providedIn: 'root'
// })
// export class AuthenticationService {
// // Inisialisasi is auth
// isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
// token = '';
// constructor(private http: HttpClient) {
// this.loadToken();
// }
// async loadToken() {
// const token = await Preferences.get({ key: TOKEN_KEY });
// if (token && token.value) {
// console.log('set token: ', token.value);
// this.token = token.value;
// this.isAuthenticated.next(true);
// } else {
// this.isAuthenticated.next(false);
// }
// }
// apiURL() {
// return "http://localhost/stockingofgoods";
// }
// logout(): Promise<void> {
// this.isAuthenticated.next(false);
// return Preferences.remove({ key: TOKEN_KEY });
// }
// }
// auth.service.ts

import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private isAuthenticated = false;
  private token = 'mytoken';
  private username = 'myname';
  private id = 'myid';

  login(username: string, password: string): boolean {
    // Implement your authentication logic here (e.g., check against a hardcoded username/password)
    if (username === 'admin' && password === 'password') {
      this.isAuthenticated = true;
      return true;
    }
    return false;
  }
  apiURL() {
    return "http://localhost/stockingofgoods/";
  }

  logout(): void {
    this.isAuthenticated = false;
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  set(username: string, token: string, id: string){
    this.username = username;
    this.id = id;
    this.token = token;
  }
  getId(){
    return this.id;
  }
}
