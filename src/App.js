import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import moment from 'moment';
import { ConfigProvider } from 'antd';
import ptBR from 'antd/lib/locale/pt_BR';
import Circle from '@uiw/react-color-circle';

import './App.less';
import { StateProvider } from './state';
import { reducer } from './state/reducer';
import { isAuthenticated } from './services/auth';
import { Home, Login, LoginAdm } from './pages';
import Empresa from './pages/empresa';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);

function App() {
  moment.locale('pt-br');

  const initialState = {
    userConfig: { size: 'small' },
    ui: { showDrawer: false, showDrawerExtra: false },
    manutencao: { dados: null },
    listaSelectPaginacao: { itens: [] },
    listaTabelaDados: { itens: [] },
    listagem: { filtro: '', ordem: '', outrosFiltros: '' },
    tributacao: { empRegimeTributario: null, empEnquadramentoFiscal: null },
    parametrosEmpresa: { markupProduto: null, par_percjuromesparcelavencida: '', par_diastoleranciacobrancajuro: '', par_acaoparcelavencida: '' , par_diastolparcelavencida: '' }
  };

  const FormSizeDemo = () => {

    const [componentSize, setComponentSize] = useState('small');

    const [color, setColor] = useState({
      primaryColor: '#0053a6',
    });

    function onColorChange(nextColor) {
      const mergedNextColor = {
        ...color,
        ...nextColor,
      };
      setColor(mergedNextColor);
      ConfigProvider.config({
        theme: mergedNextColor,
      });

    }

    return (
      <ConfigProvider locale={ptBR} componentSize={componentSize}>
        <Circle
          colors={['#11a3b3', '#0053a6']}
          color={color.primaryColor}
          onChange={({ hex }) => {
            onColorChange({
              primaryColor: hex,
            });
          }}
        />
        <Router>
          <Switch>
            <Route exact path="/" component={Login} />
            <PrivateRoute path="/home" component={Home} />
            <Route exact path="/adm" component={LoginAdm} />
            <Route exact path="/empresa" component={Empresa} />
          </Switch>
        </Router>
      </ConfigProvider>
    )

  }

  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <FormSizeDemo />
    </StateProvider>
  );
}

export default App;
