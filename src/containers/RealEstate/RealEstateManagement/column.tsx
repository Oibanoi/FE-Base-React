import { ColumnsType } from 'antd/es/table';
import { IRealEstateItem } from 'interfaces/realEstate';
import { realEstateConstants } from '../../../constants';
import { Button } from 'antd';

const {
  TRANSACTION_TYPE,
  REAL_ESTATE_TYPE,
  REAL_ESTATE_STATUS,
} = realEstateConstants;

export const getColumns = ({
  history,
  getList,
}: {
  history: any;
  getList: any;
}) => {
  return [
    {
      title: 'ID',
      render: (_, record) => (
        <Button
          type={'text'}
          onClick={() => history.push(`/real-estate/${record.id}`)}
          style={{ color: 'blue' }}
        >
          {record.id}
        </Button>
      ),
    },
    {
      title: 'Tiêu đề',
      render: (_, record) => record.title,
    },
    {
      title: 'Loại giao dịch',
      render: (_, record) => TRANSACTION_TYPE[record.transaction_type],
    },
    {
      title: 'Loại bất động sản',
      render: (_, record) =>
        REAL_ESTATE_TYPE.find(({ value }) => record.type === value)?.label,
    },
    {
      title: 'Địa chỉ',
      render: (_, record) =>
        `${record.address}, ${record.ward}, ${record.district}, ${record.province}`,
    },
    {
      title: 'Giá bất động sản',
      render: (_, record) =>
        `${record.price} VNĐ`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
    },
    {
      title: 'Trạng thái',
      render: (_, record) => REAL_ESTATE_STATUS[record.status],
    },
  ] as ColumnsType<IRealEstateItem>;
};
