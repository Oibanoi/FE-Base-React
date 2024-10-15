import styled from '@emotion/styled';
import { Button, Col, Form, Input, Row, Typography } from 'antd';
import { useForm } from 'antd/es/form/Form';
import FormItem from 'antd/es/form/FormItem';
import { t } from 'i18next';

export interface SignInFormProps {
  className?: string;
  onSubmit?: (values: SignInFormValues) => void;
  loading?: boolean;
}
export interface SignInFormValues {
  email: string;
  password: string;
}

export const SignInForm: React.FC<SignInFormProps> = ({
  loading,
  onSubmit,
  className,
}) => {
  const [form] = useForm();
  return (
    <Wrapper className={className}>
      <Box>
        <Title style={{ fontWeight: '700' }}>{t('welcome')}</Title>
      </Box>
      <Box style={{ width: '100%' }}>
        <Form<SignInFormValues>
          validateTrigger={['onSubmit']}
          form={form}
          layout="vertical"
          onFinish={onSubmit}
          name="login-form"
        >
          <Row gutter={[6, 6]}>
            <Col span={24}>
              <FormItem
                name="email"
                validateFirst
                rules={[
                  {
                    required: true,
                    message: t('field is required', {
                      field: t('email'),
                    }),
                  },
                  {
                    type: 'email',
                    message: t('field is invalid format', {
                      field: t('email'),
                    }),
                  },
                ]}
              >
                <Input placeholder={t('email')} name="email" />
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem
                name="password"
                rules={[
                  {
                    required: true,
                    message: t('field is required', {
                      field: t('password'),
                    }),
                  },
                ]}
              >
                <Input.Password placeholder={t('password')} name="password" />
              </FormItem>
            </Col>

            <Button type="primary" htmlType="submit" block loading={loading}>
              {t('sign in')}
            </Button>
          </Row>
        </Form>
        <Box>
          <Typography.Text type="secondary">
            {t("You don't have an account?")}
            <Button type="link" href="register">
              {t('sign up')}
            </Button>
          </Typography.Text>
        </Box>
      </Box>
    </Wrapper>
  );
};

const Title = styled(Typography.Title)`
  margin-bottom: 0.5rem !important;
  margin-block-start: 0.375rem;
`;

const Wrapper = styled.div`
  padding: 16px;
  width: 90%;
`;

const Box = styled.div`
  margin-top: 24px;
  text-align: center;
`;
