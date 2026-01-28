import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable, InjectionToken, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MiaFile } from '../entities/mia-file';
import { MiaResponse } from '../entities/mia-response';

export const MIA_GOOGLE_STORAGE_PROVIDER = new InjectionToken<MiaGoogleStorage>(
  'doroteati.google-storage'
);

@Injectable()
export class MiaGoogleStorage {
  bucket: string = '';
}

@Injectable({
  providedIn: 'root',
})
export class GoogleStorageService {
  protected readonly config = inject(MIA_GOOGLE_STORAGE_PROVIDER);
  protected readonly http = inject(HttpClient);

  public uploadFile(file: File): Observable<{ name: string; size: number }> {
    const d = new Date();
    return this.http.post<{ name: string; size: number }>(
      'https://storage.googleapis.com/upload/storage/v1/b/' +
        this.config.bucket +
        '/o?uploadType=media&name=' +
        d.getMilliseconds() +
        '_' +
        d.getFullYear() +
        d.getMonth() +
        d.getDay() +
        d.getHours() +
        '_' +
        file.name.replace(/ /g, ''),
      file
    );
  }

  public uploadDirect(file: File): Observable<MiaResponse<MiaFile>> {
    const d = new Date();
    return this.http
      .post<{ name: string; size: number }>(
        'https://storage.googleapis.com/upload/storage/v1/b/' +
          this.config.bucket +
          '/o?uploadType=media&name=' +
          d.getMilliseconds() +
          '_' +
          d.getFullYear() +
          d.getMonth() +
          d.getDay() +
          d.getHours() +
          '_' +
          file.name.replace(/ /g, ''),
        file
      )
      .pipe(
        map((data) => {
          return {
            success: true,
            response: {
              name: file.name,
              url:
                'https://storage.googleapis.com/' +
                this.config.bucket +
                '/' +
                data.name,
              mediaLink:
                'https://storage.googleapis.com/' +
                this.config.bucket +
                '/' +
                data.name,
              size: data.size,
            },
          };
        })
      );
  }

  public uploadWithProgressDirect(
    file: File
  ): Observable<HttpEvent<{ name: string; size: number }>> {
    const d = new Date();

    return this.http.post<{ name: string; size: number }>(
      'https://storage.googleapis.com/upload/storage/v1/b/' +
        this.config.bucket +
        '/o?uploadType=media&name=' +
        d.getMilliseconds() +
        '_' +
        d.getFullYear() +
        d.getMonth() +
        d.getDay() +
        d.getHours() +
        '_' +
        file.name.replace(/ /g, ''),
      file,
      {
        reportProgress: true,
        observe: 'events',
      }
    );
  }

  public delete(fileName: string) {
    this.http
      .delete(
        'https://storage.googleapis.com/storage/v1/b/' +
          this.config.bucket +
          '/o/' +
          fileName
      )
      .subscribe(() => {});
  }
}
