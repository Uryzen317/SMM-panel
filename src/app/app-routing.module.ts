import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./auth/auth.component";
import { IndexComponent } from "./index/index.component";

const routes: Routes = [
  { path: "", component: IndexComponent },
  { path: "auth", component: AuthComponent },
  { path: "auth/:opt", component: AuthComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
