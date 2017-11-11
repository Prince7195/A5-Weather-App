import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';

import { WeatherItem } from '../models/weather-item';

@Component({
  selector: 'app-weather-item',
  templateUrl: './weather-item.component.html',
  styleUrls: ['./weather-item.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class WeatherItemComponent implements OnInit {

  @Input('w-item') weatherItem: WeatherItem;

  constructor() { }

  ngOnInit() {
  }

}
