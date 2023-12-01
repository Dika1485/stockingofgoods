import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
providedIn: 'root'
})
export class ApiService {
  constructor(public http: HttpClient) { }
  apiURL() {
    return 'http://localhost/stockingofgoods';
  }
  create(data: any, endpoint: string) {
    return this.http.post(this.apiURL() + '/' + endpoint, data);
  }
  update(data: any, endpoint: string) {
    return this.http.put(this.apiURL() + '/' + endpoint, data);
  }
  read(id: any, endpoint: string): Observable<any> {
    return this.http.get(this.apiURL() + '/' + endpoint + '' + id);
  }
  delete(id: any, endpoint: string) {
    console.log(id);
    return this.http.delete(this.apiURL() + '/' + endpoint + '' + id);
  }
  readid(id: any, endpoint: string) {
    return this.http.get(this.apiURL() + '/' + endpoint + '' + id);
  }
}