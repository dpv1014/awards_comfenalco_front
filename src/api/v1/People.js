import axios from 'axios';
//Singleton Class
export default class PeopleApi {
  static instance;
  constructor() {
    if(this.instance){
      return this.instance;
    }
    this.END_POINT = process.env.REACT_APP_API_ENDPOINT;
  }

  getPeople = (successCallback, errorCallback) => {
    axios.get(`${this.END_POINT}/api/v1/people`).then(successCallback).catch(errorCallback);
  }

  getPeopleById = (peopleId, successCallback, errorCallback) => {
    axios.get(`${this.END_POINT}/api/v1/people/${peopleId}`).then(successCallback).catch(errorCallback);
  }

  createPeople = (newPeople, successCallback, errorCallback) => {
    axios.post(`${this.END_POINT}/api/v1/people/`, newPeople)
      .then(successCallback)
      .catch(errorCallback);
  }

  updatePeople = (newPeople, successCallback, errorCallback) => {
    axios.put(`${this.END_POINT}/api/v1/people/${newPeople.id}`, newPeople)
      .then(successCallback)
      .catch(errorCallback);
  }

  destroyPeopleById = (destroyPeople, successCallback, errorCallback) => {
    axios.delete(`${this.END_POINT}/api/v1/people/${destroyPeople}`, {})
      .then(successCallback)
      .catch(errorCallback);
  }

  peopleAssignAwards = (successCallback, errorCallback) => {
    axios.post(`${this.END_POINT}/api/v1/people/assignAwards`, {})
      .then(successCallback)
      .catch(errorCallback);
  }
}