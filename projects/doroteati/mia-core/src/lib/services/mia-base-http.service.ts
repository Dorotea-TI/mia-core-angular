import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MiaResponse } from '../entities/mia-response';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { MiaCoreConfig, MIA_CORE_PROVIDER } from '../entities/mia-core-config';

@Injectable({
  providedIn: 'root',
})
export class MiaBaseHttpService {
  protected readonly config = inject<MiaCoreConfig>(MIA_CORE_PROVIDER);
  protected readonly http = inject(HttpClient);

  public post<T>(url: string, params: unknown): Observable<T> {
    if (this.config.v2) {
      return this.http.post<T>(url, params);
    }

    return this.http
      .post<MiaResponse<T>>(url, params)
      .pipe(
        map((result) => {
          if (result.success) {
            return result.response!;
          }

          throw result.error;
        })
      )
      .pipe(
        catchError((err) => {
          console.log('MIA Core Error - URL: ' + url);
          console.log('MIA Core Error - Params: ');
          console.log(params);
          throw err;
        })
      );
  }

  public postOb<T>(url: string, params: unknown): Observable<T> {
    if (this.config.v2) {
      return this.http.post<T>(url, params);
    }

    return this.http
      .post<MiaResponse<T>>(url, params)
      .pipe(
        map((result) => {
          if (result.success) {
            return result.response!;
          }

          throw result.error;
        })
      )
      .pipe(
        catchError((err) => {
          console.log('MIA Core Error - URL: ' + url);
          console.log('MIA Core Error - Params: ');
          console.log(params);
          throw err;
        })
      );
  }

  public get<T>(url: string): Observable<T> {
    if (this.config.v2) {
      return this.http.get<T>(url);
    }

    return this.http
      .get<MiaResponse<T>>(url)
      .pipe(
        map((result) => {
          if (result.success) {
            return result.response!;
          }

          throw result.error;
        })
      )
      .pipe(
        catchError((err) => {
          console.log('MIA Core Error - URL: ' + url);
          console.log('MIA Core Error - Params None');
          throw err;
        })
      );
  }

  public getOb<T>(url: string): Observable<T> {
    if (this.config.v2) {
      return this.http.get<T>(url);
    }

    return this.http
      .get<MiaResponse<T>>(url)
      .pipe(
        map((result) => {
          if (result.success) {
            return result.response!;
          }

          throw result.error;
        })
      )
      .pipe(
        catchError((err) => {
          console.log('MIA Core Error - URL: ' + url);
          console.log('MIA Core Error - Params None');
          throw err;
        })
      );
  }

  public delete<T>(url: string): Observable<T> {
    if (this.config.v2) {
      return this.http.delete<T>(url);
    }

    return this.http
      .delete<MiaResponse<T>>(url)
      .pipe(
        map((result) => {
          if (result.success) {
            return result.response!;
          }

          throw result.error;
        })
      )
      .pipe(
        catchError((err) => {
          console.log('MIA Core Error - URL: ' + url);
          console.log('MIA Core Error - Params None');
          throw err;
        })
      );
  }

  public deleteOb<T>(url: string): Observable<T> {
    if (this.config.v2) {
      return this.http.delete<T>(url);
    }

    return this.http
      .delete<MiaResponse<T>>(url)
      .pipe(
        map((result) => {
          if (result.success) {
            return result.response!;
          }

          throw result.error;
        })
      )
      .pipe(
        catchError((err) => {
          console.log('MIA Core Error - URL: ' + url);
          console.log('MIA Core Error - Params None');
          throw err;
        })
      );
  }
}
