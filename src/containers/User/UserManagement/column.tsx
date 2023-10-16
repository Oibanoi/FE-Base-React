import { ColumnsType } from 'antd/es/table';
import { IUserDetail } from 'interfaces/user';
import { Button, notification } from 'antd';
import React from 'react';
import { userServices } from 'services';

export const getColumns = ({
  history,
  resetId,
  setResetId,
}: {
  history: any;
  resetId?: number;
  setResetId: (resetId?: number) => void;
}) => {
  const onResetPassword = (user_id: number) => {
    setResetId(user_id);
    userServices.resetPassword(user_id).then(() => {
      notification.success({
        message: 'Thành công',
        description: 'Đặt lại mật khẩu thành công',
      });
      setResetId(undefined);
    });
    setResetId(undefined);
  };

  return [
    {
      title: 'Mã tài khoản',
      render: (_, record) => record.id,
    },
    {
      title: 'Tên tài khoản',
      render: (_, record) => record.username,
    },
    {
      title: 'Họ và tên',
      render: (_, record) => record.full_name,
    },
    {
      title: 'Số điện thoại',
      render: (_, record) => record.phone_number,
    },
    {
      title: 'Email',
      render: (_, record) => record.email,
    },
    {
      title: 'Chức danh',
      render: (_, record) =>
        record.role === 1
          ? 'Người dùng'
          : record.role === 2
          ? 'Nhân viên'
          : 'Quản trị viên',
    },
    {
      title: 'Trạng thái',
      render: (_, record) => (record.is_active ? 'Hoạt động' : 'Khóa'),
    },
    {
      title: 'Hành động',
      render: (_, record) => (
        <Button
          type={'primary'}
          danger
          onClick={() => onResetPassword(record.id)}
          loading={record.id === resetId}
        >
          Đặt lại mật khẩu
        </Button>
      ),
    },
  ] as ColumnsType<IUserDetail>;
};
