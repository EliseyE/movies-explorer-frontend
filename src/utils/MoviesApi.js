//  beatfilm-movies API

import { BEATFILM_MOVIES_BASE_URL_API } from "../appConfig";

class BeatfilmMoviesApi {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
  }

  async _responceProcessing(res) {
      if(res.ok) {
        const resData = await res.json();
        return resData;
      }
      return Promise.reject(res);
    }

  async _downloadData(path) {
      const requset = await fetch(`${this._baseUrl}${path}` );
      const resData = await this._responceProcessing(requset);
      return resData;
  }

  getInitialCards() {
    return this._downloadData('/beatfilm-movies');
  }
};

const beatfilmMoviesApiModule = new BeatfilmMoviesApi(BEATFILM_MOVIES_BASE_URL_API);

export {
  beatfilmMoviesApiModule
};
