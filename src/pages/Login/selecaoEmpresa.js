import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Select, notification } from 'antd';

import api from '../../services/api';
import { login, setEmpresa, setLocal, setNomeEmpresa, setNomeLocal } from '../../services/auth';

export default function SelecoesEmpresa({ }) {
    const [codigoEmpresa, setCodigoEmpresa] = useState(null);
    const [codigoLocal, setCodigoLocal] = useState(null);
    const [formLogin] = Form.useForm();
    const [listaEmpresa, setListaEmpresa] = useState([]);
    const [listaLocais, setListaLocais] = useState([]);
    const acessar = values => {
        buscarTela();
    };

    useEffect(() => {
        buscarEmpresas();
    }, []);

    useEffect(() => {
        if (!!formLogin.getFieldValue()?.empresa) {
            carregarLocais(formLogin.getFieldValue()?.empresa);
            setCodigoEmpresa(formLogin.getFieldValue()?.empresa);
        }
    }, [formLogin.getFieldValue().empresa]);

    useEffect(() => {
        if (!!codigoLocal) {
            atualizarDadosToken();
        }
    }, [codigoLocal]);

    function buscarEmpresas() {
        api.get(`Empresa/BuscarEmpresasGw`).then(
            res => {
                if (!!res.data) {
                    setListaEmpresa(res.data);
                }
            }
        ).catch(
            err => {
                if (!!err) {
                    if (!!err.response && !!err.response.data) {
                        notification.error({ message: err.response.data || 'Falha ao efetuar o login' });
                    } else {
                        console.log(err);
                    }
                }
            }
        );
    }

    async function atualizarDadosToken() {
        let values = {};
        let dadosEmpresa = listaEmpresa.find(e => e.emp_id == codigoEmpresa);
        let dadosLocal = listaLocais.find(l => l.loc_id == codigoLocal);
        values.emp_id = codigoEmpresa;
        values.loc_id = codigoLocal;
        await api.post('Local/GerarTokenGW', values).then(res => {
            if (res.status === 200) {
                login(res.data);
                setEmpresa(codigoEmpresa);
                setLocal(codigoLocal);
                setNomeEmpresa(dadosEmpresa.emp_razaosocial);
                setNomeLocal(dadosLocal.loc_descricao);
                buscarTela();
            }
        }).catch(err => {
            if (!!err && !!err.response && !!err.response.data) {
                notification.error({ message: err.response.data || 'Falha ao efetuar o login' });
            } else {
                notification.error({ message: 'Falha ao efetuar o login', description: 'Verifique os dados informados e tente novamente.' });
            }
        });
    }

    function carregarLocais(codEmpresa) {
        api.get(`Local/Buscar?CodigoEmpresa=${codEmpresa}`).then(
            res => {
                if (!!res.data) {
                    setListaLocais(res.data);
                }
            }
        ).catch(
            err => {
                if (!!err) {
                    if (!!err.response && !!err.response.data) {
                        notification.error({ message: err.response.data || 'Falha ao efetuar o login' });
                    } else {
                        console.log(err);
                    }
                }
            }
        )
    }

    function buscarTela() {

        window.location = "/Home";

    };

    return (
        <div>
            <Form layout="vertical" name="login" size="middle" onFinish={acessar} form={formLogin}>
                <Row align="middle" gutter={[0, 16]}>
                    <Col span={24}>
                        <Form.Item name="empresa" label="Selecione sua Empresa">
                            <Select placeholder="Selecione uma empresa" optionFilterProp="children" onChange={(emp) => setCodigoEmpresa(emp)}>
                                {listaEmpresa.map(e => (
                                    <Select.Option value={e.emp_id} key={e.emp_id}>{e.emp_nomefantasia} <br /> Razao Social: {e.emp_razaosocial}  </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                {formLogin.getFieldValue()?.empresa && <Row align="middle" gutter={[0, 16]}>
                    <Col span={24}>
                        <Form.Item name="filial" label="Selecione seu local">
                            <Select placeholder="Selecione um Local" optionFilterProp="children" onChange={(loc) => { setCodigoLocal(loc) }}>
                                {listaLocais.map(loc => (
                                    <Select.Option key={loc.loc_id} value={loc.loc_id}>{loc.loc_descricao}</Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>}
            </Form>
        </div >
    );
}