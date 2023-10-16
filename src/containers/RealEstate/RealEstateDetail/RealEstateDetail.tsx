import React, { useEffect, useState } from 'react';
import AppContainer from '../../AppLayout/AppContainer';
import ContentBlock from '../../../components/shared/ContentBlock';
import {
  Button,
  Col,
  Row,
  Typography,
  Image,
  Space,
  Tag,
  Modal,
  Form,
  Input,
  notification,
  Spin,
} from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import { realEstateHooks, userHooks } from '../../../hooks';
import { realEstateConstants } from '../../../constants';
import { realEstateServices } from '../../../services';

const { Title } = Typography;
const {
  REAL_ESTATE_TYPE,
  REAL_ESTATE_STATUS,
  REAL_ESTATE_STATUS_COLOR,
} = realEstateConstants;

interface Identifiable {
  id: string;
}

const RealEstateDetail: React.FC = () => {
  const [form] = Form.useForm();
  const params = useParams<Identifiable>();

  const [isModal, setIsModal] = useState<boolean>(false);
  const [isReset, setIsReset] = useState<boolean>(false);

  const {
    isGetDetail,
    realEstate,
    getDetail,
  } = realEstateHooks.useRealEstate();
  const { isGetUserDetail, getUserDetail, user } = userHooks.useUser();

  const onApprove = (
    status: number,
    real_estate_id?: number,
    reason_reject?: string
  ) => {
    realEstateServices
      .approveRealEstate(status, real_estate_id, reason_reject)
      .then(() => {
        notification.success({
          message: 'Thành công',
          description:
            status === 2
              ? 'Duyệt bất động sản thành công'
              : 'Từ chối bất động sản thành công',
        });
        setIsReset(!isReset);
      });
  };

  useEffect(() => {
    if (params.id) {
      getDetail(parseInt(params.id)).then(res => {
        if (res) {
          getUserDetail(res.user_id).then();
        }
      });
    }
  }, [isReset]);

  return !isGetDetail && !isGetUserDetail ? (
    <AppContainer title={'Thông tin chi tiết bất động sản'}>
      <ContentBlock>
        <Row gutter={[24, 0]}>
          <Col span={24}>
            <div>
              <>
                Trạng thái{' '}
                <Tag
                  color={
                    REAL_ESTATE_STATUS_COLOR[
                      realEstate?.status ? realEstate.status : 0
                    ]
                  }
                >
                  {
                    REAL_ESTATE_STATUS[
                      realEstate?.status ? realEstate.status : 0
                    ]
                  }
                </Tag>
                <br />
                <br />
              </>
              <div>
                <Title level={5} className="text-link">
                  I. Thông tin người đăng
                </Title>
                <Row className="mt-base" align="middle" gutter={[10, 30]}>
                  <Col span={6}>
                    <div>
                      <b>Họ tên:</b> {user?.full_name}
                    </div>
                  </Col>
                  <Col span={6}>
                    <div>
                      <b>Số điện thoại:</b> {user?.phone_number}
                    </div>
                  </Col>
                  <Col span={6}>
                    <div>
                      <b>Email:</b> {user?.email}
                    </div>
                  </Col>
                </Row>
              </div>
            </div>

            <div style={{ marginTop: 40 }}>
              <Title level={5} className="text-link">
                II. Thông tin căn hộ
              </Title>

              <Row className="mt-base" align="middle" gutter={[10, 30]}>
                <Col span={24}>
                  <Row align="middle">
                    <Col span={4}>
                      <b>Ảnh bất động sản:</b>
                    </Col>
                    <Col span={20}>
                      <Row>
                        {realEstate?.images?.split(',').map(item => (
                          <Col span={4}>
                            <Image src={item} />
                          </Col>
                        ))}
                      </Row>
                    </Col>
                  </Row>
                </Col>
                <Col span={24}>
                  <div>
                    <b>Tiêu đề:</b> {realEstate?.title}
                  </div>
                </Col>
                <Col span={24}>
                  <div>
                    <b>Mô tả:</b> {realEstate?.description}
                  </div>
                </Col>
                <Col span={4}>
                  <div>
                    <b>Loại giao dịch:</b>{' '}
                    {realEstate?.transaction_type === 1 ? 'Bán' : 'Cho thuê'}
                  </div>
                </Col>
                <Col span={20}>
                  <div>
                    <b>Loại bất động sản:</b>{' '}
                    {
                      REAL_ESTATE_TYPE.find(
                        item => item.value === realEstate?.type
                      )?.label
                    }
                  </div>
                </Col>
                <Col span={4}>
                  <b>Diện tích:</b> {realEstate?.area} m<sup>2</sup>
                </Col>
                <Col span={5}>
                  <b>Diện tích mặt tiền:</b> {realEstate?.frontage_are} m
                  <sup>2</sup>
                </Col>
                <Col span={4}>
                  <b>Số tầng:</b> {realEstate?.number_of_floor} tầng
                </Col>
                <Col span={4}>
                  <b>Số phòng ngủ:</b> {realEstate?.number_of_bedroom} phòng
                </Col>
                <Col span={4}>
                  <b>Số phòng tắm:</b> {realEstate?.number_of_bathroom} phòng
                </Col>
                <Col span={24}>
                  <b>Địa chỉ:</b> {realEstate?.address} - {realEstate?.ward} -{' '}
                  {realEstate?.district} - {realEstate?.province}
                </Col>
                <Col span={24}>
                  <b>Giá:</b>{' '}
                  {`${realEstate?.price} VNĐ`.replace(
                    /\B(?=(\d{3})+(?!\d))/g,
                    ','
                  )}
                  ,<b style={{ fontSize: 20 }} className="text-link"></b>
                </Col>

                <Col span={24}>
                  <div className="d-flex justify-content-center">
                    {realEstate?.status === 1 && (
                      <Space>
                        <Button
                          type="primary"
                          htmlType="submit"
                          icon={<CheckOutlined />}
                          onClick={() => onApprove(2, realEstate?.id)}
                        >
                          Phê duyệt
                        </Button>
                        <Button
                          className="bg-error mr-base"
                          htmlType="submit"
                          icon={<CloseOutlined />}
                          onClick={() => {
                            setIsModal(true);
                          }}
                        >
                          Từ chối
                        </Button>
                      </Space>
                    )}
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>

        <Modal
          okText="Lưu"
          destroyOnClose
          cancelText="Hủy"
          visible={isModal}
          onCancel={() => setIsModal(false)}
          onOk={() => {
            onApprove(3, realEstate?.id, form.getFieldValue('reason'));
            form.resetFields();
            setIsModal(false);
          }}
          title="Từ chối"
        >
          <Form form={form} layout="vertical">
            <Form.Item
              name="reason"
              label="Lý do từ chối"
              rules={[
                {
                  required: true,
                },
                { whitespace: true },
              ]}
            >
              <Input.TextArea
                rows={6}
                placeholder="Nhập lý do từ chối BĐS này!"
              />
            </Form.Item>
          </Form>
        </Modal>
      </ContentBlock>
    </AppContainer>
  ) : (
    <Spin className="app-spin" />
  );
};

export default RealEstateDetail;
