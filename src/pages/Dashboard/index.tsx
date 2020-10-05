import React from 'react';
import { FiPower } from 'react-icons/fi';

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
        <ContentLeft>
          <ButtonLarge>Consulta Viagens</ButtonLarge>
          <ButtonLarge onClick={() => history.push('/pesquisausuario')}>
            Cadastro de Usuários
          </ButtonLarge>
          <ButtonLarge>Autorização de Transportadoras</ButtonLarge>
          <ButtonLarge onClick={() => history.push('/pesquisatransportadora')}>
            <span>Transportadoras</span>
          </ButtonLarge>
        </ContentLeft>
        <ContentRight>{children}</ContentRight>
      </Content>
    </Container>
  );
};

export default Dashboard;
