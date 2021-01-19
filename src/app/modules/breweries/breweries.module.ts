import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BreweriesComponent } from "./breweries.component";
import { RouterModule } from "@angular/router";
import { breweriesRoutes } from "./breweries.routing";
import { MatTableModule } from "@angular/material/table";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";

@NgModule({
  declarations: [BreweriesComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    RouterModule.forChild(breweriesRoutes)
  ],
  providers: []
})
export class BreweriesModule {}
