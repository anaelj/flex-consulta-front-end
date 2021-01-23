import React, { useCallback, useRef, useEffect, useState } from 'react';
import { FiMail, FiUser, FiPhone } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useHistory, useParams } from 'react-router-dom';
import { isUuid } from 'uuidv4';
import { Container, Content, DivRadio } from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';
import getValidationErrors from '../../utils/getValidationErros';
import api from '../../services/api';
import { useToast } from '../../hooks/toast';
import { AnimationContainer } from '../SignIn/styles';
import Dashboard from '../Dashboard';
import { useAuth } from '../../hooks/auth';

interface ITransportadoraFormData {
  name: string;
  email: string;
  contato: string;
  telefone: string;
  avatar_url: string;
  status: string;
}

interface ITransportadora {
  name: string;
  avatar_url: string;
}

interface CheckboxOption {
  id: string;
  value: string;
  label: string;
}

const Transportadora: React.FC = () => {
  const { id } = useParams();
  const formRef = useRef<FormHandles>(null);
  const { user } = useAuth();
  const { admin_flex } = user;
  const [statusHere, setStatusHere] = useState();

  useEffect(() => {
    if (isUuid(id)) {
      api
        .get<ITransportadoraFormData>(`/transportadoras/show/${id}`)
        .then(response => {
          formRef.current?.setData({
            name: response.data.name,
            email: response.data.email,
            contato: response.data.contato,
            telefone: response.data.telefone,
            avatar_url: response.data.avatar_url,
            status: response.data.status,
          });
          setStatusHere(response.data.status);
        });
    }
    //    console.log(id);
  }, [id]);

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
          status: statusHere,
        };

        console.log(formData.status);

        if (isUuid(id)) {
          await api.put(`/transportadoras/${id}`, formData);
        } else {
          await api.post('/transportadoras', formData);
        }

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
    [addToast, history, id, statusHere],
  );

  function handleStatusChange(value: string) {
    setStatusHere(value);
  }

  return (
    <Dashboard>
      <Container>
        <Content>
          <AnimationContainer>
            <Form ref={formRef} onSubmit={handleSubmit}>
              <h1>Transportadora</h1>

              {admin_flex === 'S' ? (
                <DivRadio>
                  {statusHere === 'A' ? (
                    <input
                      id="status"
                      type="radio"
                      value="A"
                      name="status"
                      checked
                      onClick={() => {
                        handleStatusChange('A');
                      }}
                    />
                  ) : (
                    <input
                      id="status"
                      type="radio"
                      value="A"
                      name="status"
                      onClick={() => {
                        handleStatusChange('A');
                      }}
                    />
                  )}
                  <span>Ativo</span>
                  {statusHere === 'I' ? (
                    <input
                      id="status"
                      type="radio"
                      value="I"
                      name="status"
                      checked
                      onClick={() => {
                        handleStatusChange('I');
                      }}
                    />
                  ) : (
                    <input
                      id="status"
                      type="radio"
                      value="I"
                      name="status"
                      onClick={() => {
                        handleStatusChange('I');
                      }}
                    />
                  )}
                  <span>Inativo</span>
                </DivRadio>
              ) : (
                ''
              )}

              {/* {admin_flex === 'S' && (

              )} */}
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
