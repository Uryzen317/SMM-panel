import { Component, Input } from "@angular/core";

@Component({
  selector: "app-button",
  templateUrl: "./button.component.html",
})
export class ButtonComponent {
  @Input("text") text: string = "Click !";
  @Input("type") type: string = "button";
  @Input("theme") theme: string = "0";
}
