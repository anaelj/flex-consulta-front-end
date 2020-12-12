import React, {
  useEffect,
  useState,
  useCallback,
  useRef,
  ChangeEvent,
} from 'react';
import { FiSearch } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { useHistory } from 'react-router-dom';
import { Container, Content, Lista, InputPesquisa } from './styles';
import api from '../../services/api';
import Input from '../../components/Input';
import Dashboard from '../Dashboard';
import { AnimationContainer } from '../SignIn/styles';

interface IUsuarios {
  id: string;
  name: string;
  cpf: string;
  avatar_url: string;
}

interface IPesquisaData {
  textoDigitado: string;
}

const PesquisaUsuario: React.FC = () => {
  const [usuarios, setUsuarios] = useState<IUsuarios[]>([]);
  const formRef = useRef<FormHandles>(null);
  const [textoDigitado, setTextDigitado] = useState('');
  const history = useHistory();
  useEffect(() => {
    api
      .get<IUsuarios[]>('/users/172e5dcf-e99f-49ed-b9cb-bee53761b1da')
      .then(response => {
        const temp = response.data.map(usuario => {
          return {
            name: usuario.name,
            id: usuario.id,
            cpf: usuario.cpf,
            avatar_url: usuario.avatar_url
              ? usuario.avatar_url
              : 'https://www.flexconsulta.com.br/static/media/sign-in-background.d20fefa2.png',
          };
        });
        // filtrar aqui textoDigitado
        setUsuarios(
          temp
            .filter(
              item =>
                item.name.toLowerCase().includes(textoDigitado.toLowerCase()) ||
                (item.cpf && item.cpf.includes(textoDigitado)),
            )
            .sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (a.name < b.name) {
                return -1;
              }
              return 0;
            }),
        );
        // console.log(Usuarios);
        //        console.log(textoDigitado);
      });
  }, [textoDigitado]);

  const handlePesquisa = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setTextDigitado(event.target.value);
  }, []);

  const handleOpenViagens = useCallback(
    (id_motorista: string) => {
      history.push(`/listaviagens/${id_motorista}`);
    },
    [history],
  );

  return (
    <Dashboard>
      <Container>
        <Content>
          <AnimationContainer>
            <Form ref={formRef} onSubmit={() => {}}>
              <h1>Motoristas</h1>

              <InputPesquisa>
                <Input
                  name="name"
                  icon={FiSearch}
                  placeholder="Informe nome ou CPF"
                  type="text"
                  onChange={handlePesquisa}
                />
              </InputPesquisa>

              <Lista>
                <ul className="items-grid">
                  {usuarios.map(usuario => (
                    <li
                      key={usuario.id}
                      onClick={() => handleOpenViagens(usuario.id)}
                    >
                      <img src={usuario.avatar_url} alt="" />
                      <div>
                        <span> {usuario.name} </span>
                        <span> {usuario.cpf} </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </Lista>
            </Form>
          </AnimationContainer>
        </Content>
      </Container>
    </Dashboard>
  );
};

export default PesquisaUsuario;
