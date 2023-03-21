import axiosClient, {axiosClientPrivate} from './axiosClient';

const url = '/topics';
const topicApi = {
  getTopics: () => {
    return axiosClientPrivate.get(url);
  },
  searchTopics: q => axiosClient.get(`${url}/search?q=${q}`),
  getRandomTopics: () => axiosClient.get(`${url}/random`),
  getRecommendTopics: () => axiosClientPrivate.get(`${url}/recommend`),
  getTopicDetail: slug => axiosClient.get(`${url}/${slug}`),
};

export const {
  getTopics,
  searchTopics,
  getRecommendTopics,
  getRandomTopics,
  getTopicDetail,
} = topicApi;
