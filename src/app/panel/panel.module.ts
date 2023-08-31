import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PanelComponent } from "./panel.component";
import { PanelRoutingModule } from "./panel-routing.module";
import { AccountComponent } from "./account/account.component";
import { SharedModule } from "../shared/shared.module";
import { ServicesComponent } from "./services/services.component";
import { OrdersComponent } from './orders/orders.component';
import { FaqComponent } from './faq/faq.component';
import { FeedComponent } from './feed/feed.component';
import { SupportComponent } from './support/support.component';
import { ChargeComponent } from './charge/charge.component';

@NgModule({
  declarations: [PanelComponent, AccountComponent, ServicesComponent, OrdersComponent, FaqComponent, FeedComponent, SupportComponent, ChargeComponent],
  imports: [CommonModule, PanelRoutingModule, SharedModule],
})
export class PanelModule {}
