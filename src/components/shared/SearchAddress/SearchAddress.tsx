import React, { useEffect, useState } from 'react';
import { Col, FormInstance, Select, Form } from 'antd';

const { Item } = Form;

export interface ISearchAddress {
  form: FormInstance;
  location: any;
}

const SearchAddress = ({ form, location }: ISearchAddress) => {
  const [province, setProvince] = useState<number>();
  const [district, setDistrict] = useState<number>();

  const [optionDistrict, setOptionDistrict] = useState<any[]>([]);
  const [optionWard, setOptionWard] = useState<any[]>([]);

  useEffect(() => {
    let options: any[] = [];
    if (province !== undefined) {
      location[province].Districts.forEach((district: any, index: any) => {
        options.push({
          label: district.Name,
          value: district.Name,
          key: index,
        });
      });
    }
    setOptionDistrict(options);
  }, [province]);

  useEffect(() => {
    let options: any[] = [];
    if (district !== undefined && province !== undefined) {
      location[province].Districts[district].Wards.forEach(
        (ward: any, index: any) => {
          options.push({
            label: ward.Name,
            value: ward.Name,
            key: index,
          });
        }
      );
    }
    setOptionWard(options);
  }, [district]);

  const onChangeProvince = (option: any) => {
    form.setFieldValue('district', undefined);
    form.setFieldValue('ward', undefined);
    setDistrict(undefined);
    if (option !== undefined) {
      setProvince(option.key);
    } else {
      setProvince(undefined);
    }
  };

  const onChangeDistrict = (option: any) => {
    form.setFieldValue('ward', undefined);
    if (option !== undefined) {
      setDistrict(option.key);
    } else {
      setDistrict(undefined);
    }
  };

  return (
    <>
      <Col span={8}>
        <Item name={'province'}>
          <Select
            placeholder={' Tỉnh/ Thành phố'}
            onChange={(_, option) => onChangeProvince(option)}
            showSearch
            allowClear
          >
            {location.map((province: any, index: any) => (
              <Select.Option key={index} value={province.Name}>
                {province.Name}
              </Select.Option>
            ))}
          </Select>
        </Item>
      </Col>
      <Col span={8}>
        <Item name={'district'}>
          <Select
            placeholder={'Quận/ Huyện'}
            options={optionDistrict}
            onChange={(_, option) => onChangeDistrict(option)}
            showSearch
            allowClear
          />
        </Item>
      </Col>
      <Col span={8}>
        <Item name={'ward'}>
          <Select
            placeholder={'Phường/ Xã'}
            options={optionWard}
            showSearch
            allowClear
          />
        </Item>
      </Col>
    </>
  );
};

export default SearchAddress;
