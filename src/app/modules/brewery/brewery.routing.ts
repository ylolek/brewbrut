import { Routes } from "@angular/router";
import { BreweryComponent } from "./brewery.component";

export const BreweryRoutes: Routes = [
  {
    path: "",
    pathMatch: "full",
    component: BreweryComponent
  }
];
