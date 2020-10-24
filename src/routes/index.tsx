import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Routes';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Dashboard from '../pages/Dashboard';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';
import Profile from '../pages/Profile';
import PesquisaTransportadora from '../pages/PesquisaTransportadora';
import Transportadora from '../pages/Transportadoras';
import PesquisaUsuario from '../pages/PesquisaUsuario';
import PesquisaMotorista from '../pages/PesquisaMotorista';
import ListaViagens from '../pages/ListaViagens';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/forgot-password" exact component={ForgotPassword} />
    <Route path="/reset-password" exact component={ResetPassword} />

    <Route path="/signup/:id" exact component={SignUp} isPrivate />
    <Route path="/dashboard" exact component={Dashboard} isPrivate />
    <Route path="/profile" exact component={Profile} isPrivate />
    <Route
      path="/transportadoras/:id"
      exact
      component={Transportadora}
      isPrivate
    />
    <Route
      path="/pesquisatransportadora"
      exact
      component={PesquisaTransportadora}
      isPrivate
    />
    <Route
      path="/pesquisausuario"
      exact
      component={PesquisaUsuario}
      isPrivate
    />
    <Route
      path="/pesquisamotorista"
      exact
      component={PesquisaMotorista}
      isPrivate
    />
    <Route path="/listaviagens/:id" exact component={ListaViagens} isPrivate />
  </Switch>
);

export default Routes;
