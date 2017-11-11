import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { ProfileService } from '../services/profiles.service';
import { Profile } from '../models/profile';
import { WeatherService } from '../services/weather.service';
import { EventManager } from '@angular/platform-browser/src/dom/events/event_manager';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SideBarComponent implements OnInit {

  profiles: Array<Profile>;

  constructor( private _profileService: ProfileService, private _weatherService: WeatherService ) { }

  ngOnInit() {
    this.profiles = this._profileService.getProfiles();
    this._profileService.sendProfiles.subscribe(
      profiles => this.profiles = profiles
    );
  }

  onSaveNew() {
    let cities = this._weatherService.getWeatherItems().map(
      element => {
        return element.cityName;
      }
    );
    this._profileService.saveNewProfile(cities);
  }

  onLoadProfile(profile: Profile) {
    this._weatherService.clearWeatherItems();
    for(let i = 0; i < profile.cities.length; i++) {
        this._weatherService.searchWeatherData(profile.cities[i])
        .retry()
        .subscribe(
          data => {
            const weatherItem = {
              cityName: data.name,
              description: data.weather[0].description,
              temperature: data.main.temp,
              imgPath: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`
            }
            this._weatherService.addWeatherItem(weatherItem);
          }
        );
    }
  }

  onDeleteProfile(event, profile: Profile) {
    event.stopPropagation();
    this._profileService.deleteProfile(profile);
  }

}
