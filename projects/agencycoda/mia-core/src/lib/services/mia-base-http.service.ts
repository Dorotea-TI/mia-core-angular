import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MiaResponse } from '../entities/mia-response';

@Injectable({
  providedIn: 'root'
})
export class MiaBaseHttpService {

  constructor(
    protected http: HttpClient
  ) { }

  public post<T>(url: string, params: any): Promise<T> {
    return new Promise<any>((resolve, reject) => {
      this.http.post<MiaResponse<T>>(url, params)
      .toPromise()
      .then(result => {
        if (result.success) {
          resolve(result.response);
        } else {
          reject(result.error);
        }
      })
      .catch(error => {
        reject(error);
      });
    });
  }

  public get<T>(url: string): Promise<T> {
    return new Promise<any>((resolve, reject) => {
      this.http.get<MiaResponse<T>>(url)
      .toPromise()
      .then(result => {
        if (result.success) {
          resolve(result.response);
        } else {
          reject(result.error);
        }
      })
      .catch(error => {
        reject(error);
      });
    });
  }
}
