

import fetchClient from './fetchClient.js';
import AppConstants from '../appConstants.js';
import BaseApi from './baseApi.js';
//Alt+Shift+O bo het 
class PostApi extends BaseApi {// lay tat ca thuoc tinh BaseApi
  getResourceName() {
    return 'posts';
  }

  //   getAll() {
  //     const url = `${AppConstants.API_URL}/${this.getResourceName()}`;
  //     return fetchClient.get(url);
  //   }

  //   getDetail(postId) {
  //     const url = `${AppConstants.API_URL}/${this.getResourceName()}/${postId}`;
  //     return fetchClient.get(url);
  //   }

  //   add(post) {
  //     const url = `${AppConstants.API_URL}/${this.getResourceName()}`;
  //     return fetchClient.post(url, post);
  //   }

  //   update(post) {
  //     const url = `${AppConstants.API_URL}/${this.getResourceName()}/${post.id}`;
  //     return fetchClient.patch(url, post);
  //   }

  //   remove(postId) {
  //     const url = `${AppConstants.API_URL}/${this.getResourceName()}/${postId}`;
  //     return fetchClient.delete(url);
  //   }
}

const postApi = new PostApi();
export default postApi;
