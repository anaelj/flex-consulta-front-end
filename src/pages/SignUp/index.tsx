import React, { useCallback, useRef, useEffect, useState } from 'react';
import { FiMail, FiUser, FiLock, FiHome, FiCreditCard } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useHistory, useParams } from 'react-router-dom';
import { AnimationContainer } from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';
import getValidationErrors from '../../utils/getValidationErros';
import { useToast } from '../../hooks/toast';
import api from '../../services/api';
import Select from '../../components/Select';
import Dashboard from '../Dashboard';
import { isUuid } from 'uuidv4';

interface SignUpFormData {
  name: string;
  email: string;
  password?: string;
  transportadora_id: string;
  cpf: string;
  admin_flex: string;
  admin_transportadora: string;
}

interface IUsuario {
  name: string;
  email: string;
  password?: string;
  transportadora_id: string;
  cpf: string;
  admin_flex: string;
  admin_transportadora: string;
}


interface ITransportadoras {
  id: string;
  name: string;
}

interface ISelectOptions {
  value: string;
  label: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const { id } = useParams();
  const history = useHistory();
  const [transportadoras, setTransportadoras] = useState<ISelectOptions[]>([]);
  //const [transportadora_id, setTransportadora_id] = useState<string>('');
  //console.log(useParams());

  // 172e5dcf-e99f-49ed-b9cb-bee53761b1da
    
  useEffect(() => {
    if (isUuid(id)) {
      api
        .get<IUsuario>(`/users/show/${id}`) //http://localhost:3333/users/show/73d6f154-3197-425b-a5a1-e5ab22c3a49f
        .then(response => {
          formRef.current?.setData({
            name: response.data.name,
            email: response.data.email,
            cpf: response.data.cpf,
            transportadora_id: response.data.transportadora_id,
            admin_flex: response.data.admin_flex,
            admin_transportadora: response.data.admin_transportadora,
          });
//          setTransportadora_id(response.data.transportadora_id);
        });
    }
  }, [id]);

  useEffect(() => {

    api
      .get<ITransportadoras[]>(
        '/transportadoras/172e5dcf-e99f-49ed-b9cb-bee53761b1da',
      )
      .then(response => {
        const temp = response.data.map(transportadora => {
          return {
            value: transportadora.id,
            label: transportadora.name,
          };
        });
//        console.log(response.data);

        setTransportadoras(temp);
                //console.log(temp);
      });
  }, []);

  // const options = [
  //   { value: '6c2a6b78-c87d-4141-8863-e4ec5cae0748', label: 'luis transp' },
  //   { value: '607b1fcf-4ab4-44ab-9474-12b5424a4c88', label: 'anael transp' },
  //   { value: '172e5dcf-e99f-49ed-b9cb-bee53761b1da', label: 'tteste 2' },
  // ];

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


        if (isUuid(id)) {
          await api.put('/profile', data);
        } else {
          await api.post('/users', data);
        }

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
    [addToast, history, id],
  );
  return (
    <Dashboard>
      <AnimationContainer>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Cadastro de Usuários</h1>
          <Input name="name" icon={FiUser} placeholder="Nome" type="text" />
          <Input
            name="email"
            icon={FiMail}
            placeholder="E-mail"
            type="text"
            autoComplete="false"
          />

          <Input
            name="cpf"
            icon={FiCreditCard}
            placeholder="CPF"
            type="text"
            autoComplete="false"
          />

          <Select
            name="transportadora_id"
            placeholder="Transportadora"
            options={transportadoras}
            isMulti={false}
            icon={FiHome}
            defaultValue={transportadoras[2]}            
          />
          {console.log(transportadoras[2])}
          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Senha"
          />

          <Button type="submit">{isUuid(id) ? 'Atualizar' : 'Cadastrar' }</Button>
        </Form>
      </AnimationContainer>
    </Dashboard>
  );
};

export default SignUp;
