/* eslint-disable import/prefer-default-export */
import axios from 'axios';

const API_URL = 'https://api.github.com/repos/ScottGibbons00/cover/commits';

export const getCommits = (term) => {
  return new Promise((resolve, reject) => {
    axios.get(API_URL)
      .then((response) => {
        console.log('resonse', response.data);
        resolve(response.data);
      })
      .catch((error) => {
        console.log(`github api error: ${error}`);
        reject(error);
      });
  });
};
