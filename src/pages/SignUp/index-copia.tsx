import React, { useCallback, useRef, useEffect, useState } from 'react';
import { FiMail, FiUser, FiHome, FiCreditCard } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useHistory, useParams } from 'react-router-dom';
import { isUuid } from 'uuidv4';
import { OptionTypeBase } from 'react-select';
import { AnimationContainer } from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';
import getValidationErrors from '../../utils/getValidationErros';
import { useToast } from '../../hooks/toast';
import api from '../../services/api';
// import Select from '../../components/Select/index.js';
import MySelect from '../../components/Select';
import Dashboard from '../Dashboard';
import Checkbox from '../../components/Checkbox';
import { useAuth } from '../../hooks/auth';
import validateCPF from './validaCPF';

interface SignUpFormData {
  name: string;
  email: string;
  password?: string;
  transportadora_id: string;
  cpf: string;
  admin_flex: string;
  admin_transportadora: string;
  CheckBoxAdms: string[];
  selecTransportadora: string;
}

interface IUsuario {
  name: string;
  email: string;
  password?: string;
  transportadora_id: string;
  cpf: string;
  admin_flex: string;
  admin_transportadora: string;
  CheckBoxAdms: string[];
}

interface ITransportadoras {
  id: string;
  name: string;
}

interface ISelectOptions {
  label: string;
  value: string;
  selecionado: string;
}

interface CheckboxOption {
  id: string;
  value: string;
  label: string;
}

interface OptionOfSelect extends OptionTypeBase {
  value: string;
  label: string;
  selecionado: string;
}

const SignUp: React.FC = () => {
  const { user } = useAuth();
  const { admin_flex, admin_transportadora } = user;

  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const { id } = useParams();
  const history = useHistory();
  const [transportadoras, setTransportadoras] = useState<ISelectOptions[]>([]);
  const [checkboxDefault, setCheckboxDefault] = useState<string[]>([]);
  const [transportadoraID, setTransportadoraID] = useState<string>();
  const [usuario, setUsuario] = useState<IUsuario>();
  const [checkboxOptions, setCheckboxOptions] = useState<CheckboxOption[]>([]);

  // const checkboxOptions: CheckboxOption[] = [
  //   // {
  //   //   id: 'admin_transportadora',
  //   //   value: 'admin_transportadora',
  //   //   label: 'Adm Transportadora',
  //   // },
  //   // { id: "admin_flex", value: "admflex", label: "Adm FlexConsulta" } ,
  // ];

  useEffect(() => {
    if (usuario) {
      const admflex = {
        id: 'admin_flex',
        value: 'admin_flex',
        label: 'Adm FlexConsulta',
      };
      const admtranspobj = {
        id: 'admin_transportadora',
        value: 'admin_transportadora',
        label: 'Adm Transportadora',
      };

      const arrayLocal = [];

      if (usuario.admin_transportadora === 'S' || usuario.admin_flex === 'S') {
        arrayLocal.push(admtranspobj);
      }

      if (usuario.admin_flex === 'S') {
        arrayLocal.push(admflex);
      }

      setCheckboxOptions(arrayLocal);
    }
  }, [usuario]);

  useEffect(() => {
    //    { id: "admin_flex", value: "admflex", label: "Adm FlexConsulta" } ,

    if (isUuid(id)) {
      api
        .get<IUsuario>(`/users/show/${id}`) // http://localhost:3333/users/show/73d6f154-3197-425b-a5a1-e5ab22c3a49f
        .then(response => {
          const arr = [];

          arr.push(response.data.admin_flex === 'S' ? 'admin_flex' : '');
          arr.push(
            response.data.admin_transportadora === 'S'
              ? 'admin_transportadora'
              : '',
          );

          setCheckboxDefault(arr);
          setTransportadoraID(response.data.transportadora_id);
          setUsuario(response.data);
          //  console.log(response.data);
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
            label: transportadora.name,
            value: transportadora.id,
            selecionado: transportadora.id === transportadoraID ? 'sim' : 'não',
          };
        });
        setTransportadoras(temp);
      });
  }, [id, transportadoraID]);

  useEffect(() => {
    if (usuario) {
      formRef.current?.setData({
        name: usuario.name,
        email: usuario.email,
        cpf: usuario.cpf,
        transportadora_id: !handleGetTransp(transportadoras)
          ? []
          : handleGetTransp(transportadoras),
        admin_flex: usuario.admin_flex,
        admin_transportadora: usuario.admin_transportadora,
        CheckBoxAdms: checkboxOptions,
      });
      // console.log(usuario);
    }
  }, [usuario, transportadoras]);

  const handleGetTransp = (value: OptionOfSelect[]): OptionOfSelect => {
    const retorno = value.filter(res => {
      return res.selecionado === 'sim';
    });
    return retorno[0];
  };

  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigaório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          cpf: Yup.string()
            .length(11, 'Insira um CPF válido.')
            .test('is-valid', 'Insira um CPF válido.', value => {
              if (!value) return false;
              const cpf = value
                .replace('.', '')
                .replace('.', '')
                .replace('-', '');
              return validateCPF(cpf);
            }),
        });
        await schema.validate(data, {
          abortEarly: false,
        });

        data.admin_transportadora = data.CheckBoxAdms.includes(
          'admin_transportadora',
        )
          ? 'S'
          : 'N';
        data.admin_flex = data.CheckBoxAdms.includes('admin_flex') ? 'S' : 'N';

        delete data.CheckBoxAdms;

        console.log(data);

        if (isUuid(id)) {
          await api.put(`/profile/${id}`, data);
        } else {
          await api.post('/users', data);
        }

        history.push('/');

        addToast({
          type: 'success',
          title: 'Cadastro realizado!',
          description: 'Você já pode fazer seu logon no FlexConsulta',
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
        <Form
          ref={formRef}
          onSubmit={handleSubmit}
          initialData={{
            CheckBoxAdms: checkboxDefault,
          }}
        >
          <h1>Cadastro de Usuários</h1>

          {usuario &&
            (usuario.admin_flex === 'S' ||
              usuario.admin_transportadora === 'S') && (
              <Checkbox id={id} name="CheckBoxAdms" options={checkboxOptions} />
            )}

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

          <MySelect
            name="transportadora_id"
            placeholder="Transportadora"
            options={transportadoras}
            isMulti={false}
            icon={FiHome}
          />

          <Button type="submit">
            {isUuid(id) ? 'Atualizar' : 'Cadastrar'}
          </Button>
        </Form>
      </AnimationContainer>
    </Dashboard>
  );
};

export default SignUp;
