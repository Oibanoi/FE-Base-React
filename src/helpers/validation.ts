const phoneValidator = new Array<object>({
  pattern: /^(\+84|0)\d{9}$/,
  message: 'Số điện thoại không đúng định dạng',
});

const emailValidator = new Array<object>({
  type: 'email',
  message: 'Email không đúng định dạng',
});

export default {
  phoneValidator,
  emailValidator,
};
