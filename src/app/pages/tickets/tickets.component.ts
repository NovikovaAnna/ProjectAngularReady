import { Component, OnInit } from '@angular/core';
import {IMenuType} from "../../models/menuType";
import {Subscription} from "rxjs";
import {ITourTypeSelect} from "../../models/tours";
import {TicketService} from "../../services/tickets/ticket.service";

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit {
  selectedType: IMenuType;
  private tourUnsubscriber: Subscription; // создан tourUnsubscriber: Subscription

  constructor(private ticketService: TicketService) { }

  ngOnInit(): void {

    this.tourUnsubscriber = this.ticketService.getTicketTypeObservable().subscribe((data:ITourTypeSelect) =>
    {console.log('data', data) });
  }

  updateSelectedType(ev: IMenuType): void {
    this.selectedType = ev;
  }


}
