import React, { useEffect } from 'react';
import { Route, Switch, HashRouter } from "react-router-dom";
import { Layout } from "antd";

import { HeaderPage, MenuPage } from '../../components';
import { Catalogo, Empresa, Inicial, Login, LoginAdm } from '../';
import Usuario from '../usuario';
import Local from '../local';

export default function Home() {
    return (
        <HashRouter>
            <div className="App">
                <Layout className="vh100">
                    <HeaderPage />
                    <Layout className="vh100 m-t-55">
                        <MenuPage />
                        <Layout className="site-layout">
                            <Layout.Content>
                                <Switch>
                                    <Route exact path="/login" component={Login} />
                                    <Route exact path="/" component={Inicial} />
                                    <Route exact path="/catalogo" component={Catalogo} />
                                    <Route exact path="/login" component={LoginAdm} />
                                    <Route exact path="/empresas" component={Empresa} />
                                    <Route exact path="/usuario" component={Usuario} />
                                    <Route exact path="/local" component={Local} />
                                </Switch>
                            </Layout.Content>
                        </Layout>
                    </Layout>
                </Layout>
            </div>
        </HashRouter>
    );
}