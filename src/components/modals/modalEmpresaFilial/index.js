import React from "react";
import { Row, Col, Typography, Modal } from "antd";
import { CheckOutlined } from "@ant-design/icons";

import { getNomeEmpresa, getNomeLocal } from '../../../services/auth';
import SelecoesEmpresa from "../../../pages/Login/selecaoEmpresa";

export default function ModalEmpresaFilial({ exibirModalEmpresaFilial, fecharModalEmpresaFilial }) {

    const onCloseModal = () => {
        fecharModalEmpresaFilial()
    };

    return (

        <Modal centered
            title="Empresas/Filiais"
            visible={exibirModalEmpresaFilial}
            onCancel={onCloseModal}
            onOk={onCloseModal}
            destroyOnClose
            okText={
                <>
                    <CheckOutlined /> Alterar Acesso
                </>
            }
            footer={null}
            maskClosable={false}
        >
            <Row align="middle" gutter={[0, 8]}>
                <Col span={24}>
                    <Typography.Text>
                        Você está acessando: <b>{`${getNomeEmpresa()} / ${getNomeLocal()}`}</b>
                    </Typography.Text>
                </Col>
            </Row>
            <SelecoesEmpresa veioDaHome={true} exibirModal={exibirModalEmpresaFilial} />
        </Modal>

    );
}