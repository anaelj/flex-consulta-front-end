import React, { useCallback, useRef } from 'react';
import { FiMail, FiUser, FiPhone } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useHistory, useParams } from 'react-router-dom';
import { isUuid } from 'uuidv4';
import { Container, Content } from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';
import getValidationErrors from '../../utils/getValidationErros';
import api from '../../services/api';
import { useToast } from '../../hooks/toast';
import { AnimationContainer } from '../SignIn/styles';
import Dashboard from '../Dashboard';

interface ITransportadoraFormData {
  name: string;
  email: string;
  contato: string;
  telefone: string;
}

const Transportadora: React.FC = () => {
  const { id } = useParams();

  if (isUuid(id)) {
    console.log('a valid uuid');
    // parei aqui, nessa parte que precisa fazer requisição a api para buscar os dados e preencher o form
  }

  console.log(id);

  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();
  const handleSubmit = useCallback(
    async (data: ITransportadoraFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigaório'),
          contato: Yup.string().required('Informe um nome para contato'),
          telefone: Yup.string().required('Informe um número telefone'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
        });
        await schema.validate(data, {
          abortEarly: false,
        });

        const formData = {
          name: data.name,
          email: data.email,
          contato: data.contato,
          telefone: data.telefone,
        };

        await api.post('/transportadoras', formData);

        history.push('/dashboard');

        addToast({
          type: 'success',
          title: 'Transportadora cadastrada!',
          description: 'Dados cadastrados com sucesso!',
        });
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);

          formRef.current?.setErrors(errors);

          return;
        }
        addToast({
          type: 'error',
          title: 'Erro na atualização',
          description: 'Ocorreu um erro ao atualizar o cadastro',
        });
      }
    },
    [addToast, history],
  );
  return (
    <Dashboard>
      <Container>
        <Content>
          <AnimationContainer>
            <Form ref={formRef} onSubmit={handleSubmit}>
              <h1>Transportadora</h1>

              <Input name="name" icon={FiUser} placeholder="Nome" type="text" />
              <Input
                name="email"
                icon={FiMail}
                placeholder="E-mail"
                type="text"
              />
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
          </AnimationContainer>
        </Content>
      </Container>
    </Dashboard>
  );
};

export default Transportadora;
