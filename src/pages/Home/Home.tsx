import React, { useEffect } from 'react';
import { Card, Avatar, Typography, Spin, Button, message } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from "../../store";
import { fetchUserProfile, logout } from '../../store/slices/authSlice'

const { Title, Paragraph } = Typography;

export const Home: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { user, isLoading, error } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/login');
            return;
        }

        dispatch(fetchUserProfile())
            .unwrap()
            .catch((err) => {
                message.error('Loading profile error');
                if (err.response?.status === 401) {
                    dispatch(logout());
                    navigate('/login');
                }
            });
    }, [dispatch, navigate]);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    if (isLoading) {
        return (
            <Card style={{ maxWidth: '600px', margin: '40px auto' }}>
                <Spin size="large" style={{ margin: '20px auto', display: 'block' }} />
            </Card>
        );
    }

    if (!user) {
        return (
            <Card style={{ maxWidth: '600px', margin: '40px auto' }}>
                <Spin size="large" style={{ margin: '20px auto', display: 'block' }} />
                <Title level={3} type="danger">User did not found</Title>
            </Card>
        );
    }

    if (error) {
        return (
            <div style={{
                textAlign: 'center',
                marginTop: '100px'
            }}>
                <Title level={3} type="danger">Loading profile error</Title>
                <Button onClick={() => dispatch(fetchUserProfile())}>
                    Retry
                </Button>
            </div>
        );
    }

    return (
        <div style={{
            maxWidth: '600px',
            margin: '40px auto',
            padding: '0 16px'
        }}>
            <Card
                actions={[
                    <Button
                        key="logout"
                        type="link"
                        icon={<LogoutOutlined />}
                        onClick={handleLogout}
                        danger
                    >
                        Sign out
                    </Button>
                ]}
            >
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '20px'
                }}>
                    <Avatar
                        size={128}
                        icon={<UserOutlined />}
                        src={user?.data.avatar}
                    />

                    <Title level={2} style={{ margin: 0 }}>
                        {user?.data.username}
                    </Title>

                    <Paragraph style={{
                        textAlign: 'center',
                        fontSize: '16px',
                        maxWidth: '400px'
                    }}>
                        {user?.data.about || 'Information empty'}
                    </Paragraph>
                </div>
            </Card>
        </div>
    );
};
