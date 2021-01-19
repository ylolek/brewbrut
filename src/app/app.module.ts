import {
  BrowserModule,
  BrowserTransferStateModule
} from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AppRoutes } from "./app.routing";
import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { CoreModule } from "./core/core.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { reducers } from "./state/app.state";
import { BreweriesEffects } from "./state/breweries.effects";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserTransferStateModule,
    HttpClientModule,
    CoreModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes),
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([BreweriesEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
