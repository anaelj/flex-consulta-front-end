import React, { useCallback, useRef } from 'react';
import { FiMail, FiUser, FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import { Container, Content } from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';
import getValidationErrors from '../../utils/getValidationErros';
import api from '../../services/api';
import { useToast } from '../../hooks/toast';
import { useAuth } from '../../hooks/auth';
import Dashboard from '../Dashboard';

interface ProfileFormData {
  name: string;
  email: string;
  old_password: string;
  password: string;
  password_confirmation: string;
}

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();
  const { user } = useAuth();
  const { id } = user;

  const handleSubmit = useCallback(
    async (data: ProfileFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigaório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          old_password: Yup.string(),
          password: Yup.string().when('old_password', {
            is: val => !!val.length,
            then: Yup.string().required('Campo obrigatório'),
            otherwise: Yup.string(),
          }),
          password_confirmation: Yup.string()
            .when('old_password', {
              is: val => !!val.length,
              then: Yup.string().required('Campo obrigatório'),
              otherwise: Yup.string(),
            })
            .oneOf([Yup.ref('password')], 'Confirmação de senha incorreta'),
        });
        await schema.validate(data, {
          abortEarly: false,
        });

        const formData = {
          name: data.name,
          email: data.email,
          ...(data.old_password
            ? {
                old_password: data.old_password,
                password: data.password,
                password_confirmation: data.password_confirmation,
              }
            : {}),
        };

        //        console.log(formData);

        const response = await api
          .put(`/profile/${id}`, formData)
          .catch(err => {
            if (err.response) {
              if (err.response.data.message === 'Old password does not math.') {
                addToast({
                  type: 'error',
                  title: 'Erro na atualização',
                  description: 'Senha atual incorreta!',
                });
              }
            } else if (err.request) {
              addToast({
                type: 'error',
                title: 'Erro na atualização',
                description: err.response.data.message,
              });
            } else {
              console.log('undfined error verify after!!!');
            }
          });

        if (response) {
          if (response.data) {
            addToast({
              type: 'success',
              title: 'Perfil atualizado!',
              description: 'Dados atualizados com sucesso!',
            });
            history.push('/dashboard');
            //            console.log(response);
            //          updateUser(response.data);
          }
        }
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);

          formRef.current?.setErrors(errors);
        }
        //        console.log(error);
        //        console.log(message);
      }
    },
    [addToast, history, id],
  );
  return (
    <Dashboard>
      <Container>
        <Content>
          <Form
            ref={formRef}
            initialData={{ name: user.name, email: user.email }}
            onSubmit={handleSubmit}
          >
            <h1>Meu perfil</h1>

            <Input name="name" icon={FiUser} placeholder="Nome" type="text" />
            <Input
              name="email"
              icon={FiMail}
              placeholder="E-mail"
              type="text"
            />
            <br />
            <Input
              name="old_password"
              icon={FiLock}
              type="password"
              placeholder="Senha atual"
            />
            <Input
              name="password_confirmation"
              icon={FiLock}
              type="password"
              placeholder="Nova Senha"
            />
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Confirmar Senha"
            />

            <Button type="submit">Salvar</Button>
          </Form>
        </Content>
      </Container>
    </Dashboard>
  );
};

export default Profile;
