import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BreweriesComponent } from "./breweries.component";
import { RouterModule } from "@angular/router";
import { breweriesRoutes } from "./breweries.routing";
import { MatTableModule } from "@angular/material/table";
import { SharedModule } from "../../shared/shared.module";

@NgModule({
  declarations: [BreweriesComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatTableModule,
    RouterModule.forChild(breweriesRoutes)
  ],
  providers: []
})
export class BreweriesModule {}
