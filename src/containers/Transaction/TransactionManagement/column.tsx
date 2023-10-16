import { ColumnsType } from 'antd/es/table';
import { transactionConstants } from '../../../constants';
import { ITransactionItem } from '../../../interfaces/transactions';
import { Button, notification, Space, Tag } from 'antd';
import { transactionServices } from '../../../services';

const { TYPE, STATUS, COLOR_STATUS } = transactionConstants;

const onAccept = (id: number, status: number) => {
  transactionServices.upsertTransaction({ id: id, status: status }).then(() =>
    notification.success({
      message: 'Thành công',
      description: 'Duyệt giao dịch thành công',
    })
  );
};
export const columns = [
  {
    title: 'ID',
    render: (_, record) => record.id,
  },
  {
    title: 'Người giao dịch',
    render: (_, record) => `${record.user_name} - ${record.user_email}`,
  },
  {
    title: 'Loại giao dịch',
    render: (_, record) => TYPE[record.type],
  },
  {
    title: 'Số tiền',
    render: (_, record) =>
      `${record.amount} VNĐ`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
  },
  {
    title: 'Trạng thái',
    render: (_, record) => (
      <Tag color={COLOR_STATUS[record.status]}>{STATUS[record.status]}</Tag>
    ),
  },
  {
    title: 'Hành động',
    render: (_, record) =>
      record.status === 3 && (
        <Space>
          <Button type={'primary'} onClick={() => onAccept(record.id, 1)}>
            Xác nhận
          </Button>
          <Button
            type={'primary'}
            danger
            onClick={() => onAccept(record.id, 2)}
          >
            Hủy
          </Button>
        </Space>
      ),
    width: 100,
  },
] as ColumnsType<ITransactionItem>;
