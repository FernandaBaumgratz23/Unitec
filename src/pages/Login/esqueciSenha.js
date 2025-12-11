import React, { useState } from 'react';
import { Row, Col, Form, Input, Button, notification } from 'antd';
import { MailOutlined, ArrowLeftOutlined, SendOutlined } from '@ant-design/icons';
import api from '../../services/api';

export default function EsqueciSenha({ onAcessar, formulario }) {


    function enviarEmailRecuperarSenha() {
        let emailUsuario = formulario.getFieldValue().email;
        if (!!emailUsuario) {
            api.put(`Usuario/EnviarEmailRecuperarSenha/${emailUsuario}`).then(
                res => {
                    notification.success({ message: 'Operação concluída', description: "Enviamos um E-mail para você com as instruções para recuperar sua senha!" })
                }
            ).catch(
                error => {
                    notification.warning({ message: `AVISO!`, description: `Usuário não encontrado!` });
                }
            )
        }

    }

    return (
        <div>
            <Form form={formulario} name="login" size="middle">
                <Row align="middle" gutter={[0, 16]}>
                    <Col span={24}>
                        <Form.Item name="email" rules={[{ required: true, message: 'Informe seu e-mail para recuperar sua senha.' }]}>
                            <Input placeholder="Informe seu e-mail para recuperar sua senha" prefix={<MailOutlined />} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row align="middle" justify="space-between" gutter={[8, 16]}>
                    <Col>
                        <Form.Item>
                            <Button htmlType="button" onClick={() => onAcessar()} icon={<ArrowLeftOutlined />}>
                                Acessar
                            </Button>
                        </Form.Item>
                    </Col>
                    <Col>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" onClick={() => enviarEmailRecuperarSenha()} size="large">
                                Recuperar Senha <SendOutlined />
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </div>
    );
}