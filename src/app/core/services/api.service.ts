import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpContext,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

interface HttpClientOptions {
  headers?:
    | HttpHeaders
    | {
        [header: string]: string | string[];
      }
    | undefined;
  params?:
    | HttpParams
    | {
        [param: string]: string | string[];
      };
  context?: HttpContext | undefined;
  observe?: 'body' | undefined;
  reportProgress?: boolean | undefined;
  responseType?: 'json' | undefined;
  withCredentials?: boolean | undefined;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public readonly hostUrl: string = environment.backendHost;

  constructor(private readonly http: HttpClient) {}

  public get<T>(subUrl: string, params?: HttpClientOptions): Observable<T> {
    const url: string = this.getFullUrl(subUrl);

    return this.http.get<T>(url, params);
  }

  public post<T>(subUrl: string, data: unknown): Observable<T> {
    const url: string = this.getFullUrl(subUrl);

    return this.http.post<T>(url, data);
  }

  public put<T>(subUrl: string, data: unknown): Observable<T> {
    const url: string = this.getFullUrl(subUrl);

    return this.http.put<T>(url, data);
  }

  public delete<T>(
    subUrl: string,
    data?: { body: Record<string, any> }
  ): Observable<T> {
    const url: string = this.getFullUrl(subUrl);

    return this.http.delete<T>(url, { body: data });
  }

  public getFullUrl(subUrl: string): string {
    return `${this.hostUrl}${subUrl}`;
  }
}
