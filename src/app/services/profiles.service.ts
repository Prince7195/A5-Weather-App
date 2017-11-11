import { Profile } from '../models/profile';
import { Subject } from 'rxjs/Rx';

export class ProfileService {
    sendProfiles = new Subject<any>();
    private profiles: Array<Profile> = [
        {
            profileName: "Default Profile",
            cities: ["New York", "London", "Chennai"]
        }
    ]; 

    saveNewProfile(cities: Array<string>) {
        let profileName = `Profile ${this.profiles.length}`;
        let profile = {
            profileName,
            cities
        };
        this.profiles.push(profile);
        this.sendProfiles.next(this.profiles.slice());
    }

    getProfiles() {
        return this.profiles.slice();
    }

    deleteProfile(profile: Profile) {
        this.profiles.splice(this.profiles.indexOf(profile), 1);
        this.sendProfiles.next(this.profiles.slice());
    }

}