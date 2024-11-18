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
                message.success('Успешная авторизация');
                navigate('/');
            }
        } catch (e: any) {
            const errorMessage = e.error || 'Ошибка авторизации';
            setError(errorMessage);
            message.error(errorMessage);
        }
    };

    return (
        <Card title="Вход в профиль" bordered={false} style={{
            maxWidth: '400px',
            margin: '100px auto',
            padding: '0 16px'}}>
            <Form onFinish={handleLogin}>
                <Form.Item<FieldType> name="username" rules={[{required: true, message: 'Введите имя пользователя'}]}>
                    <Input placeholder="Имя пользователя" />
                </Form.Item>
                <Form.Item<FieldType> name="password" rules={[{required: true, message: 'Введите пароль'}]}>
                    <Input.Password placeholder="Пароль" />
                </Form.Item>
                <Form.Item<FieldType> name="remember" valuePropName="checked" label={null}>
                    <Checkbox>Запомнить меня</Checkbox>
                </Form.Item>
                {error && <p style={{color: 'red'}}>{error}</p>}
                <div style={{ textAlign: 'center' }}>
                    <Button type="primary" htmlType="submit">Войти</Button>
                    <Button type="link" onClick={() => navigate('/register')}>Зарегистрироваться</Button>
                </div>

            </Form>
        </Card>
    )
}
