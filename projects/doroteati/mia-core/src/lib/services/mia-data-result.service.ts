import { Injectable } from '@angular/core';

import { Observable, of, Subject } from 'rxjs';

import { MiaDataResult } from '../entities/mia-data-result';

@Injectable({
  providedIn: 'root',
})
export class MiaDataResultService {
  private results: Record<string, MiaDataResult<unknown>> = {};

  execute<T>(key: string, obs: Observable<T>): Observable<T> {
    const data = this.results[key];
    if (data == undefined) {
      const result: MiaDataResult<unknown> = {
        key: key,
        status: MiaDataResult.STATUS_SEARCHING,
        obs: new Subject<unknown>(),
      };
      this.results[key] = result;

      obs.subscribe((re) => {
        result.status = MiaDataResult.STATUS_READY;
        result.items = re;
        result.result = re;
        result.obs?.next(re);
      });

      return result.obs as Observable<T>;
    }

    if (data.status == MiaDataResult.STATUS_SEARCHING) {
      return data.obs as Observable<T>;
    }

    return of(data.items as T);
  }

  clearAll() {
    this.results = {};
  }
}
