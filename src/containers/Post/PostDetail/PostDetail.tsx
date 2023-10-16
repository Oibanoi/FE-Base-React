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
import { postHooks } from '../../../hooks';
import { realEstateConstants } from '../../../constants';
import { postServices } from '../../../services';

const { Title } = Typography;
const { REAL_ESTATE_STATUS, REAL_ESTATE_STATUS_COLOR } = realEstateConstants;

interface Identifiable {
  id: string;
}

const PostDetail: React.FC = () => {
  const [form] = Form.useForm();
  const params = useParams<Identifiable>();

  const [isModal, setIsModal] = useState<boolean>(false);
  const [isReset, setIsReset] = useState<boolean>(false);

  const { isGetPostDetail, post, getPostDetail } = postHooks.usePost();

  const onApprove = (
    status: number,
    real_estate_id?: number,
    reason_reject?: string
  ) => {
    postServices.approvePost(status, real_estate_id, reason_reject).then(() => {
      notification.success({
        message: 'Thành công',
        description:
          status === 2
            ? 'Duyệt bài viết thành công'
            : 'Từ chối bài viết thành công',
      });
      setIsReset(!isReset);
    });
  };

  useEffect(() => {
    if (params.id) {
      getPostDetail(parseInt(params.id)).then();
    }
  }, [isReset]);

  return !isGetPostDetail ? (
    <AppContainer title={'Thông tin chi tiết bài viết'}>
      <ContentBlock>
        <Row gutter={[24, 0]}>
          <Col span={24}>
            <div>
              <>
                Trạng thái{' '}
                <Tag
                  color={
                    REAL_ESTATE_STATUS_COLOR[post?.status ? post.status : 0]
                  }
                >
                  {REAL_ESTATE_STATUS[post?.status ? post.status : 0]}
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
                      <b>Họ tên:</b> {post?.user_full_name}
                    </div>
                  </Col>
                  <Col span={6}>
                    <div>
                      <b>Số điện thoại:</b> {post?.user_phone}
                    </div>
                  </Col>
                  <Col span={6}>
                    <div>
                      <b>Email:</b> {post?.user_email}
                    </div>
                  </Col>
                </Row>
              </div>
            </div>

            <div style={{ marginTop: 40 }}>
              <Title level={5} className="text-link">
                II. Thông tin bài viết
              </Title>

              <Row className="mt-base" align="middle" gutter={[10, 30]}>
                <Col span={24}>
                  <div>
                    <b>Tiêu đề:</b> {post?.title}
                  </div>
                </Col>
                <Col span={24}>
                  <div>
                    <b>Nội dung:</b> {post?.content}
                  </div>
                </Col>
                <Col span={24}>
                  <Row align="middle">
                    <Col span={4}>
                      <b>Ảnh bài viết:</b>
                    </Col>
                    <Col span={20}>
                      <Row>
                        {post?.images?.split(',').map(item => (
                          <Col span={4}>
                            <Image src={item} />
                          </Col>
                        ))}
                      </Row>
                    </Col>
                  </Row>
                </Col>

                <Col span={24}>
                  <div className="d-flex justify-content-center">
                    {post?.status === 1 && (
                      <Space>
                        <Button
                          type="primary"
                          htmlType="submit"
                          icon={<CheckOutlined />}
                          onClick={() => onApprove(2, post?.id)}
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
            onApprove(3, post?.id, form.getFieldValue('reason'));
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

export default PostDetail;
