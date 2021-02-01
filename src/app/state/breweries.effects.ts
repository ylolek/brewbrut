import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { of } from "rxjs";
import {
  map,
  mergeMap,
  switchMap,
  withLatestFrom,
  catchError
} from "rxjs/operators";
import {
  fetchBreweries,
  retrievedBreweries,
  fetchBreweryDetails,
  getBreweryDetails,
  showBreweryDetails,
  prevPage,
  nextPage,
  fetchError
} from "./breweries.actions";
import { ApiService } from "../core/services/api.service";

@Injectable()
export class BreweriesEffects {
  fetchBreweries$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchBreweries),
      withLatestFrom(this.store),
      mergeMap(([action, s]) => {
        const ACTION = action as any;
        const S = s as any;
        return this.apiService
          .getBreweries({
            page: ACTION.page,
            per_page: !!ACTION.perPage ? ACTION.perPage : S.brews.perPage,
            sort: !!ACTION.sort ? ACTION.sort : S.brews.sort
          })
          .pipe(
            map(breweries => ({
              type: retrievedBreweries.type,
              breweries
            })),
            catchError(error => of({ type: fetchError.type, error }))
          );
      })
    )
  );

  fetchBreweryDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchBreweryDetails),
      mergeMap((action: any) => {
        return this.apiService.getBrewery(action.breweryId).pipe(
          map(brewery => ({ type: retrievedBreweries.type, brewery })),
          catchError(error => of({ type: fetchError.type, error }))
        );
      })
    )
  );

  breweryDetials$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getBreweryDetails),
      switchMap((action: any) => {
        return this.store
          .select((s: any) => s.brews.breweries)
          .pipe(
            map(breweries => {
              const breweryIndex = breweries
                .map(brewery => brewery.id)
                .indexOf(action.breweryId);
              if (breweryIndex !== -1) {
                return {
                  type: showBreweryDetails.type,
                  breweryId: action.breweryId
                };
              } else {
                return {
                  type: fetchBreweryDetails.type,
                  breweryId: action.breweryId
                };
              }
            })
          );
      })
    )
  );

  prevPage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(prevPage),
      withLatestFrom(this.store),
      map(([action, s]) => {
        const S = s as any;
        const toPage = Math.max(1, S.brews.page - 1);
        return { type: fetchBreweries.type, page: toPage };
      })
    )
  );

  nextPage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(nextPage),
      withLatestFrom(this.store),
      map(([action, s]) => {
        const S = s as any;
        const toPage = Math.min(S.brews.maxPage, S.brews.page + 1);
        return { type: fetchBreweries.type, page: toPage };
      })
    )
  );

  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private store: Store
  ) {}
}
