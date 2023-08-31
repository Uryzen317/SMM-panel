import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { InputComponent } from "./input/input.component";
import { ButtonComponent } from "./button/button.component";
import { PopupComponent } from "./popup/popup.component";

@NgModule({
  declarations: [InputComponent, ButtonComponent, PopupComponent],
  imports: [CommonModule],
  exports: [InputComponent, ButtonComponent, PopupComponent],
})
export class SharedModule {}
