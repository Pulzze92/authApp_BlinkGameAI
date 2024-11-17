import React, { useState } from "react";
import {Button, Card, Form, Input, message} from 'antd';
import { useNavigate } from 'react-router-dom';
import { login } from "../../store/slices/authSlice";
import { useDispatch } from 'react-redux';
import { AppDispatch } from "../../store";
import {AuthResponse} from "../../types/auth";

export const Login: React.FC = () => {
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const handleLogin = async (values: { username: string; password: string }) => {
        try {
            const result: AuthResponse = await dispatch(login(values)).unwrap();
            if (result.message === 'Successfully login') {
                message.success('Successfully login');
                navigate('/login');
            }
        } catch (e) {
            message.error('Login error occurred');
            setError('Invalid Credentials');
        }
    }

    return (
        <Card title="Login" bordered={false} style={{
            maxWidth: '400px',
            margin: '100px auto',
            padding: '0 16px'}}>
            <Form onFinish={handleLogin}>
                <Form.Item name="username" rules={[{required: true, message: 'Enter your username'}]}>
                    <Input placeholder="Username" />
                </Form.Item>
                <Form.Item name="Password" rules={[{required: true, message: 'Enter your password'}]}>
                    <Input.Password placeholder="Password" />
                </Form.Item>
                {error && <p style={{color: 'red'}}>{error}</p>}
                <Button type="primary" htmlType="submit">Login</Button>
                <Button type="link" onClick={() => navigate('/register')}>Register</Button>
            </Form>
        </Card>
    )
}
