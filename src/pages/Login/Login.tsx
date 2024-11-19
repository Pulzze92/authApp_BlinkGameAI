import React, { useState } from "react";
import {Button, Card, Checkbox, Form, Input, message} from 'antd';
import { useNavigate } from 'react-router-dom';
import { login } from "../../store/slices/authSlice";
import { useDispatch } from 'react-redux';
import { AppDispatch } from "../../store";

type FieldType = {
    username: string;
    password: string;
    remember?: boolean;
};

export const Login: React.FC = () => {
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const handleLogin = async (values: FieldType) => {
        try {
            const { remember, ...loginData } = values;
            const result = await dispatch(login(loginData)).unwrap();
            if (result.token) {
                message.success('Successfully authorized');
                navigate('/');
            }
        } catch (e: any) {
            const errorMessage = e.error || 'Authorization error';
            setError(errorMessage);
            message.error(errorMessage);
        }
    };

    return (
        <Card title="Sign in" bordered={false} style={{
            maxWidth: '400px',
            margin: '100px auto',
            padding: '0 16px'}}>
            <Form onFinish={handleLogin}>
                <Form.Item<FieldType> name="username" rules={[{required: true, message: 'Enter username'}]}>
                    <Input placeholder="Username" />
                </Form.Item>
                <Form.Item<FieldType> name="password" rules={[{required: true, message: 'Enter password'}]}>
                    <Input.Password placeholder="Password" />
                </Form.Item>
                <Form.Item<FieldType> name="remember" valuePropName="checked" label={null}>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>
                {error && <p style={{color: 'red'}}>{error}</p>}
                <div style={{ textAlign: 'center' }}>
                    <Button type="primary" htmlType="submit">Sign in</Button>
                    <Button type="link" onClick={() => navigate('/register')}>Sign up</Button>
                </div>

            </Form>
        </Card>
    )
}
