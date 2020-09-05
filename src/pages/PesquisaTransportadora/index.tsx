import React, { useRef } from 'react';
import { FiMail, FiUser, FiArrowLeft, FiPhone } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useHistory, Link } from 'react-router-dom';
// import Griddle from 'griddle-react';
import { Container, Content } from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';
import api from '../../services/api';
import { useToast } from '../../hooks/toast';
import { useAuth } from '../../hooks/auth';

interface ITransportadoraFormData {
  name: string;
  email: string;
  contato: string;
  telefone: string;
}

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();
  const { user } = useAuth();

  return (
    <Container>
      <header>
        <div>
          <Link to="/dashboard">
            <FiArrowLeft />
          </Link>
        </div>
      </header>
      <Content>
        <Form ref={formRef} onSubmit={() => alert('teste')}>
          <h1>Transportadora</h1>

          <Input name="name" icon={FiUser} placeholder="Nome" type="text" />
          <Input name="email" icon={FiMail} placeholder="E-mail" type="text" />
          <Input
            name="contato"
            icon={FiUser}
            type="text"
            placeholder="Contato"
          />
          <Input
            name="telefone"
            icon={FiPhone}
            type="text"
            placeholder="Telefone"
          />
          <Button type="submit">Salvar</Button>
        </Form>
      </Content>
    </Container>
  );
};

export default Profile;
