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

            if (result.message === 'Пользователь успешно зарегистрирован') {
                message.success(result.message);
                navigate('/login');
            }
        } catch (e: any) {
            const errorMessage = e.error || 'Ошибка регистрации';
            message.error(errorMessage);
            setError(errorMessage);
        }
    }

    return (
        <Card title="Регистрация" bordered={false} style={{
            maxWidth: '400px',
            margin: '100px auto',
            padding: '0 16px'}}>
            <Form
                onFinish={handleSignUp}
                autoComplete="off"
                layout="vertical"
            >
                <Form.Item<FieldType> name="username" rules={[{required: true, message: 'Введите имя пользователя'}]}>
                    <Input placeholder="Имя пользователя" />
                </Form.Item>
                <Form.Item<FieldType> name="password" rules={[{required: true, message: 'Введите пароль'}]}>
                    <Input.Password
                        prefix={<LockOutlined />}
                        placeholder="Пароль"
                    />
                </Form.Item>
                <Form.Item<FieldType> name="confirmPassword"
                                      dependencies={['password']}
                                      rules={[
                    { required: true, message: 'Подтвердите пароль' },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('Пароли не совпадают'));
                        },
                    }),
                ]}
                >
                    <Input.Password
                        prefix={<LockOutlined />}
                        placeholder="Подтвердите пароль"
                    />
                </Form.Item>
                <Form.Item<FieldType> name="remember" valuePropName="checked" label={null}>
                    <Checkbox>Запомнить меня</Checkbox>
                </Form.Item>
                {error && <p style={{color: 'red'}}>{error}</p>}
                <Form.Item style={{ textAlign: 'center' }}>
                    <Button type="primary" htmlType="submit" loading={isLoading}>Зарегистрироваться</Button>
                </Form.Item>
                <Form.Item style={{ textAlign: 'center' }}>
                    Уже есть акаунт? <Button type="link" onClick={() => navigate('/login')}>Войти</Button>
                </Form.Item>
            </Form>
        </Card>
    )
}
