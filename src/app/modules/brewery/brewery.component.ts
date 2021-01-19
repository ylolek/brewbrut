import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, Subject } from "rxjs";
import { takeUntil, map, delay } from "rxjs/operators";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";
import { getBreweryDetails } from "../../state/breweries.actions";
import { AppState } from "../../state/app.state";

@Component({
  selector: "app-brewery",
  templateUrl: "./brewery.component.html",
  styleUrls: ["./brewery.component.scss"]
})
export class BreweryComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  breweries$: Observable<any>;
  breweryId: number;
  isLoadingResults = true;

  constructor(private route: ActivatedRoute, private router: Router, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.route.params.pipe(
      takeUntil(this.destroy$)
    ).subscribe((params) => {
      if (!!params.id) {
        this.breweryId = +params.id;
        this.store.dispatch(getBreweryDetails({ breweryId: this.breweryId }));
      }
    });

    this.breweries$ = this.store
      .select(s => s.brews)
      .pipe(
        // not very elegant fix for isLoadingResults. fix me
        // (NG0100: ExpressionChangedAfterItHasBeenCheckedError:
        // Expression has changed after it was checked. Previous value: 'false'. Current value: 'true'.)
        delay(0),
        map((brews: any) => {
          this.isLoadingResults = brews.loading;

          if (!!brews.error && !!brews.error.status) {
            this.router.navigate(['404']);
          } else {
            return brews.selected;
          }
        }),
        takeUntil(this.destroy$)
      );
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
