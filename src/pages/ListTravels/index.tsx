import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { parseISO, format } from 'date-fns';
import { Container, Content, ListaViagens } from './styles';
import Dashboard from '../Dashboard';
import { AnimationContainer } from '../SignIn/styles';
import api from '../../services/api';
import { useAuth } from '../../hooks/auth';

interface ILocationState {
  cpf: string;
  name: string;
}

interface ITravel {
  cte: string;
  numeroviagem: string;
  origem: string;
  destino: string;
  mercadoria: string;
  placa: string;
  data: string;
  transportadora_id: string;
  transportadora: { name: string };
}

const ListTravels: React.FC = () => {
  const [travels, setTravels] = useState<ITravel[]>([]);
  const { state } = useLocation<ILocationState>();
  //  const { cpf } = useParams<IParams>();
  const { cpf, name } = state;
  const { user } = useAuth();

  // console.log(cpf);
  // console.log(name);

  //  const cpfmotorista = cpf;

  useEffect(() => {
    api.get<ITravel[]>(`/travels/${cpf}`).then(response => {
      const travelsFromDriver = response.data.map(travel => {
        return {
          cte: travel.cte,
          numeroviagem: travel.numeroviagem,
          origem: travel.origem,
          destino: travel.destino,
          mercadoria: travel.mercadoria,
          placa: travel.placa,
          data: format(parseISO(travel.data), 'dd/MM/yyyy'),
          transportadora_id: travel.transportadora_id,
          transportadora: travel.transportadora,
        };
      });
      setTravels(travelsFromDriver);
    });
  }, [cpf]);

  return (
    <Dashboard>
      <Container>
        <Content>
          <AnimationContainer>
            <ListaViagens>
              <h1>Motorista</h1>
              <div>
                <div>Nome: {name}</div>
                <div>CPF: {cpf}</div>
              </div>
              <h1>Viagem</h1>

              {travels.map(travel => (
                <div>
                  <div>
                    <span> Transportadora:</span>
                    {user.admin_flex === 'S' ? (
                      <label>{travel.transportadora.name}</label>
                    ) : (
                      <label>{travel.transportadora_id}</label>
                    )}
                  </div>
                  <div>
                    <span> Data:</span> {travel.data}
                  </div>
                  <div>
                    <span>Origem:</span> {travel.origem}
                  </div>
                  <div>
                    <span>Destino:</span> {travel.destino}
                  </div>
                  <div>
                    <span>Placas:</span> {travel.placa}
                  </div>
                  <div>
                    <span>Mercadoria:</span> {travel.mercadoria}
                  </div>
                  {/* <div>
                    <span>MDF-e Pendente:</span> - <span>Manifesto:</span>-
                  </div> */}
                </div>
              ))}
            </ListaViagens>
          </AnimationContainer>
        </Content>
      </Container>
    </Dashboard>
  );
};

export default ListTravels;
