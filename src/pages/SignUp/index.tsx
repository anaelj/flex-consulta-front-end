import React, { useCallback, useRef } from 'react';
import { FiMail, FiUser, FiLock, FiHome } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import { Container, Content, AnimationContainer } from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';
import getValidationErrors from '../../utils/getValidationErros';
import { useToast } from '../../hooks/toast';
import api from '../../services/api';
import Select from '../../components/Select';
import Dashboard from '../Dashboard';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  transportadora_id: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const options = [
    { value: '6c2a6b78-c87d-4141-8863-e4ec5cae0748', label: 'luis transp' },
    { value: '607b1fcf-4ab4-44ab-9474-12b5424a4c88', label: 'anael transp' },
    { value: '172e5dcf-e99f-49ed-b9cb-bee53761b1da', label: 'tteste 2' },
  ];

  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigaório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().min(6, 'Mínimo 6 dígitos'),
        });
        await schema.validate(data, {
          abortEarly: false,
        });

        console.log(data);

        await api.post('/users', data);

        history.push('/');

        addToast({
          type: 'success',
          title: 'Cadastro realizado!',
          description: 'Você já pode fazer seu logon no FexConsulta',
        });
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);

          formRef.current?.setErrors(errors);

          return;
        }
        addToast({
          type: 'error',
          title: 'Erro no cadastro',
          description: 'Ocorreu um erro ao realizar o cadastro',
        });
      }
    },
    [addToast, history],
  );
  return (
    <Dashboard>
      <AnimationContainer>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Cadastro de Usuários</h1>
          <Input name="name" icon={FiUser} placeholder="Nome" type="text" />
          <Input name="email" icon={FiMail} placeholder="E-mail" type="text" />

          <Select
            name="transportadora_id"
            placeholder="Transportadora"
            options={options}
            isMulti={false}
            icon={FiHome}
          />

          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Senha"
          />

          <Button type="submit">Cadastrar</Button>
        </Form>
      </AnimationContainer>
    </Dashboard>
  );
};

export default SignUp;
