import { Breadcrumb, Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { HomeOutlined } from "@ant-design/icons";


export default function BreadcrumbPage({ listaTitulo }) {
    const [breadcrumb] = useState((localStorage.getItem('@GestorErp-Breadcrumb') !== null) ? localStorage.getItem('@GestorErp-Breadcrumb') : '');
    const [htmlBreadcrumb, setHtmlBreadcrumb] = useState('');
    let location = useLocation();

    function MontaBreadcrumb() {
        let arrBreadcrumb = breadcrumb.substring(1).split(['|']);
        if (location.pathname === "/") {
            arrBreadcrumb = ['Home']
        }

        setHtmlBreadcrumb(
            arrBreadcrumb.map((pathname, index) => (
                <Breadcrumb.Item key={index}>
                    {arrBreadcrumb.length == index + 1 ? <b className="f-18">{pathname}</b> : pathname}
                </Breadcrumb.Item>
            ))
        );
    };

    useEffect(() => { MontaBreadcrumb() }, [breadcrumb]);
    useEffect(() => { MontaBreadcrumb() }, []);
    
    return (
        <>
            <Row align="middle" gutter={[8, 0]} className="col-pagina-breadcrumb">
                <Col className="col-w-100">
                    <Breadcrumb>
                        <Breadcrumb.Item key="home">
                            <Link to="/">
                                <HomeOutlined />
                            </Link>
                        </Breadcrumb.Item>
                        {htmlBreadcrumb}
                    </Breadcrumb>
                </Col>
            </Row>
        </>
    );
}