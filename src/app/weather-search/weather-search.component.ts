import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs/Subject';

import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-weather-search',
  templateUrl: './weather-search.component.html',
  styleUrls: ['./weather-search.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class WeatherSearchComponent implements OnInit {
  
  private city: string;
  cityName: string;
  private searchStream = new Subject<string>();

  constructor( private _weatherService: WeatherService ) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    this._weatherService.searchWeatherData(form.value.location)
        .subscribe(
          data => {
            this.city = data.name;
            const weatherItem = {
              cityName: data.name,
              description: data.weather[0].description,
              temperature: data.main.temp,
              imgPath: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`
            }
            this._weatherService.addWeatherItem(weatherItem);
          }
        );
    this.cityName = "";
  }

}
