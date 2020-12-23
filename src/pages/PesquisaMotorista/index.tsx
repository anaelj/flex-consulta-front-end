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

// sobre o mdfe e o manifesto pendente, como fazer quando estiver pendente com uma transportadora e nao tiver pendente com outra transportadora e como identificar isso no sat

interface IDriver {
  id: string;
  name: string;
  cpf: string;
}

interface IPesquisaData {
  textoDigitado: string;
}

const PesquisaUsuario: React.FC = () => {
  const [drivers, setDrivers] = useState<IDriver[]>([]);
  const formRef = useRef<FormHandles>(null);
  const [textoDigitado, setTextDigitado] = useState('');
  const history = useHistory();

  useEffect(() => {
    async function fetchAPI() {
      if (textoDigitado !== '' && textoDigitado.length >= 3) {
        api
          .get<IDriver[]>(
            `/drivers/${textoDigitado.toUpperCase()}/${textoDigitado.toUpperCase()}`,
          )
          .then(response => {
            const temp = response.data.map(driver => {
              return {
                name: driver.name,
                id: driver.id,
                cpf: driver.cpf,
              };
            });

            // filtrar aqui textoDigitado
            //            console.log(temp);
            if (temp.length === 0) {
              setDrivers([
                {
                  name: 'Nenhum motorista encontrado!',
                  id: '0',
                  cpf: '',
                },
              ]);
            } else {
              setDrivers(
                temp.filter(
                  item =>
                    item.name
                      .toLowerCase()
                      .includes(textoDigitado.toLowerCase()) ||
                    (item.cpf && item.cpf.includes(textoDigitado)),
                ),
                // // .sort(function (a, b) {
                // //   if (a.name > b.name) {
                // //     return 1;
                // //   }
                // //   if (a.name < b.name) {
                // //     return -1;
                // //   }
                // //   return 0;
                // }),
              );
            }
            // console.log(Usuarios);
            //        console.log(textoDigitado);
          });
      }
    }

    fetchAPI();
  }, [textoDigitado]);

  const handlePesquisa = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setTextDigitado(event.target.value);
  }, []);

  const handleOpenViagens = useCallback(
    //  history.push(`/listtravels/${cpfmotorista}`);

    (cpfmotorista: string, drivername: string) => {
      history.push({
        pathname: '/listtravels',
        state: { cpf: cpfmotorista, name: drivername },
      });
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
                  {drivers.map(driver => (
                    <li
                      key={driver.id}
                      onClick={() => handleOpenViagens(driver.cpf, driver.name)}
                    >
                      <img src="" alt="" />
                      <div>
                        <span> {driver.name} </span>
                        <span> {driver.cpf} </span>
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
