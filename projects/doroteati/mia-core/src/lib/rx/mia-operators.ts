import { Observable } from "rxjs";

export function nil() {
    return function<T>(source: Observable<any>): Observable<T> {
      return new Observable(subscriber => {
        source.subscribe({
          next(value) {
            if(value !== undefined && value !== null && value !== false && value !== '') {
              subscriber.next(value);
            }
          },
          error(error) {
            subscriber.error(error);
          },
          complete() {
            subscriber.complete();
          }
        })
      });
    }
};

export function truly() {
    return function<T>(source: Observable<boolean>): Observable<boolean> {
      return new Observable(subscriber => {
        source.subscribe({
          next(value) {
            if(value !== undefined && value === true) {
              subscriber.next(value);
            }
          },
          error(error) {
            subscriber.error(error);
          },
          complete() {
            subscriber.complete();
          }
        })
      });
    }
};