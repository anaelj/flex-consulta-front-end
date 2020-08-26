import React from 'react';
import { FiPower } from 'react-icons/fi';

import { Link } from 'react-router-dom';
import logoImg from '../../assets/logo.svg';
import 'react-day-picker/lib/style.css';

import { Container, Header, Profile, HeaderContent, Content } from './styles';
import { useAuth } from '../../hooks/auth';

interface MonthAvailabilityItem {
  day: number;
  available: boolean;
}

interface Appointments {
  id: string;
  date: string;
  hourFormatted: string;
  user: {
    name: string;
    avatar_url: string;
  };
}

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="FexConsulta" />
          <Profile>
            <img src={user.avatar_url} alt={user.name} />
            <div>
              <span>Bem-vindo,</span>
              <Link to="/profile">
                <strong>{user.name}</strong>
              </Link>
            </div>
          </Profile>
          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>
      <Content>
        <h1>...</h1>
      </Content>
    </Container>
  );
};

export default Dashboard;
