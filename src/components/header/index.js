import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Layout, Menu, Tooltip, Button, Avatar, Dropdown } from "antd";
import { SettingFilled, DeleteOutlined, LogoutOutlined, ExpandOutlined } from '@ant-design/icons';
import { useFullScreen } from 'react-browser-hooks';
import Circle from '@uiw/react-color-circle';

import "./index.less";
import { ModalEmpresaFilial } from "../../components/modals/";
import { logout, getNomeEmpresa, getNomeLocal, getNomeUsuario, getStatusFilial } from '../../services/auth';

export default function HeaderPage() {
    const [openModalEmpresaFilial, setOpenModalEmpresaFilial] = useState(false);
    const { toggle } = useFullScreen();
    const [color, setColor] = useState({
        primaryColor: '#0053a6',
    });
    const [image, setImage] = useState(false);

    function onColorChange(nextColor) {
        const mergedNextColor = {
            ...color,
            ...nextColor,
        };
        setColor(mergedNextColor);
    }
    const menuUsuario = (

        <Menu className="col-avatar text-right">

            <Menu.Item key="1">
                <Button type="text">
                    <Link to="/parametrosEmpresa">
                        <SettingFilled /> Configurações
                    </Link>
                </Button>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="2">
                <Button type="text">
                    <DeleteOutlined /> Limpar Cache
                </Button>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="3">
                <Button type="text" onClick={() => logout()} block className="text-right">
                    <LogoutOutlined /> Sair
                </Button>
            </Menu.Item>
        </Menu>
    );

    const avatar = useMemo(() => {
        return (<Avatar size="large" src={image} />);
    }, [image]);

    return (
        <Layout.Header>
            <Row align="middle" gutter={[8, 0]}>
                <Col xl={16} lg={13} md={11} sm={12} xs={7}>
                    <Row align="middle" gutter={[8, 0]}>
                        <Col xxl={4} xl={5} lg={8} md={9} sm={24} xs={24} className="logo-page text-center">
                            <Link to="/">
                                <img src={require("../../assets/logoGestorWhite.png")} width="145" alt="Gestor Web" />
                            </Link>
                        </Col>
                        <Col xxl={16} xl={14} lg={16} md={15} className="hd-col">
                            <div className="w-100 f-14">
                                <span>
                                    Usuário:<b> {getNomeUsuario()} </b>
                                </span>
                            </div>
                            <div className="w-100">
                                <Tooltip title="Deseja Alterar a Empresa? Clique aqui!" placement="bottom" className="over">
                                    <span>
                                        Você está acessado a empresa: &nbsp;
                                    </span>
                                    <Button type="text" onClick={() => setOpenModalEmpresaFilial(true)} className="btn-overflow emp">
                                        <u>{`${getNomeEmpresa()} / ${getNomeLocal()}`}</u>
                                    </Button>
                                </Tooltip>
                            </div>
                        </Col>

                    </Row>
                </Col>
                <Col xl={8} lg={11} md={13} sm={12} xs={17} className="text-right">

                    <Tooltip title="Alterar para Tela Cheia" placement="bottom">
                        <Button type="text" onClick={toggle}>
                            <ExpandOutlined />
                        </Button>
                    </Tooltip>
                    <Circle
                        colors={['#11a3b3', '#0053a6']}
                        color={color.primaryColor}
                        onChange={({ hex }) => {
                            onColorChange({
                                primaryColor: hex,
                            });
                        }}
                    />
                    <Dropdown overlay={menuUsuario} trigger={['click']} placement="bottomRight" arrow>
                        <span className="p-l-5">
                            {avatar}
                        </span>
                    </Dropdown>
                </Col>

            </Row>
            <ModalEmpresaFilial exibirModalEmpresaFilial={openModalEmpresaFilial} fecharModalEmpresaFilial={() => setOpenModalEmpresaFilial(false)} />

        </Layout.Header>

    );

}