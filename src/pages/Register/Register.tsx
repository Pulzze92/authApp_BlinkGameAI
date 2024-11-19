import React from "react";
import { Button, Card, Form, Input, message, Checkbox } from "antd";
import {useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import {AppDispatch, RootState} from "../../store";
import { register } from "../../store/slices/authSlice";
import { LockOutlined } from '@ant-design/icons';

type FieldType = {
    username: string;
    password: string;
    confirmPassword: string;
    remember?: boolean;
};

export const Register: React.FC = () => {
    const [error, setError] = React.useState<string | null>(null);
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { isLoading } = useSelector((state: RootState) => state.auth);

    const handleSignUp = async (values: FieldType) => {
        try {
            const { confirmPassword, remember, ...registerData } = values;
            const result = await dispatch(register(registerData)).unwrap();

            if (result.message === 'User successfully registered') {
                message.success(result.message);
                navigate('/login');
            }
        } catch (e: any) {
            const errorMessage = e.error || 'Registration error';
            message.error(errorMessage);
            setError(errorMessage);
        }
    }

    return (
        <Card title="Sign up" bordered={false} style={{
            maxWidth: '400px',
            margin: '100px auto',
            padding: '0 16px'}}>
            <Form
                onFinish={handleSignUp}
                autoComplete="off"
                layout="vertical"
            >
                <Form.Item<FieldType> name="username" rules={[{required: true, message: 'Enter username'}]}>
                    <Input placeholder="Username" />
                </Form.Item>
                <Form.Item<FieldType> name="password" rules={[{required: true, message: 'Enter password'}]}>
                    <Input.Password
                        prefix={<LockOutlined />}
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item<FieldType> name="confirmPassword"
                                      dependencies={['password']}
                                      rules={[
                    { required: true, message: 'Confirm password' },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('Passwords do not match'));
                        },
                    }),
                ]}
                >
                    <Input.Password
                        prefix={<LockOutlined />}
                        placeholder="Confirm password"
                    />
                </Form.Item>
                <Form.Item<FieldType> name="remember" valuePropName="checked" label={null}>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>
                {error && <p style={{color: 'red'}}>{error}</p>}
                <Form.Item style={{ textAlign: 'center' }}>
                    <Button type="primary" htmlType="submit" loading={isLoading}>Sign up</Button>
                </Form.Item>
                <Form.Item style={{ textAlign: 'center' }}>
                    Already have account? <Button type="link" onClick={() => navigate('/login')}>Sign in</Button>
                </Form.Item>
            </Form>
        </Card>
    )
}
