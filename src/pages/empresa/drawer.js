import React, { useEffect, useState } from "react";
import { Form, Row, Col, Button, Modal, Drawer } from "antd";
import { CloseOutlined, ExclamationCircleOutlined, MinusOutlined, SaveOutlined } from "@ant-design/icons";
import { drawerActions, listagemActions, manutencaoActions } from "../../actions";
import { useStateValue } from "../../state";
import ManutencaoEmpresa from "./manutencao";


export default function DrawerEmpresa() {
    const [form] = Form.useForm();
    const [{ ui, manutencao }, dispatch] = useStateValue();
    const [carregando, setCarregando] = useState(false);

    function fecharDrawer() {
        form.resetFields();
        dispatch({ type: manutencaoActions.CHANGE, data: { dados: null } });
        dispatch({ type: drawerActions.CHANGE, data: { showDrawer: false } });
        dispatch({ type: listagemActions.CHANGE, data: { ordem: '+emp_razaosocial' } });
    };

     function aoSalvar(){
        fecharDrawer();
     }
    const onClose = () => {
        Modal.confirm({
            title: 'Cancelar?',
            icon: <ExclamationCircleOutlined />,
            content: 'Deseja cancelar a operação e ignorar o que foi realizado até o momento?',
            okText: 'Sim',
            cancelText: 'Não',
            centered: true,
            onOk() {
                fecharDrawer();
            }
        });
    };
    

    return (
        <Drawer title="Cadastro Empresa"
            width="70%"
            open={ui.showDrawer}
            closeIcon={<MinusOutlined />}
            fecharDrawer={() => { fecharDrawer() }}
            footer={
                <div>
                    <Row align="middle" justify="end" gutter={[8, 0]}>
                        <Col>
                            <Button onClick={onClose} icon={<CloseOutlined />} size="large" htmlType="button">
                                Cancelar
                            </Button>
                        </Col>
                        <Col>
                            <Button onClick={() => form.submit()} loading={carregando} icon={<SaveOutlined />} size="large" type="primary" htmlType="submit">
                                Salvar
                            </Button>
                        </Col>
                    </Row>
                </div>
            }
        >
            <ManutencaoEmpresa form={form} aoSalvar={aoSalvar} carregando={setCarregando} />
        </Drawer>
    );
}
