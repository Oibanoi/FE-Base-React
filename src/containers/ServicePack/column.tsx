import { ColumnsType } from 'antd/es/table';
import { IServicePackItem } from '../../interfaces/servicePack';
import { UnlockOutlined, LockOutlined } from '@ant-design/icons';
import { servicePackServices } from '../../services';
import { notification } from 'antd';
export const getColumns = () => {
  const onLockPack = (id: number, status: number) => {
    servicePackServices.upsertPack({ id: id, status: status }).then(() =>
      notification.success({
        message: 'Thành công',
        description:
          status === 1
            ? 'Mở khóa gói dịch vụ thành công'
            : 'Khóa gói dịch vụ thành công',
      })
    );
  };
  return [
    {
      title: 'ID',
      render: (_, record) => record.id,
    },
    {
      title: 'Tên gói dịch vụ',
      render: (_, record) => record.name,
    },
    {
      title: 'Số ngày',
      render: (_, record) => record.number_of_day,
    },
    {
      title: 'Giá',
      render: (_, record) =>
        `${record.amount} VNĐ`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
    },
    {
      title: 'Trạng thái',
      render: (_, record) =>
        record.status === 1 ? 'Hoạt động' : 'Không hoạt động',
    },
    {
      title: 'Hành động',
      render: (_, record) =>
        record.status === 1 ? (
          <LockOutlined onClick={() => onLockPack(record.id, 2)} />
        ) : (
          <UnlockOutlined onClick={() => onLockPack(record.id, 1)} />
        ),
      width: 100,
    },
  ] as ColumnsType<IServicePackItem>;
};
