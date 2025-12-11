import { CheckOutlined } from "@ant-design/icons";
import { Checkbox, Col, Form, Input, Modal, Row, Select, notification } from "antd";
import React, { useEffect, useState } from "react";
import api from "../../../services/api";

export default function ModalImportarEmpresa({ exibirModal, fecharModal }) {
    const [form] = Form.useForm();
    const [listaEmpresa, setListaEmpresa] = useState([]);

    const onCloseModal = () => {
        fecharModal();
    }

    const importar = () => {
        let odbc = form.getFieldValue().odbc;
        let empresa = form.getFieldValue().empresa;
        let locais = form.getFieldValue().impLocais;
        let usuarios = form.getFieldValue().impUsu;
        let dados = { 'odbc': odbc, 'empresa': empresa, 'locais': locais, 'usuarios': usuarios };
        api.post("Empresa/Importar", dados).then(
            res => {
                console.log(res);
            }
        ).catch(
            err => {
                console.log(err);
            }
        );
    }

    function buscarEmpresas() {
        let odbc = form.getFieldValue().odbc;
        if (odbc) {
            api.get(`Empresa/ListarOdbc?odbc=${odbc}`).then(
                res => {
                    if (res.data) {
                        setListaEmpresa(res.data);
                    } else {
                        notification.warn("Não foi possivel encontrar o banco de dados informado!");
                    }
                }
            ).catch(
                err => {
                    notification.warn("Não foi possivel encontrar o banco de dados informado!");
                }
            )
        } else {
            notification.warn("Informe o nome do ODBC");
        }
    }

    return (<Modal centered
        title="Importar Empresa"
        visible={exibirModal}
        onCancel={onCloseModal}
        onOk={importar}
        destroyOnClose
        okText={
            <>
                <CheckOutlined /> Importar
            </>
        }
        maskClosable={false}
    >
        <Form layout="vertical" name="formEmpresa" form={form}>
            <Row justify="center" gutter={[8, 0]}>
                <Col span={24}>
                    <Form.Item name="odbc" label="ODBC do Banco de Dados" >
                        <Input placeholder="Informe o ODBC do Banco de Dados" onBlur={buscarEmpresas} />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item name="empresa" label="Empresa">
                        <Select placeholder="Selecione a Empresa" >
                            {listaEmpresa.map((emp) => (<Select.Option value={emp.codigo} key={emp.codigo}>{emp.codigo} - {emp.nome}</Select.Option>))}
                        </Select>

                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={[8, 0]}>
                <Col span={12}>
                    <Form.Item name="impLocais" valuePropName="checked">
                        <Checkbox>Importar Todos Locais Ativos</Checkbox>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="impUsu" valuePropName="checked">
                        <Checkbox>Importar Todos Usuarios Ativos</Checkbox>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    </Modal>);
}
