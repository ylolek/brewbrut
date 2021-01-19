import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BreweryComponent } from "./brewery.component";
import { RouterModule } from "@angular/router";
import { BreweryRoutes } from "./brewery.routing";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@NgModule({
  declarations: [BreweryComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    RouterModule.forChild(BreweryRoutes)
  ],
  providers: []
})
export class BreweryModule {}
