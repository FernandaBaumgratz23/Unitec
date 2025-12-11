import { Checkbox, Col, Form, Input, Row, Select, Steps, Table, message, notification } from "antd";
import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { maskFormat } from "../../valueObjects";
import { TeamOutlined, UserOutlined } from "@ant-design/icons";

export default function ManutencaoEmpresa({ form, carregando, aoSalvar }) {
    const [listaEmpresa, setListaEmpresa] = useState([]);
    const [pagina, setPagina] = useState(0);
    const [listaLocais, setListaLocais] = useState([]);
    const [listaUsuarios, setListaUsuarios] = useState([]);
    const [disableEmp, setDisableEmp] = useState(true);
    const [disableUsu, setDisableUsu] = useState(true);
    const [listaLocaisCheck, setListaLocaisCheck] = useState([]);
    const [listaUsuariosCheck, setListaUsuariosCheck] = useState([]);
    const [listaKeyUsu, setListaKeyUsu] = useState([]);
    const [listaKeyLoc, setListaKeyLoc] = useState([]);

    /*
        Falta fazer: 
        *Verificar empresa ja cadastrada
    
    */

    useEffect(() => {
        if (listaEmpresa.length == 1) {
            form.setFieldsValue({ "empresa": listaEmpresa[0].codigo });
            BuscarDados();
        }
    }, [listaEmpresa]);

    const importar = record => {
        let odbc = record.odbc;
        let empresa = record.empresa;
        let seqUsu = record.usuario;
        let somenteEmail = record.somenteEmail;
        let locais = [...listaLocaisCheck];
        let usuarios = [...listaUsuariosCheck];
        if (locais.length === 0) {
            notification.warn({ message: "Favor selecione ao menos 1 local" });
            return;
        }
        if (usuarios.length === 0) {
            notification.warn({ message: "Favor selecione ao menos 1 usuário" });
            return;
        }
        let dados = { 'odbc': odbc, 'empresa': empresa, 'seqUsuario': seqUsu, 'locais': locais, 'usuarios': usuarios, 'comEmail': somenteEmail };
        carregando(true);
        api.post("Empresa/Importar", dados).then(
            res => {
                console.log(res);
                salvar();
            }
        ).catch(
            err => {
                console.log(err);
            }
        ).finally(
            () => {
                carregando(false);
            }
        );
    }

    function salvar() {
        setListaEmpresa([]);
        setPagina(0);
        setListaLocais([]);
        setListaUsuarios([]);
        setDisableEmp(true);
        setDisableUsu(true);
        setListaLocaisCheck([]);
        setListaUsuariosCheck([]);
        setListaKeyUsu([]);
        setListaKeyLoc([]);
        aoSalvar();
    }

    function buscarEmpresas() {
        let odbc = form.getFieldValue().odbc;
        if (odbc) {
            api.get(`Empresa/ListarOdbc?odbc=${odbc}`).then(
                res => {
                    if (res.data) {
                        setListaEmpresa(res.data);
                        setDisableEmp(false);
                    } else {
                        notification.warn({ message: "Não foi possivel encontrar o banco de dados informado!" });
                    }
                }
            ).catch(
                err => {
                    notification.warn({ message: "Não foi possivel encontrar o banco de dados informado!" });
                }
            )
        } else {
            notification.warn({ message: "Informe o nome do ODBC" });
        }
    }

    function BuscarDados() {

        BuscarLocais();
        BuscarUsuarios();
    }

    function BuscarLocais() {
        let empresa = form.getFieldValue().empresa;
        let odbc = form.getFieldValue().odbc;
        if (empresa) {
            api.get(`Local/BuscarPorEmpresa?empresa=${empresa}&odbc=${odbc}`).then(
                res => {
                    if (res.data) {
                        let idx = 0;
                        res.data.map(l => l.key = idx++);
                        setListaLocais(res.data);
                    }
                }
            ).catch(err => {
                console.log(err);
            });
        }
    }

    function BuscarUsuarios() {
        let emp = form.getFieldValue().empresa;
        let odbc = form.getFieldValue().odbc;
        api.get(`Usuario/Listar?empresa=${emp}&odbc=${odbc}`).then(
            res => {
                if (res.data) {
                    let idx = 0;
                    res.data.map(l => l.key = idx++)
                    setListaUsuarios(res.data);
                    setDisableUsu(false);
                }
            }
        ).catch(
            err => {
                console.log(err);
            }
        )
    }

    return (<div>
        <Form layout="vertical" name="formEmpresa" form={form} onFinish={importar}>
            <Row justify="start" gutter={[8, 8]}>
                <Col span={8}>
                    <Form.Item name="odbc" label="ODBC do Banco de Dados" rules={[{ required: true, message: 'Informe o nome do ODBC' }]} >
                        <Input placeholder="Informe o ODBC do Banco de Dados" onBlur={buscarEmpresas} />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item name="empresa" label="Empresa" rules={[{ required: true, message: 'Selecione a empresa' }]}>
                        <Select placeholder="Selecione a Empresa" onChange={BuscarDados} disabled={disableEmp}>
                            {listaEmpresa.map((emp) => (<Select.Option value={emp.codigo} key={emp.codigo}>{emp.codigo} - {emp.nome}</Select.Option>))}
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item name="usuario" label="Usuário da Empresa" rules={[{ required: true, message: 'Selecione o usuário' }]}>
                        <Select placeholder="Selecione o usuário" disabled={disableUsu} >
                            {listaUsuarios.map((usu) => (<Select.Option value={usu.sequencia} key={usu.key}>{usu.sequencia} - {usu.usuario}</Select.Option>))}
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row justify="start" gutter={[8, 8]}>
                <Col>
                    <Form.Item name="somenteEmail" valuePropName="checked">
                        <Checkbox>Somente usuários com email</Checkbox>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={[0, 24]}>
                <Col span={24}>
                    <Steps size="small" type="navigation" onChange={(e) => {
                        setPagina(e);
                        console.log("lista local :", listaKeyLoc)
                    }} current={pagina} items={[
                        {
                            title: 'Locais',
                            status: pagina > 0 ? 'finish' : 'process',

                        }, {
                            title: 'Usuários',
                            status: pagina == 1 ? 'finish' : 'process',
                            icon: <UserOutlined />
                        }
                    ]} />
                </Col>
            </Row>
            <Row gutter={[8, 24]}>
                <Col span={24}>
                    {pagina == 0 && <div className="tabela">
                        <Table dataSource={listaLocais} pagination={false}
                            columns={[
                                {
                                    title: "Código",
                                    align: "Center",
                                    render: ({ chave }) => (
                                        <div><b>{chave.codigo}</b></div>
                                    )
                                }, {
                                    title: "Local",
                                    render: ({ descricao }) => (
                                        <div><b>{descricao}</b></div>
                                    )
                                }, {
                                    title: "CNPJ",
                                    render: ({ cnpj }) => (
                                        <div><b>{maskFormat(cnpj, '', true)}</b></div>
                                    )
                                }
                            ]}
                            rowSelection={
                                {
                                    selectedRowKeys: listaKeyLoc, onChange: (selectedRowKeys, selectedRows) => {
                                        setListaLocaisCheck([...selectedRows]);
                                        setListaKeyLoc([...selectedRowKeys]);
                                    }
                                }
                            } />
                    </div>}
                    {pagina == 1 && <div className="tabela">
                        <Table dataSource={listaUsuarios} pagination={false} scroll={{ y: 500 }}
                            columns={
                                [
                                    {
                                        title: "Código",
                                        align: "Center",
                                        render: ({ sequencia }) => (
                                            <div><b>{sequencia}</b></div>
                                        )
                                    }, {
                                        title: "Usuário",
                                        render: ({ usuario }) => (
                                            <div><b>{usuario}</b></div>
                                        )
                                    }, {
                                        title: "Status",
                                        render: ({ status }) => (
                                            <div><b>{status}</b></div>
                                        )
                                    }
                                ]}
                            rowSelection={{
                                type: "checkbox", ...{
                                    selectedRowKeys: listaKeyUsu, onChange: (selectedRowKeys, selectedRows) => {
                                        setListaKeyUsu([...selectedRowKeys]);
                                        setListaUsuariosCheck([...selectedRows]);
                                    }
                                }
                            }} />
                    </div>}
                </Col>
            </Row>
        </Form>
    </div >
    );
}