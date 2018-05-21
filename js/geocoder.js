import { NativeModules } from 'react-native';
import GoogleApi from './googleApi.js';

const { RNGeocoder } = NativeModules;

export default {
  apiKey: null,
  language: 'en',
  onlyGoogle: false,

  fallbackToGoogle(key) {
    this.apiKey = key;
  },

  setLanguage(lang) {
    this.language = lang
  },

  setGoogle(state) {
    this.onlyGoogle = state
  },

  geocodePosition(position) {
    if (!position || !position.lat || !position.lng) {
      return Promise.reject(new Error("invalid position: {lat, lng} required"));
    }

    if (this.setGoogle) {
      if (!this.apiKey) { throw err; }
      return GoogleApi.geocodePosition(this.apiKey, position, this.language);
    } else {
      return RNGeocoder.geocodePosition(position).catch(err => {
        if (!this.apiKey) { throw err; }
        return GoogleApi.geocodePosition(this.apiKey, position, this.language);
      });
    }
  },

  geocodeAddress(address) {
    if (!address) {
      return Promise.reject(new Error("address is null"));
    }

    if (this.setGoogle) {
      return GoogleApi.geocodeAddress(this.apiKey, address, this.language);
    } else {
      return RNGeocoder.geocodeAddress(address).catch(err => {
        if (!this.apiKey) { throw err; }
        return GoogleApi.geocodeAddress(this.apiKey, address, this.language);
      });
    }
  },
}
