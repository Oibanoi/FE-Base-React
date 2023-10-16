import { useState } from 'react';
import { IGetPostsReq, IPostItem } from 'interfaces/post';
import { postServices } from 'services';
import { use } from 'i18next';

const usePost = () => {
  const [isGetPosts, setIsGetPosts] = useState<boolean>(false);
  const [isGetPostDetail, setIsGetPostDetail] = useState<boolean>(false);

  const [posts, setPosts] = useState<IPostItem[]>([]);
  const [post, setPost] = useState<IPostItem>();

  const getPosts = async (params: IGetPostsReq) => {
    try {
      setIsGetPosts(true);
      const res = await postServices.getPosts({ ...params, page_size: 1000 });
      if (res.items) {
        setPosts(res.items);
      }
    } finally {
      setIsGetPosts(false);
    }
  };

  const getPostDetail = async (postId: number) => {
    try {
      setIsGetPostDetail(true);
      const res = await postServices.getPostDetail(postId);
      setPost(res);
    } finally {
      setIsGetPostDetail(false);
    }
  };

  return {
    isGetPosts,
    posts,
    getPosts,
    isGetPostDetail,
    post,
    getPostDetail,
  };
};

export default {
  usePost,
};
