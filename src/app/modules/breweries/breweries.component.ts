import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subject, Observable } from "rxjs";
import { takeUntil, map, delay } from "rxjs/operators";
import { AppState } from "../../state/app.state";
import {
  breweriesFilter,
  prevPage,
  nextPage
} from "../../state/breweries.actions";
import { Router } from "@angular/router";
import { IBrewery } from "../../definitions/brewery.definition";

@Component({
  selector: "app-breweries",
  templateUrl: "./breweries.component.html",
  styleUrls: ["./breweries.component.scss"]
})
export class BreweriesComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  breweries$: Observable<any>;
  filter$: Observable<any>;
  displayedColumns: string[] = ["name", "type", "city", "state", "country"];
  isLoadingResults = false;
  prevBtnDisabled = false;
  nextBtnDisabled = false;

  constructor(private router: Router, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.breweries$ = this.store
      .select(s => s.brews)
      .pipe(
        // not very elegant fix for isLoadingResults. fix me
        // (NG0100: ExpressionChangedAfterItHasBeenCheckedError:
        // Expression has changed after it was checked. Previous value: 'false'. Current value: 'true'.)
        delay(0),
        map((brews: any) => {
          this.isLoadingResults = brews.loading;
          this.prevBtnDisabled = brews.page <= 1 ? true : false;
          this.nextBtnDisabled = brews.page >= brews.maxPage ? true : false;

          return this.filterBrews(brews.filter, brews.breweries);
        }),
        takeUntil(this.destroy$)
      );

    this.filter$ = this.store
      .select(s => s.brews.filter)
      .pipe(takeUntil(this.destroy$));
  }

  onFilterBrews(event): void {
    const filterValue = event.target.value.trim();
    this.store.dispatch(breweriesFilter({ filter: filterValue }));
  }

  filterBrews(filter: string, breweries: Array<IBrewery>): Array<IBrewery> {
    const filterValue = filter.trim();
    const filteredBreweries = [];
    breweries.forEach(brewery => {
      if (
        (!!brewery.name &&
          brewery.name.toLowerCase().indexOf(filterValue) !== -1) ||
        (!!brewery.brewery_type &&
          brewery.brewery_type.toLowerCase().indexOf(filterValue) !== -1) ||
        (!!brewery.city &&
          brewery.city.toLowerCase().indexOf(filterValue) !== -1) ||
        (!!brewery.state &&
          brewery.state.toLowerCase().indexOf(filterValue) !== -1) ||
        (!!brewery.country &&
          brewery.country.toLowerCase().indexOf(filterValue) !== -1)
      ) {
        filteredBreweries.push(brewery);
      }
    });

    return filteredBreweries;
  }

  breweryDetails(breweryId: number): void {
    this.router.navigate(["brewery", breweryId]);
  }

  prevPage(): void {
    this.store.dispatch(prevPage());
  }

  nextPage(): void {
    this.store.dispatch(nextPage());
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
