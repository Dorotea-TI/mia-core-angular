import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { MiaDataResult } from '../entities/mia-data-result';

@Injectable({
  providedIn: 'root'
})
export class MiaDataResultService {

  results: any = {};

  constructor() { }

  execute<T>(key: string, obs: Observable<any>): Observable<T> {
    let data = this.results[key];
    if(data == undefined){
      this.results[key] = { key: key, status: MiaDataResult.STATUS_SEARCHING, obs: new Subject<any>() } as MiaDataResult;

      obs.subscribe(re => {
        this.results[key].status = MiaDataResult.STATUS_READY;
        this.results[key].items = re;
        this.results[key].obs.next(re);
      });

      return this.results[key].obs;
    }

    if(data.status == MiaDataResult.STATUS_SEARCHING){
      return data.obs;
    }

    return of(data.items);
  }

  clearAll() {
    this.results = {};
  }
}
