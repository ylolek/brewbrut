import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, timeout, tap } from "rxjs/operators";
import { IHttpOptions } from "../definitions/http.definitions";
import { environment } from "../../../environments/environment.prod";
import { makeStateKey, TransferState } from "@angular/platform-browser";

@Injectable()
export class RequestService {
  private apiUrl: string;
  private timeout = 30 * 1000; // mennyi idő után timeout-oljon, ha a lekérésre nem jön válasz (ms)

  constructor(private http: HttpClient, private transferState: TransferState) {
    this.apiUrl = this.getApiUrl();
  }

  get(subUrl: string, options?: IHttpOptions): Observable<any> {
    const url = this.resolveUrl(subUrl);
    const TRANSFERSTATE_KEY = makeStateKey<any>(`GET_${url}`);
    return this.http.get(url, options).pipe(
      timeout(this.timeout),
      catchError(err => {
        console.error(`GET: ${url}: `, err);
        return throwError(err);
      }),
      tap(response => {
        this.transferState.set(TRANSFERSTATE_KEY, response);
      })
    );
  }

  private getApiUrl(): string {
    if (typeof environment.apiUrl === "string") {
      return environment.apiUrl;
    } else {
      return "";
    }
  }

  private resolveUrl(url: string): string {
    const absoluteUrlPattetn = /^https?:\/\//i;

    if (absoluteUrlPattetn.test(url)) {
      return url;
    }

    // Ha böngésző oldali a hívás és abszolút apiUrl van megadva, meg kell vizsgálni hogy az apiUrl protokollja
    // megegyezik-e a weboldal protokolljával és ha nem, akkor ehhez igazítani az apiUrl-t
    let apiUrl = this.apiUrl;
    if (absoluteUrlPattetn.test(this.apiUrl)) {
      apiUrl = this.matchClientApiUrlWithWebsiteProtocol(absoluteUrlPattetn);
    }

    if (url.indexOf("/") === 0) {
      const subUrl = url.slice(1, url.length);
      return `${apiUrl}/${subUrl}`;
    }
    return `${apiUrl}/${url}`;
  }

  // Ha a böngésző oldali API url protokollja nem egyezik meg a weboldal protokolljával, akkor használja a
  // weboldal protokollját
  private matchClientApiUrlWithWebsiteProtocol(
    absoluteUrlPattern: RegExp
  ): string {
    const websiteProtocol = `${document.location.protocol}//`;
    const clientApiUrlProtocol =
      this.apiUrl.match(absoluteUrlPattern) &&
      this.apiUrl.match(absoluteUrlPattern)[0];

    const clientApiUrl =
      websiteProtocol !== clientApiUrlProtocol
        ? this.apiUrl.replace(clientApiUrlProtocol, websiteProtocol)
        : this.apiUrl;

    return clientApiUrl;
  }
}
