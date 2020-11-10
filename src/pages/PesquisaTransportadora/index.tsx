import React, {
  useEffect,
  useState,
  useCallback,
  useRef,
  ChangeEvent,
} from 'react';
import { FiSearch, FiFilePlus } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { useHistory } from 'react-router-dom';
import { Container, Content, Lista, InputPesquisa } from './styles';
import api from '../../services/api';
import Input from '../../components/Input';
import Dashboard from '../Dashboard';
import { AnimationContainer } from '../SignIn/styles';
import Button from '../../components/Button';

interface ITransportadoraFormData {
  name: string;
  email: string;
  contato: string;
  telefone: string;
}

interface ITransportadoras {
  id: string;
  name: string;
  avatar_url: string;
}

interface IPesquisaData {
  textoDigitado: string;
}

const PesquisaTransportadora: React.FC = () => {
  const [transportadoras, setTransportadoras] = useState<ITransportadoras[]>(
    [],
  );
  const formRef = useRef<FormHandles>(null);
  const [textoDigitado, setTextDigitado] = useState('');
  const history = useHistory();

  useEffect(() => {
    api
      .get<ITransportadoras[]>(
        '/transportadoras/172e5dcf-e99f-49ed-b9cb-bee53761b1da',
      )
      .then(response => {
        const temp = response.data.map(transportadora => {
          return {
            name: transportadora.name,
            id: transportadora.id,
            avatar_url: transportadora.avatar_url
              ? transportadora.avatar_url
              : 'https://www.flexconsulta.com.br/static/media/sign-in-background.d20fefa2.png',
          };
        });
        // filtrar aqui textoDigitado
        setTransportadoras(
          temp
            .filter(item =>
              item.name.toLowerCase().includes(textoDigitado.toLowerCase()),
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
        // console.log(transportadoras);
        //        console.log(textoDigitado);
      });
  }, [textoDigitado]);

  const handlePesquisa = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setTextDigitado(event.target.value);
  }, []);

  const handleOpenTransportadora = useCallback(
    (id: string) => {
      history.push(`/transportadoras/${id}`);
      //      console.log(`/transporadoras/${id}`);
    },
    [history],
  );

  return (
    <Dashboard>
      <Container>
        <Content>
          <AnimationContainer>
            <Form ref={formRef} onSubmit={() => {}}>
              <h1>Transportadora</h1>

              <InputPesquisa>
                <Input
                  name="name"
                  icon={FiSearch}
                  placeholder="Pesquise por nome"
                  type="text"
                  onChange={handlePesquisa}
                />
                <Button onClick={() => history.push('/transportadoras/new')}>
                  <FiFilePlus color="#000000" size="25px" />
                </Button>
              </InputPesquisa>

              <Lista>
                <ul className="items-grid">
                  {transportadoras.map(transportadora => (
                    <li
                      key={transportadora.id}
                      onClick={() =>
                        handleOpenTransportadora(transportadora.id)}
                    >
                      <img src={transportadora.avatar_url} alt="" />

                      {transportadora.name}
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

export default PesquisaTransportadora;
