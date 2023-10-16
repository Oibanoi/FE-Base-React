import ContentBlock from '../../shared/ContentBlock';
import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  notification,
  Radio,
  Row,
  Select,
  Spin,
  Tag,
  Upload,
} from 'antd';
import { PlusOutlined, CloseCircleOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import {
  locationHooks,
  realEstateHooks,
  servicePackHooks,
  uploadHooks,
} from '../../../hooks';
import './UpsertRealEstate.scss';
import { realEstateConstants } from '../../../constants';
import SearchAddress from '../../shared/SearchAddress';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { IUserDetail } from '../../../interfaces/user';

const { Item } = Form;
const {
  REAL_ESTATE_TYPE,
  REAL_ESTATE_STATUS,
  REAL_ESTATE_STATUS_COLOR,
} = realEstateConstants;

interface Identifiable {
  id: string;
}

const UpsertRealEstate = () => {
  const history = useHistory();

  const [form] = Form.useForm();

  const params = useParams<Identifiable>();
  const [currentUser, setCurrentUser] = useState<IUserDetail>();

  const { isGetLocation, getLocation, location } = locationHooks.useLocation();
  const {
    isUpsert,
    upsertRealEstate,
    isGetDetail,
    realEstate,
    getDetail,
    setIsGetDetail,
  } = realEstateHooks.useRealEstate();
  const {
    isGetPacks,
    servicePacks,
    getAllPacks,
  } = servicePackHooks.useServicePack();
  const { fileList, uploadConfigs } = uploadHooks.useUpload(form);

  useEffect(() => {
    getLocation().then();
  }, []);

  useEffect(() => {
    getAllPacks().then();
  }, []);

  useEffect(() => {
    if (params.id) {
      getDetail(parseInt(params.id)).then();
      const userInfo = localStorage.getItem('user');
      if (userInfo) {
        setCurrentUser(JSON.parse(userInfo));
      } else {
        setCurrentUser(undefined);
      }
    } else {
      setIsGetDetail(false);
    }
  }, []);

  const onCreate = (values: any) => {
    if (params.id) {
      values.id = params.id;
    }
    values.images = fileList.map(file => file.response.data.url).toString();
    upsertRealEstate(values).then(_ => {
      notification.success({
        message: 'Thành công',
        description: params.id
          ? 'Cập nhật tin thành công, vui lòng chờ đến khi admin duyệt bài'
          : 'Đăng tin thành công, vui lòng chờ đến khi admin duyệt bài',
      });
      history.push('/real-estate/me');
    });
  };

  if (params.id) {
    if (realEstate && realEstate?.user_id !== currentUser?.id) {
      return <Redirect to={'/'} />;
    }
  }

  return isGetPacks && isGetLocation ? (
    <Spin className="app-spin" />
  ) : isGetDetail ? (
    <Spin className="app-spin" />
  ) : (
    <ContentBlock>
      {realEstate && (
        <>
          Trạng thái{' '}
          <Tag color={REAL_ESTATE_STATUS_COLOR[realEstate.status]}>
            {REAL_ESTATE_STATUS[realEstate.status]}
          </Tag>
          <br />
          <br />
        </>
      )}
      <div className="upload_list_item">
        <Form
          form={form}
          layout={'vertical'}
          onFinish={onCreate}
          initialValues={{ ...realEstate }}
          disabled={realEstate && realEstate?.status !== 1}
        >
          <Row gutter={[100, 10]}>
            <Col xs={24} md={12}>
              <Item
                name={'title'}
                label={'Tiêu đề'}
                rules={[{ required: true }]}
              >
                <Input placeholder={'Tiêu đề'}></Input>
              </Item>
              <Item name={'description'} label={'Mô tả'}>
                <Input.TextArea rows={5} placeholder={'Mô tả'}></Input.TextArea>
              </Item>
              <Item
                name={'transaction_type'}
                label={'Loại giao dịch'}
                rules={[{ required: true }]}
              >
                <Radio.Group>
                  <Radio value={1}>Bán</Radio>
                  <Radio value={2}>Cho thuê</Radio>
                </Radio.Group>
              </Item>

              <Item
                name={'type'}
                label={'Loại bất động sản'}
                rules={[{ required: true }]}
              >
                <Select
                  options={REAL_ESTATE_TYPE.slice(1)}
                  placeholder={' Loại bất động sản'}
                ></Select>
              </Item>

              <Item
                name={'address'}
                label={'Địa chỉ bất động sản'}
                rules={[{ required: true }]}
              >
                <Row gutter={[10, 10]}>
                  <SearchAddress form={form} location={location} />
                </Row>
              </Item>
              <Item
                name={'address'}
                label={'Số nhà, tên đường'}
                rules={[{ required: true }]}
              >
                <Input placeholder={'Số nhà, tên đường'} />
              </Item>
            </Col>

            <Col xs={24} md={12}>
              <Row gutter={[10, 10]}>
                <Col span={12}>
                  <Item name={'area'} label={'Diện tích'}>
                    <InputNumber
                      addonAfter={
                        <>
                          m<sup>2</sup>
                        </>
                      }
                      placeholder={'Diện tích'}
                      min={1}
                      style={{ width: '100%' }}
                    />
                  </Item>
                </Col>
                <Col span={12}>
                  <Item name={'frontage_are'} label={'Diện tích mặt tiền'}>
                    <InputNumber
                      addonAfter={
                        <>
                          m<sup>2</sup>
                        </>
                      }
                      placeholder={'Diện tích mặt tiền'}
                      min={1}
                      style={{ width: '100%' }}
                    />
                  </Item>
                </Col>

                <Col span={8}>
                  <Item name={'number_of_floor'} label={'Số tầng'}>
                    <InputNumber
                      min={1}
                      style={{ width: '100%' }}
                      placeholder={'Số tầng'}
                    />
                  </Item>
                </Col>
                <Col span={8}>
                  <Item name={'number_of_bedroom'} label={'Số phòng ngủ'}>
                    <InputNumber
                      min={1}
                      style={{ width: '100%' }}
                      placeholder={'Số phòng ngủ'}
                    />
                  </Item>
                </Col>
                <Col span={8}>
                  <Item name={'number_of_bathroom'} label={'Số phòng tắm'}>
                    <InputNumber
                      min={1}
                      style={{ width: '100%' }}
                      placeholder={'Số phòng tắm'}
                    />
                  </Item>
                </Col>
                <Col span={24}>
                  <Item name={'images'} label={'Hình ảnh/ Video'}>
                    <Upload
                      {...uploadConfigs}
                      fileList={fileList}
                      listType={'picture-card'}
                      multiple
                      showUploadList={{
                        showRemoveIcon: true,
                        removeIcon: (
                          <CloseCircleOutlined
                            style={{ fontSize: 18, zIndex: 1000 }}
                          />
                        ),
                      }}
                    >
                      <PlusOutlined />
                    </Upload>
                  </Item>
                </Col>

                <Col span={24}>
                  <Item
                    name={'price'}
                    label={'Giá bán/ cho thuê'}
                    rules={[{ required: true }]}
                  >
                    <InputNumber
                      addonAfter={'VNĐ'}
                      min={1}
                      style={{ width: '100%' }}
                      placeholder={'Giá bán/ cho thuê'}
                      formatter={value =>
                        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                      }
                    />
                  </Item>
                </Col>

                <Col span={24}>
                  <Item
                    name={'service_pack_id'}
                    label={'Gói tin'}
                    rules={[{ required: true }]}
                  >
                    <Select placeholder={'Gói tin'}>
                      {servicePacks.map(pack => (
                        <Select.Option key={pack.id} value={pack.id}>
                          {pack.name} - {pack.amount} VNĐ
                        </Select.Option>
                      ))}
                    </Select>
                  </Item>
                </Col>

                {!params.id && (
                  <Col span={24}>
                    <Button
                      style={{ width: '100%', borderRadius: 24 }}
                      type={'primary'}
                      htmlType={'submit'}
                      loading={isUpsert}
                    >
                      Đăng tin
                    </Button>
                  </Col>
                )}

                {params.id && realEstate?.status === 1 && (
                  <Col span={24}>
                    <Button
                      style={{ width: '100%', borderRadius: 24 }}
                      type={'primary'}
                      htmlType={'submit'}
                      loading={isUpsert}
                    >
                      Cập nhật
                    </Button>
                  </Col>
                )}
              </Row>
            </Col>
          </Row>
        </Form>
      </div>
    </ContentBlock>
  );
};

export default UpsertRealEstate;
