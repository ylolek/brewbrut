import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { fetchBreweries } from "./state/breweries.actions";
import { AppState } from "./state/app.state";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  title = "brewBrut";

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(
      fetchBreweries({
        page: 1,
        perPage: 25,
        sort: "name"
      })
    );
  }
}
