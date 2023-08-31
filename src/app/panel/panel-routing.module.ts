import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PanelComponent } from "./panel.component";

const routes: Routes = [
  {
    path: "panel",
    children: [
      { path: "", component: PanelComponent },
      { path: ":opt", component: PanelComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PanelRoutingModule {}
