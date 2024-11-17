import React from "react";
import {Button, Card, Form, Input, message} from "antd";
import {useNavigate} from "react-router-dom";
import {RegisterRequest} from "../../types/auth";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from "../../store";
import { register } from "../../store/slices/authSlice";

export const Register: React.FC = () => {
    const [error, setError] = React.useState<string | null>(null);
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

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
            <Form onFinish={handleSignUp}>
                <Form.Item name="username" rules={[{required: true, message: 'Enter your username'}]}>
                    <Input placeholder="Username" />
                </Form.Item>
                <Form.Item name="Password" rules={[{required: true, message: 'Enter your password'}]}>
                    <Input.Password placeholder="Password" />
                </Form.Item>
                {error && <p style={{color: 'red'}}>{error}</p>}
                <Button type="primary" htmlType="submit">Sign Up</Button>
                <Button type="link" onClick={() => navigate('/login')}>Login</Button>
            </Form>
        </Card>
    )
}
