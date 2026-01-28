import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MiaPagination } from '../entities/mia-pagination';
import { MiaQuery } from '../entities/mia-query';
import { MiaBaseHttpService } from './mia-base-http.service';

@Injectable({
  providedIn: 'root',
})
export class MiaBaseCrudHttpService<T> extends MiaBaseHttpService {
  basePathUrl = '';

  fetch(itemId: number): Observable<T> {
    return this.get(this.basePathUrl + '/fetch/' + itemId);
  }

  fetchOb(itemId: number): Observable<T> {
    return this.getOb(this.basePathUrl + '/fetch/' + itemId);
  }

  fetchWithRelation(itemId: number, withs: Array<string>): Observable<T> {
    return this.getOb(
      this.basePathUrl + '/fetch/' + itemId + '?withs=' + withs.join()
    );
  }

  save(item: T): Observable<T> {
    return this.post(this.basePathUrl + '/save', item);
  }

  saveOb(item: T): Observable<T> {
    return this.postOb(this.basePathUrl + '/save', item);
  }

  list(query: MiaQuery): Observable<MiaPagination<T>> {
    return this.post(this.basePathUrl + '/list', query.toParams());
  }

  listOb(query: MiaQuery): Observable<MiaPagination<T>> {
    return this.postOb(this.basePathUrl + '/list', query.toParams());
  }

  all(): Observable<MiaPagination<T>> {
    return this.list(new MiaQuery());
  }

  allOb(): Observable<MiaPagination<T>> {
    return this.listOb(new MiaQuery());
  }

  listWithOneWhere(
    key: string,
    value: unknown
  ): Observable<MiaPagination<T>> {
    const query = new MiaQuery();
    query.addWhere(key, value);
    return this.listOb(query);
  }

  listWithExtras(
    query: MiaQuery,
    moreParams: Record<string, unknown>
  ): Observable<MiaPagination<T>> {
    const data = { ...query.toParams(), ...moreParams };
    return this.post(this.basePathUrl + '/list', data);
  }

  listObWithExtras(
    query: MiaQuery,
    moreParams: Record<string, unknown>
  ): Observable<MiaPagination<T>> {
    const data = { ...query.toParams(), ...moreParams };
    return this.postOb(this.basePathUrl + '/list', data);
  }

  remove(itemId: number): Observable<boolean> {
    return this.delete(this.basePathUrl + '/remove/' + itemId);
  }

  removeOb(itemId: number): Observable<boolean> {
    return this.deleteOb(this.basePathUrl + '/remove/' + itemId);
  }
}
