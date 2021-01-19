import { Routes } from "@angular/router";
import { Error404Component } from "./core/components/error-pages/404/404.component";

export const AppRoutes: Routes = [
  {
    path: "breweries",
    loadChildren: () =>
      import("./modules/breweries/breweries.module").then(
        m => m.BreweriesModule
      )
  },
  {
    path: "brewery/:id",
    loadChildren: () =>
      import("./modules/brewery/brewery.module").then(m => m.BreweryModule)
  },
  {
    path: "",
    pathMatch: "full",
    redirectTo: "breweries"
  },
  {
    path: "404",
    component: Error404Component
  },
  {
    path: "**",
    redirectTo: "404"
  }
];
