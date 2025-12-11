import React, { useEffect, useState } from "react";
import { Row, Col, Calendar, Image } from "antd";
import { UserOutlined } from "@ant-design/icons";
import moment from 'moment';
import api from '../../services/api';

import { getNomeEmpresa, getNomeLocal, getNomeUsuario } from '../../services/auth';

export default function Inicial() {

    const [dataAtual, setDataAtual] = useState(new Date());
    const [caminhoImg, setCaminhoImg] = useState("");

    useEffect(() => {
        setInterval(dataCalendar, 1000);
        buscarImagem();
    }, []);

    function dataCalendar() {
        setDataAtual(new Date());
    };

    function buscarImagem() {
        api.get("Empresa/BuscarImgInicial").then(
            res => {
                if (res.data) {
                    setCaminhoImg(res.data);
                }
            }
        ).catch(
            err => {
                console.log(err);
            }
        );
    }

    return (
        <>
            <div className="col-home">
                <Row gutter={[0, 16]}>
                    <Col>
                        <Image preview={false} src={`data:image/jpeg;base64,${caminhoImg}`} />
                    </Col>
                </Row>
                <Row align="stretch" gutter={[0, 16]} className="bottomHome" >
                    <Col span={24}>
                        <Row align="bottom" gutter={[16, 0]} className="bottomHomeJr">
                            <Col xxl={1} xl={2} lg={3} md={4} sm={4} xs={3} className="f-50 text-center" style={{ paddingBottom: "10px" }}>
                                <UserOutlined />
                            </Col>
                            <Col xxl={23} xl={22} lg={21} md={20} sm={20} xs={21} className="f-14">
                                <Row gutter={[8, 0]}>
                                    <Col span={24} className="line-height">
                                        {dataAtual.getHours() > 12 ? 'Boa tarde!' : dataAtual.getHours() > 18 ? 'Boa Noite!' : ' Bom dia!'}
                                    </Col>
                                    <Col span={24} className="txt-overflow line-height">
                                        <b className="f-30">{getNomeUsuario()}</b>,
                                    </Col>
                                    <Col className="line-height">
                                        <span>você está acessando a empresa:</span>
                                    </Col>
                                    <Col className="txt-overflow line-height">
                                        <b>{`${getNomeEmpresa()} / ${getNomeLocal()}`}</b>.
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
            <div className="col-right-home">
                <Row align="middle" justify="center" gutter={[8, 0]}>
                    <Col span={24}>
                        <Row align="middle" justify="center">
                            <Col className="p-t-b-8" align="right">
                                <b className="f-50">
                                    {moment(dataAtual).format('DD')}
                                </b>
                            </Col>
                            <Col>
                                <Row>
                                    <Col span={24}>
                                        <b className="f-14 text-uppercase">
                                            {moment(dataAtual).format('MMM')}
                                        </b>
                                    </Col>
                                    <Col span={24}>
                                        <b className="f-14">
                                            {moment(dataAtual).format('YYYY')}
                                        </b>
                                    </Col>
                                </Row>
                            </Col>
                            <Col className="text-center">
                                <b className="f-50">
                                    {moment(dataAtual).format('HH:mm')}
                                </b>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={24}>
                        <div className="calendar-demo-card">
                            <Calendar fullscreen={false} />
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    );
}