import { Routes } from "@angular/router";
import { BreweriesComponent } from "./breweries.component";

export const breweriesRoutes: Routes = [
  {
    path: "",
    pathMatch: "full",
    component: BreweriesComponent
  }
];
