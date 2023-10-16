const REAL_ESTATE_TYPE = [
  { value: 0, label: 'Tất cả' },
  { value: 1, label: 'Nhà riêng' },
  { value: 2, label: 'Nhà mặt phố' },
  { value: 3, label: 'Căn hộ chung cư' },
  { value: 4, label: 'Mặt bằng kinh doanh' },
  { value: 5, label: 'Khu nghỉ dưỡng' },
  { value: 6, label: 'Đất nền dự án' },
  { value: 7, label: 'Bất động sản khác' },
];

const TRANSACTION_TYPE = ['Tất cả', 'Bán', 'Cho thuê'];

const REAL_ESTATE_STATUS = [
  'Tất cả',
  'Chờ duyệt',
  'Đã duyệt',
  'Từ chối',
  'Hết hạn',
];

const REAL_ESTATE_STATUS_COLOR = [
  '',
  '#C0C0C0',
  '#00FF00',
  '#FF0000',
  '#FF0000',
];

export default {
  REAL_ESTATE_TYPE,
  TRANSACTION_TYPE,
  REAL_ESTATE_STATUS,
  REAL_ESTATE_STATUS_COLOR,
};
