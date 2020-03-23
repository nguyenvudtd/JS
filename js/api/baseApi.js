import fetchClient from './fetchClient.js';
import AppConstants from '../appConstants.js';

export default class BaseApi {
  getResourceName() {
    throw new Error('Please implement this method');
  }

  getAll() {
    const url = `${AppConstants.API_URL}/${this.getResourceName()}?_limit=10&_page=1`;//=posts or...
    // console.log(url)
    return fetchClient.get(url);
  }
  getPage(page) {
    //?_limit=10&_page=1
    const url = `${AppConstants.API_URL}/${this.getResourceName()}${page}`;//=posts or...
    console.log(url)
    return fetchClient.get(url);
  }
  getDetail(id) {
    const url = `${AppConstants.API_URL}/${this.getResourceName()}/${id}`;
    return fetchClient.get(url);
  }

  add(payload) {
    const url = `${AppConstants.API_URL}/${this.getResourceName()}`;
    console.log(url)
    return fetchClient.post(url, payload);
  }

  update(payload) {
    const url = `${AppConstants.API_URL}/${this.getResourceName()}/${payload.id}`;
    console.log(url)
    return fetchClient.patch(url, payload);
  }

  remove(id) {
    const url = `${AppConstants.API_URL}/${this.getResourceName()}/${id}`;
    return fetchClient.delete(url);
  }
}
