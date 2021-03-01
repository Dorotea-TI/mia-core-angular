import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MiaPagination } from '../entities/mia-pagination';
import { MiaQuery } from '../entities/mia-query';
import { MiaBaseHttpService } from './mia-base-http.service';

@Injectable({
  providedIn: 'root'
})
export class MiaBaseCrudHttpService<T> extends MiaBaseHttpService {

  basePathUrl = '';

  constructor(
    protected http: HttpClient
  ) {
    super(http);
  }

  fetch(itemId: number): Promise<T> {
    return this.get(this.basePathUrl + '/fetch/' + itemId);
  }

  save(item: T): Promise<T> {
    return this.post(this.basePathUrl + '/save', item);
  }

  list(query: MiaQuery): Promise<MiaPagination<T>> {
    return this.post(this.basePathUrl + '/list', query.toParams());
  }

  all(): Promise<MiaPagination<T>> {
    return this.list(new MiaQuery());
  }

  listWithExtras(query: MiaQuery, moreParams: any): Promise<MiaPagination<T>> {
    let data = {...query.toParams(), ...moreParams};
    return this.post(this.basePathUrl + '/list', data);
  }

  remove(itemId: number): Promise<boolean> {
    return this.delete(this.basePathUrl + '/remove/' + itemId);
  }
}
