import { Button, Col, Dropdown, Form, Menu, Popover, Row, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { BreadcrumbPage, FiltroBusca, FiltroOrdenacao, TabelaPaginada } from "../../components";
import { FileDoneOutlined, InfoCircleOutlined, MoreOutlined, PlusOutlined } from "@ant-design/icons";
import DrawerEmpresa from "./drawer";
import { useStateValue } from "../../state";
import { drawerActions } from "../../actions";
import { ModalImportarEmpresa } from "../../components/modals";
import BreadcrumbIncluirDados from "../../components/breadcrumbIncluirDados";

export default function Empresa() {
    const [formPesquisa] = Form.useForm();
    const [{ ui, manutencao }, dispatch] = useStateValue();
    const [exibirModal, setExibirModal] = useState(false);

    function menuEmitir() {
        return (
            <Menu className="text-right">
                <Menu.Item key="1">
                    <Button type="text" onClick={() => {
                        dispatch({ type: drawerActions.CHANGE, data: { showDrawer: true, editItem: false } });
                    }} icon={<PlusOutlined />}>
                        Cadastrar Nova Empresa
                    </Button>
                </Menu.Item>
                <Menu.Item key="2">
                    <Button type="text" onClick={() => {
                        setExibirModal(true);
                    }} icon={<FileDoneOutlined />}>
                        Importar do Gestor Desktop
                    </Button>
                </Menu.Item>
            </Menu>
        )
    };

    return (
        <div className="p-10">
            <BreadcrumbIncluirDados />
            <Form layout="vertical" name="formularioPesqAvancada" form={formPesquisa} >
                <Row gutter={[8, 0]}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={14} xxl={16}>
                        <Row align="middle" gutter={[8, 0]}>
                            <Col xs={24} sm={17} md={17} lg={19} xl={19} xxl={19}>
                                <FiltroBusca ordem={"+emp_razaosocial"} />
                            </Col>
                            <Col xs={24} sm={7} md={7} lg={5} xl={5} xxl={5}>
                                <FiltroOrdenacao opcoesOrdenacao={[
                                    { label: "Descrição A - Z", value: "+emp_razaosocial" },
                                    { label: "Descrição Z - A", value: "-emp_razaosocial" },
                                    { label: "Código Crescente", value: "+emp_id" },
                                    { label: "Código Decrescente", value: "-emp_id" }
                                ]} />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Form>
            <div className="tabela">
                <TabelaPaginada url="Empresa/Listar" colunas={[
                    {
                        title: 'Código',
                        width: 75,
                        align: 'center',
                        render: ({ emp_id, emp_ativa }) => (
                            <Popover content={emp_ativa ? 'Ativo' : 'Inativo'} placement="right">
                                <Tag color={emp_ativa ? 'processing' : 'default'} className="w-100">
                                    <b>{emp_id}</b>
                                </Tag>
                            </Popover>
                        ),
                    }, {
                        title: "Razão Social",
                        render: ({ emp_razaosocial }) => (
                            <div>
                                <b>{emp_razaosocial}</b>
                            </div>
                        )
                    }, {
                        title: "Nome Fantasia",
                        render: ({ emp_nomefantasia }) => (
                            <div>
                                {emp_nomefantasia}
                            </div>
                        )
                    }, {
                        title: "Chave Integração",
                        align: "Center",
                        render: ({ codigo_integracao }) => (
                            <div>{codigo_integracao}</div>
                        )
                    }, {
                        title: "ODBC",
                        align: "Center",
                        render: ({ emp_odbc }) => (
                            <div><b>{emp_odbc}</b></div>
                        )
                    },
                    {
                        title: 'Ações',
                        dataIndex: '',
                        key: 'x',
                        align: 'center',
                        width: 95,
                        fixed: 'right',
                        render: (emp) => (
                            <div>
                                <Button icon={<InfoCircleOutlined />} />
                            </div>
                        ),
                    },
                ]} />
            </div>
            <DrawerEmpresa />
            <ModalImportarEmpresa exibirModal={exibirModal} fecharModal={() => setExibirModal(false)} />
        </div>
    );
}