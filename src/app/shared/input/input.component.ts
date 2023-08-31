import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-input",
  templateUrl: "./input.component.html",
})
export class InputComponent {
  @Input("type") type: string = "text";
  @Input("placeholder") placeholder: String | string = new String();
  @Input("name") name!: string;
  @Input("formControlName") formControlName!: string;
  @Input("theme") theme: string = "1";
  @Input("value") value: string = "";

  @Output("changeHandler") changeHandler: EventEmitter<string | boolean> =
    new EventEmitter<string | boolean>();

  onChange(value: string | boolean): void {
    this.changeHandler.emit(value);
  }
}
