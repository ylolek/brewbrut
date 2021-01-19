import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable, Subject } from "rxjs";
import { debounceTime, map, startWith, takeUntil } from "rxjs/operators";
import { ApiService } from "../../core/services/api.service";

@Component({
  selector: "app-autocomplete",
  templateUrl: "./autocomplete.component.html",
  styleUrls: ["./autocomplete.component.scss"]
})
export class  AutoCompleteComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>()
  breweriesACForm: FormGroup;
  options: string[] = [];
  hasResults = true;
  isLoadingResults = false;
  filteredOptions$: Observable<any[]>;

  private fetchResults(query: string): void {
    if (this.isLoadingResults) {
      return;
    }

    this.isLoadingResults = true;
    this.filteredOptions$ = this.apiService.autocomplete(query).pipe(
      takeUntil(this.destroy$),
      map((results) => {
        this.isLoadingResults = false;
        this.hasResults = !!results.length;
        return results.slice(0, Math.min(results.length, 5));
      })
    );
  }

  constructor(
    private formBuilder : FormBuilder,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.breweriesACForm = this.formBuilder.group({
      query: [''],
    });

    this.breweriesACForm.valueChanges.pipe(
      startWith(''),
      debounceTime(250),
      takeUntil(this.destroy$),
    ).subscribe((value) => {
      if (!!value && !!value.query) {
        this.fetchResults(value.query.trim());
      }
    });
  }

  brewerySelected(event): void {
    if (!!event.option.value) {
      this.breweriesACForm.reset();
      this.router.navigate(["brewery", +event.option.value]);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
