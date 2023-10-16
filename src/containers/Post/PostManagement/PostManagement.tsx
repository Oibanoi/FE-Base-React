import React, { useEffect } from 'react';
import AppContainer from '../../AppLayout/AppContainer';
import SearchPosts from 'containers/Post/PostManagement/SearchParams/SearchPosts';
import { useHistory } from 'react-router-dom';
import { postHooks } from '../../../hooks';
import { getColumns } from './column';
import { Card, Table } from 'antd';
import { commonConstants } from 'constants/index';

const { DEFAULT_SIZE_CHANGER } = commonConstants;

const PostManagement: React.FC = () => {
  const history = useHistory();

  const { isGetPosts, posts, getPosts } = postHooks.usePost();

  const columns = getColumns({ history });

  useEffect(() => {
    getPosts({ page: 1 }).then();
  }, []);

  return (
    <AppContainer title={'Quản lý bài viết'}>
      <SearchPosts getList={getPosts} isGetList={isGetPosts} />
      <Card className="mt-base">
        <div>Tổng số bản ghi: {posts.length}</div>
        <Table
          className="mt-base"
          columns={columns}
          dataSource={posts}
          loading={isGetPosts}
          rowKey="id"
          pagination={DEFAULT_SIZE_CHANGER}
        />
      </Card>
    </AppContainer>
  );
};

export default PostManagement;
