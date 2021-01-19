import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { RequestService } from "./services/request.service";
import { MatIconModule } from "@angular/material/icon";
import { SharedModule } from "../shared/shared.module";
import { Error404Component } from "./components/error-pages/404/404.component";
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    Error404Component
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    SharedModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent
  ],
  providers: [RequestService]
})
export class CoreModule {}
