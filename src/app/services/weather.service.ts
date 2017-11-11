import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import 'rxjs/Rx';

import { WEATHER_ITEMS } from '../models/weather.data';
import { WeatherItem } from '../models/weather-item';

@Injectable()
export class WeatherService {
    api: string = '9a875e0cf3e8dda8ce1580a33a41bdb3';
    constructor( private _http: Http ) {}

    getWeatherItems() {
        return WEATHER_ITEMS;
    }

    addWeatherItem(weatherItem: WeatherItem) {
        WEATHER_ITEMS.push(weatherItem);
    }

    // searchWeatherData(cityName: string): Observable<any> {
    //     return this._http.get(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${this.api}&units=metric`)
    //     .map(response => response.json())
    //     .catch(error => {
    //         console.log(error);
    //         return Observable.throw(error.json())
    //     });
    // }

    searchWeatherData(cityName: string) {
        return this._http.get(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${this.api}&units=metric`)
            .map(response => response.json());
    }

    clearWeatherItems() {
        WEATHER_ITEMS.splice(0);
    }

}