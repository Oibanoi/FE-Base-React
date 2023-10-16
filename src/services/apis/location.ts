const getLocation = (): Promise<any> => {
  return fetch(
    'https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json'
  ).then(response => response.json());
};

export default {
  getLocation,
};
