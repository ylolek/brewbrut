import { Injectable } from "@angular/core";
import { RequestService } from "./request.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ApiService {
  constructor(private requestService: RequestService) {}

  public getBreweries(queryParams?: any): Observable<any> {
    const queryString = !!queryParams
      ? "?" +
        Object.keys(queryParams)
          .map(key => key + "=" + queryParams[key])
          .join("&")
      : "";
    return this.requestService.get("breweries" + queryString);
  }

  public getBrewery(breweryId: number): Observable<any> {
    return this.requestService.get("breweries/" + breweryId);
  }
}
