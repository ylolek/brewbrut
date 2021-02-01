import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BreweryComponent } from "./brewery.component";
import { RouterModule } from "@angular/router";
import { BreweryRoutes } from "./brewery.routing";
import { SharedModule } from "../../shared/shared.module";

@NgModule({
  declarations: [BreweryComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(BreweryRoutes)],
  providers: []
})
export class BreweryModule {}
