import React, { useState, useEffect } from "react";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import "./index.less";
import api from "../../services/api";
import { setBreadcrumb } from "../../services/auth";
import { Icon } from '@ant-design/compatible';
import { useStateValue } from "../../state";
import { listagemActions } from "../../actions";


export default function MenuPage({ incollapsed }) {
    const [{ }, dispatch] = useStateValue();
    const [listaMenu, setListaMenu] = useState([]);
    const [openKeys, setOpenKeys] = useState([]);
    const rootKeys = ["sub0", "sub1", "sub2", "sub3", "sub4", "sub5", "sub6", "sub7", "sub8", "sub9", "sub10", "sub11", "sub12", "sub13", "sub14", "sub15", "sub16", "sub17", "sub18"];

    const onOpenChange = (items) => {
        const latestOpenKey = items.find((key) => openKeys.indexOf(key) === -1);
        if (rootKeys.indexOf(latestOpenKey) === -1) {
            setOpenKeys(items);
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : openKeys);
        }
    };

    function CarregaMenu() {
        api.get(`Menu/Buscar?idModulo=4`).then(
            (res) => {
                if (res.status === 200) {
                    let dados = [...res.data];
                    dados.map((info, idx, arr) => info.key = idx);
                    setListaMenu(dados);
                }
            }
        ).catch((erro) => console.error(erro));

    }

    function AtzBreadcrumb(item) {
        setBreadcrumb(item.item.props.id);
        dispatch({ type: listagemActions.CHANGE, data: { ordem: '' ,outrosFiltros: ''} });
    }

    useEffect(() => {
        CarregaMenu()
    }, []);

    useEffect(() => {
        if (!incollapsed) {
            setOpenKeys(openKeys);
        }
    }, [openKeys, incollapsed]);

    return (
        <Layout.Sider breakpoint="lg" collapsedWidth="0" className="menu-lateral" theme="light">
            <Menu theme={"light"} mode="inline" defaultSelectedKeys={["0"]} onOpenChange={onOpenChange} openKeys={openKeys} >
                <Menu.SubMenu key={`sub0`} id={`sub0`}   onTitleClick={() => {
                    window.location = "/Home#/"
                }}
                    title={
                        <span>
                            <Icon type={"Home"} />
                            <span> Home </span>
                        </span>
                    } className="home">
                </Menu.SubMenu>
                {listaMenu.map(menu => (
                    <Menu.SubMenu key={`sub${menu.ordemMenu}`}
                        id={`sub${menu.ordemMenu}`}
                        title={
                            <span>
                                <Icon type={menu.icone} />
                                <span> {menu.titulo} </span>
                            </span>
                        }>
                        {menu.subMenu.map(
                            itemMenu => {
                                return itemMenu.pagina?.substring(0, 4) !== 'http' ?
                                    (
                                        <Menu.Item key={itemMenu.key} onClick={(e) => AtzBreadcrumb(e)} id={"|" + menu.titulo + "|" + itemMenu.titulo} >
                                            <Link to={itemMenu.pagina} >
                                                <span>
                                                    <Icon type={(!!itemMenu.icone ? itemMenu.icone : "DoubleRight")} />
                                                    <span>{itemMenu.titulo}</span>
                                                </span>
                                            </Link>
                                        </Menu.Item>
                                    ) :
                                    (
                                        <div className="ant-menu-item ant-menu-item-only-child">
                                            <a href={itemMenu.pagina} target="_blank" rel="noreferrer">
                                                <Icon type={(!!itemMenu.icone ? itemMenu.icone : "DoubleRight")} /> {itemMenu.titulo}
                                            </a>
                                        </div>
                                    )
                            })
                        }
                    </Menu.SubMenu>
                ))}
            </Menu>
        </Layout.Sider>

    );

}