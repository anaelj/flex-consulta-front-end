import React from 'react';

import { Container, Content, ListaViagens } from './styles';
import Dashboard from '../Dashboard';
import { AnimationContainer } from '../SignIn/styles';

const PesquisaUsuario: React.FC = () => {
  return (
    <Dashboard>
      <Container>
        <Content>
          <AnimationContainer>
            <ListaViagens>
              <h1>Motorista</h1>
              <div>
                <div>Nome: Anael Medeiros</div>
                <div>CPF: 954.743.581-72</div>
              </div>
              <h1>Viagem</h1>
              <div>
                <div>
                  <span> Data:</span> 23/10/2020
                </div>
                <div>
                  <span>Origem:</span> CAMPO GRANDE-MS
                </div>
                <div>
                  <span>Destino:</span> SANTOS-SP
                </div>
                <div>
                  <span>Placa:</span> HRO-2530 <span>Carreta:</span> HRO-2530
                </div>
                <div>
                  <span>Mercadoria:</span> Soja
                </div>
                <div>
                  <span>MDF-e Pendente:</span> Sim <span>Manifesto:</span> ????
                </div>
              </div>
              <h1>Viagem</h1>
              <div>
                <div>Data: 23/10/2020</div>
                <div>Origem: CAMPO GRANDE-MS</div>
                <div>Destino: SANTOS-SP</div>
                <div>Placa: HRO-2530 Carreta: HRO-2530</div>
                <div>Mercadoria: Soja</div>
                <div>MDF-e Pendente: Sim Manifesto: ????</div>
              </div>
              <h1>Viagem</h1>
              <div>
                <div>Data: 23/10/2020</div>
                <div>Origem: CAMPO GRANDE-MS</div>
                <div>Destino: SANTOS-SP</div>
                <div>Placa: HRO-2530 Carreta: HRO-2530</div>
                <div>Mercadoria: Soja</div>
                <div>MDF-e Pendente: Sim Manifesto: ????</div>
              </div>
            </ListaViagens>
          </AnimationContainer>
        </Content>
      </Container>
    </Dashboard>
  );
};

export default PesquisaUsuario;
