const encodePassword = (password: string) => {
  const bcrypt = require('../../node_modules/bcryptjs');
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  return bcrypt.hashSync(password, salt);
};

export default {
  encodePassword,
};
