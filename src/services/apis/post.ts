import { requestServices } from 'services/index';
import { getData } from 'helpers/request';
import { IGetPostsReq, IGetPostsResp, IPostItem } from 'interfaces/post';

const { baseClient } = requestServices;

const getPosts = (params: IGetPostsReq): Promise<IGetPostsResp> => {
  return baseClient.get('/posts', { params: params }).then(getData);
};

const getPostDetail = (postId: number): Promise<IPostItem> => {
  return baseClient.get(`/posts/${postId}`).then(getData);
};

const approvePost = (
  status: number,
  id?: number,
  reason_reject?: string
): Promise<{ id: number }> => {
  return baseClient
    .put(`/posts/${id}/approve`, {
      status: status,
      reason_reject: reason_reject,
    })
    .then(getData);
};

export default {
  getPosts,
  getPostDetail,
  approvePost,
};
