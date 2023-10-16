import { ColumnsType } from 'antd/es/table';
import { postConstants } from '../../../constants';
import { Button } from 'antd';
import { IPostItem } from 'interfaces/post';

const { POST_STATUS } = postConstants;

export const getColumns = ({ history }: { history: any }) => {
  return [
    {
      title: 'ID',
      render: (_, record) => (
        <Button
          type={'text'}
          onClick={() => history.push(`/post/${record.id}`)}
          style={{ color: 'blue' }}
        >
          {record.id}
        </Button>
      ),
    },
    {
      title: 'Người đăng',
      render: (_, record) => `${record.user_full_name} - ${record.user_email}`,
    },
    {
      title: 'Tiêu đề',
      render: (_, record) => record.title,
    },
    {
      title: 'Trạng thái',
      render: (_, record) => POST_STATUS[record.status],
    },
  ] as ColumnsType<IPostItem>;
};
