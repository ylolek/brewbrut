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
import { ApiService } from "../core/services/api.service";

@Injectable()
export class BreweriesEffects {
  fetchBreweries$ = createEffect(() =>
    this.actions$.pipe(
      ofType("[API] fetch Breweries"),
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
              type: "[API] retrieved breweries success",
              breweries
            })),
            catchError(error =>
              of({ type: "[API] Breweries Load Error", error })
            )
          );
      })
    )
  );

  fetchBreweryDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType("[Brewery] fetch brewery details"),
      mergeMap((action: any) => {
        return this.apiService.getBrewery(action.breweryId).pipe(
          map(brewery => ({ type: "[API] retrieved brewey success", brewery })),
          catchError(error => of({ type: "[API] Breweries Load Error", error }))
        );
      })
    )
  );

  breweryDetials$ = createEffect(() =>
    this.actions$.pipe(
      ofType("[Brewery] get one brewery details"),
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
                  type: "[Brewery] show one brewery details",
                  breweryId: action.breweryId
                };
              } else {
                return {
                  type: "[Brewery] fetch brewery details",
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
      ofType("[Breweries] prev page of breweries"),
      withLatestFrom(this.store),
      map(([action, s]) => {
        const S = s as any;
        const toPage = Math.max(1, S.brews.page - 1);
        return { type: "[API] fetch Breweries", page: toPage };
      })
    )
  );

  nextPage$ = createEffect(() =>
    this.actions$.pipe(
      ofType("[Breweries] next page of breweries"),
      withLatestFrom(this.store),
      map(([action, s]) => {
        const S = s as any;
        const toPage = Math.min(S.brews.maxPage, S.brews.page + 1);
        return { type: "[API] fetch Breweries", page: toPage };
      })
    )
  );

  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private store: Store
  ) {}
}
