import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Col, Form, Input, Layout, Row, Typography, notification } from 'antd';
import { DesktopOutlined, EnvironmentOutlined, MailOutlined, PhoneOutlined, SendOutlined, SmileOutlined, UnlockFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import { encodeBase64, parseToken } from '../../services/funcoes';
import api from '../../services/api';
import SlideLogin from '../../components/slideLogin';
import { login, removerLocal, setEmailUsuario, setIdUsuario, setNomeUsuario, setSeqUsuario } from '../../services/auth';
import { EsqueciSenha, SelecoesEmpresa } from './pages';

export default function Login() {
    const FORMULARIO = {
        LOGIN: 1,
        SELECIONA_EMPRESA: 2,
        ESQUECI_SENHA: 3,
    }

    const [formularioExibir, setFormularioExibir] = useState(FORMULARIO.LOGIN);
    const [carregando, setCarregando] = useState(false);
    const [formulario] = Form.useForm();

    const onFinish = values => {
        setCarregando(true);
        values.senha = encodeBase64(values.senha);
        delete values.remember;
        api.post('Login/EfetuarLoginWeb', values).then(res => {
            if (res.status === 200) {
                const token = res.data;
                let dadosUsuario = parseToken(res.data);
                setNomeUsuario(dadosUsuario.name);
                setIdUsuario(dadosUsuario.SequenciaUsu);
                setEmailUsuario(dadosUsuario.email);
                login(token);
                removerLocal();
                setFormularioExibir(FORMULARIO.SELECIONA_EMPRESA);
            }
        }).catch(err => {
            if (!!err) {
                if (!!err.response && !!err.response.data) {
                    notification.error({ message: err.response.data || 'Falha ao efetuar o login' });
                } else {
                    notification.error({ message: 'Falha ao efetuar o login', description: 'Verifique os dados informados e tente novamente.' });
                }
            } else {
                notification.error({ message: 'Falha ao efetuar o login', description: 'Verifique os dados informados e tente novamente.' });
            }
        }).finally(() => setCarregando(false));
    };

    useEffect(() => {
        localStorage.removeItem("@GestorErp-Token");
    }, []);

    return (
        <Layout className="vh100">
            <Layout.Content>
                <Row justify="center" className="vh100">
                    <Col className="vh100 fixed-left">
                        <SlideLogin />
                    </Col>
                    <Col className="vh100 fixed-right">
                        <Row align="middle" justify="center" className="vh100" gutter={[16, 16]}>
                            <Col span={18}>
                                <Row align="middle" justify="center" gutter={[0, 16]}>
                                    <Col>
                                        <img src={require("../../assets/logoGestor.png")} width="260" alt="Gestor Web" />
                                    </Col>
                                    <Col span={24}>
                                        <Typography.Text>
                                            Identifique abaixo suas credenciais para realizar o acesso. <br /><br />
                                        </Typography.Text>
                                    </Col>
                                </Row>
                                {formularioExibir === FORMULARIO.LOGIN &&
                                    <Form form={formulario} layout="vertical" name="login" initialValues={{ remember: true }} size="middle" onFinish={onFinish}>
                                        <Row gutter={[0, 8]}>
                                            <Col span={24}>
                                                <Form.Item name="usuario" rules={[{ required: true, message: 'Informe seu usuario para realizar o login.' }]}>
                                                    <Input placeholder="Informe seu usuario" prefix={<MailOutlined />} />
                                                </Form.Item>
                                            </Col>
                                            <Col span={24}>
                                                <Form.Item name="senha" rules={[{ required: true, message: 'Informe sua senha de acesso.' }]}>
                                                    <Input.Password placeholder="Informe sua senha" prefix={<UnlockFilled />} />
                                                </Form.Item>
                                            </Col>
                                            <Col span={24}>
                                                <Row align="middle" justify="space-between" gutter={[8, 16]}>
                                                    <Col>
                                                        <Form.Item name="remember" valuePropName="checked">
                                                            <Checkbox>Salvar meus dados de login</Checkbox>
                                                        </Form.Item>
                                                    </Col>
                                                    <Col>
                                                        <Form.Item>
                                                            <Button type="primary" loading={carregando} size="large" htmlType="submit">
                                                                Acessar <SendOutlined />
                                                            </Button>
                                                        </Form.Item>
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col span={24}>
                                                <Row align="middle" justify="center" gutter={[8, 0]}>
                                                   
                                                    <Col>
                                                        <Button type="primary" onClick={() => setFormularioExibir(FORMULARIO.ESQUECI_SENHA)} size="small">
                                                            Esqueci minha senha <UnlockFilled />
                                                        </Button>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </Form>
                                }
                                {formularioExibir === FORMULARIO.SELECIONA_EMPRESA && <SelecoesEmpresa />}
                                {formularioExibir === FORMULARIO.ESQUECI_SENHA && <EsqueciSenha formulario={formulario} onAcessar={() => setFormularioExibir(FORMULARIO.LOGIN)} />}
                            </Col>
                        </Row>
                        <Row align="middle" justify="center" className="rodape-login-copyright">
                            <Col>
                                <Row align="middle" justify="center" gutter={[8, 0]}>
                                    <Col>
                                        <DesktopOutlined />
                                        <Typography.Link href="https://www.gestorweb.com.br/" target="_blank" underline> www.gestorweb.com.br</Typography.Link> | <PhoneOutlined /> (55) 3535-4900
                                    </Col>
                                    <Col>
                                        | <EnvironmentOutlined /> Três de Maio - RS - 98910-000
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={24} align="center">
                                Todos os direitos reservados - Gestor Web ®
                            </Col>
                        </Row>
                    </Col>
                </Row>

            </Layout.Content>
        </Layout>
    );
}
