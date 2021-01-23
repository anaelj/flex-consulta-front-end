import React from 'react';
import { FiPower, FiUser, FiAlignJustify, FiServer } from 'react-icons/fi';

import { Link, useHistory } from 'react-router-dom';
import logoImg from '../../assets/logo.svg';
import 'react-day-picker/lib/style.css';

import {
  Container,
  Header,
  Profile,
  HeaderContent,
  Content,
  ContentLeft,
  ContentRight,
} from './styles';
import { useAuth } from '../../hooks/auth';
import ButtonLarge from '../../components/ButtonLarge';

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

const Dashboard: React.FC = ({ children }) => {
  const { signOut, user } = useAuth();
  const history = useHistory();
  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="FlexConsulta" />
          <Profile>
            <img src={user.avatar_url} alt="" />
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
        <ContentLeft>
          <ButtonLarge onClick={() => history.push('/pesquisamotorista')}>
            <FiAlignJustify />
            <span> Consulta Viagens</span>
          </ButtonLarge>
          <ButtonLarge
            onClick={() => {
              if (
                user.admin_flex === 'N' &&
                user.admin_transportadora === 'N'
              ) {
                history.push('/profile');
              } else {
                history.push('/pesquisausuario');
              }
            }}
          >
            <FiUser size="32" />
            <span> Cadastro de Usuários</span>
          </ButtonLarge>
          <ButtonLarge onClick={() => history.push('/pesquisatransportadora')}>
            <FiServer size="32" />
            <span>Transportadoras</span>
          </ButtonLarge>
        </ContentLeft>
        <ContentRight>{children}</ContentRight>
      </Content>
    </Container>
  );
};

export default Dashboard;
