import React from "react";
import { Button, Card, Form, Input, message, Checkbox } from "antd";
import {useNavigate} from "react-router-dom";
import {RegisterRequest} from "../../types/auth";
import { useDispatch, useSelector } from 'react-redux';
import {AppDispatch, RootState} from "../../store";
import { register } from "../../store/slices/authSlice";
import { LockOutlined } from '@ant-design/icons';

type FieldType = {
    Username?: string;
    Password?: string;
    ConfirmPassword?: string;
    Remember?: string;
};

export const Register: React.FC = () => {
    const [error, setError] = React.useState<string | null>(null);
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { isLoading } = useSelector((state: RootState) => state.auth);

    const handleSignUp = async (values: RegisterRequest) => {
        try {
            const result = await dispatch(register(values)).unwrap();

            if (result.message === 'User successfully signed up') {
                message.success('Successfully registered');
                navigate('/login');
            }
        } catch (e) {
            message.error('Registration error occurred');
            setError('Registration error occurred');
        }
    }
    return (
        <Card title="Sign Up" bordered={false} style={{
            maxWidth: '400px',
            margin: '100px auto',
            padding: '0 16px'}}>
            <Form
                onFinish={handleSignUp}
                autoComplete="off"
                layout="vertical"
            >
                <Form.Item<FieldType> name="Username" rules={[{required: true, message: 'Enter your username'}]}>
                    <Input placeholder="Username" />
                </Form.Item>
                <Form.Item<FieldType> name="Password" rules={[{required: true, message: 'Enter your password'}]}>
                    <Input.Password placeholder="Password" />
                </Form.Item>
                <Form.Item<FieldType> name="ConfirmPassword"
                                      dependencies={['password']}
                                      rules={[
                    { required: true, message: 'Confirm your password' },
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
                        placeholder="Confirm Password"
                    />
                </Form.Item>
                <Form.Item<FieldType> name="Remember" valuePropName="checked" label={null}>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>
                {error && <p style={{color: 'red'}}>{error}</p>}
                <Form.Item style={{ textAlign: 'center' }}>
                    <Button type="primary" htmlType="submit" loading={isLoading}>Sign Up</Button>
                </Form.Item>
                <Form.Item style={{ textAlign: 'center' }}>
                    Already have account? <Button type="link" onClick={() => navigate('/login')}>Login</Button>
                </Form.Item>
            </Form>
        </Card>
    )
}
