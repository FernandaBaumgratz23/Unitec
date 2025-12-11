
import React from "react";
import { Row, Col } from "antd";

import { BreadcrumbPage, BotaoIncluirDados } from "..";

export default function BreadcrumbIncluirDados() {

    return (
        <div>
            <Row align="middle" justify="space-between" gutter={[8, 0]} className="col-pagina-breadcrumb">
                <Col className="col-w-100">
                    <BreadcrumbPage />
                </Col>
                <Col className="col-mob-100">
                    <Row align="middle" justify="end">
                        <Col>
                            <BotaoIncluirDados />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );

}