import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { WeatherItem } from '../models/weather-item';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-weather-list',
  templateUrl: './weather-list.component.html',
  styleUrls: ['./weather-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class WeatherListComponent implements OnInit {

  weatherItems: Array<WeatherItem>;

  constructor( private _weatherService: WeatherService ) { }

  ngOnInit() {
    this.weatherItems = this._weatherService.getWeatherItems();
  }

}
