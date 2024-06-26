import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { IMenuType } from "../../../models/menuType";
import { ITourTypeSelect } from "../../../models/tours";
import { Event } from "@angular/router";
import { TicketService } from "../../../services/tickets/ticket.service";
import { SettingService } from "../../../services/setting/setting.service";

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})
export class AsideComponent implements OnInit {
  menuTypes: IMenuType[];
  selectedMenuType: IMenuType;
  @Output() updateMenuType: EventEmitter<IMenuType> = new EventEmitter<IMenuType>();

  // Календарь
  private ticketService: TicketService;

  // Создание в настройках
  tourTypes: ITourTypeSelect[] = [
    {label: 'Все', value: 'all'},
    {label: 'Одиночный', value: 'single'},
    {label: 'Групповой', value: 'multi'}
  ];

  constructor(private _settingsService: SettingService, ticketService: TicketService) {
    this.ticketService = ticketService;
  }

  ngOnInit(): void {
    this.menuTypes = [
      {type: 'custom', label : 'Обычное'},
      {type: 'extended', label : 'Расширенное'}
    ];
  }

  changeType(ev: { ev: Event, value: IMenuType }): void {
    console.log('ev', ev);
    this.updateMenuType.emit(ev.value);
  }

  // Все, одиночный и групповой - настройки
  changeTourType(ev: { ev: Event, value: ITourTypeSelect }): void {
    this.ticketService.updateTour(ev.value);
  }

  selectDate(ev: string): void {
    console.log('ev', ev);
    this.ticketService.updateTour({date: ev});
  }

  initRestError(): void {
    // Заменяем вызов метода getError на существующий метод
    console.error('Method getError is not implemented in TicketService');
  }

  initSettingsData(): void {
    this._settingsService.loadUserSettingsSubject({
      saveToken: false
    });
  }
}
