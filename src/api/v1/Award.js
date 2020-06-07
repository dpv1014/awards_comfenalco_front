import axios from 'axios';
//Singleton Class
export default class AwardApi {

  static instance;

  constructor() {
    if(this.instance){
      return this.instance;
    }
    this.END_POINT = process.env.REACT_APP_API_ENDPOINT;
  }

  getAwards = (successCallback, errorCallback) => {
    axios.get(`${this.END_POINT}/api/v1/awards`).then(successCallback).catch(errorCallback);
  }

  getAwardById = (awardId, successCallback, errorCallback) => {
    axios.get(`${this.END_POINT}/api/v1/awards/${awardId}`).then(successCallback).catch(errorCallback);
  }

  createAward = (newAward, successCallback, errorCallback) => {
    axios.post(`${this.END_POINT}/api/v1/awards/`, newAward)
      .then(successCallback)
      .catch(errorCallback);
  }

  updateAward = (newAward, successCallback, errorCallback) => {
    axios.put(`${this.END_POINT}/api/v1/awards/${newAward.id}`, newAward)
      .then(successCallback)
      .catch(errorCallback);
  }
}