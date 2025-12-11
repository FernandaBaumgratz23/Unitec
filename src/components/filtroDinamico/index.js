import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { Button, Checkbox, Col, Collapse, Form, Input, Row } from "antd";
import React, { useEffect, useState } from "react";


export default function FiltroBusca() {
    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);
    const [listaCondicoes, setListaCondicoes] = useState([
        { "propiedade": "Igual", "operador": "=" },
        { "propiedade": "Contem" }
    ]);


    return (
        <Row align="middle" gutter={[0, 8]}>
            <Col span={24}>
                <Collapse className="p-relative mt-coll" accordion ghost destroyInactivePanel={true}>
                    <div className="colDet"></div>
                    <Collapse.Panel key="1" showArrow={false} extra={
                        <Button type="primary" onClick={togglePesquisa} block>
                            {open ? <ArrowUpOutlined /> : <ArrowDownOutlined />} Realizar pesquisa avançada
                        </Button>
                    }>
                        <Row gutter={[8, 0]} align="bottom">
                            <Col>
                                <Form.Item name="Marca" label="Marca">
                                    <Input placeholder='Informe o código/descrição' onBlur={filtrarAvancado} />
                                </Form.Item>
                            </Col>
                            <Col>
                                <Form.Item name="Grupo" label="Grupo">
                                    <Input placeholder='Informe o código/descrição' onBlur={filtrarAvancado} />
                                </Form.Item>
                            </Col>
                            <Col>
                                <Form.Item name="Estoque" valuePropName="checked">
                                    <Checkbox onChange={filtrarAvancado} >Somente produtos com estoque</Checkbox>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row className='Tabela'>
                            <Col span={12}>
                                <Table dataSource={listaParametros} columns={
                                    [
                                        {
                                            title: "Parametro",
                                            render: ({ parametro }) => (
                                                <div>
                                                    <b>{parametro}</b>
                                                </div>
                                            )
                                        }, {
                                            title: "Condição",
                                            render: ({ condicao }) => (
                                                <div>
                                                    {condicao}
                                                </div>
                                            )
                                        }, {
                                            title: "Valor",
                                            render: ({ valor }) => (
                                                <div>
                                                    {valor}
                                                </div>
                                            )
                                        }
                                    ]
                                } />
                            </Col>
                        </Row>
                    </Collapse.Panel>
                </Collapse>
            </Col>
        </Row>
    );
}