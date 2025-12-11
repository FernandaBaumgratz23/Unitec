import React, { useEffect, useState } from 'react';
import api from '../../../services/api';
import { Col, Image, Modal, Row } from 'antd';
import { Table, TableBody, TableCell, TableRow } from "@material-ui/core";
import formatNumber from '../../../valueObjects/formatNumber';
import moment from 'moment';


export default function ModalProduto({ exibirModal, fecharModal, dados }) {
    const [dadosProdutos, setDadosProdutos] = useState({});
    const [dadosTabela, setDadosTabela] = useState([]);

    const onCloseModal = () => {
        fecharModal();
    }

    useEffect(() => {
        if (exibirModal) {
            buscarProduto(dados.codigo);
        }
    }, [exibirModal]);

    function buscarProduto(codigo) {
        api.get(`Produto/BuscarProduto?codigo=${codigo}`).then(
            res => {
                setDadosProdutos(res.data);
                let dados = { ...res.data };
                let listaDados = [
                    createData("Ref: ", `${!!dados.referencia ? dados.referencia : "Sem Referência"}`, `Unidade de Medida:`, `${dados.unidadeMedida}`),
                    createData("EAN: ", `${dados.ean}`, `Ativo: `, `${dados.ativo ? "Sim" : "Não"}`),
                    createData("Peso Liquido: ", `${dados.pesoLiquido}`, `Peso Bruto:`, `${dados.pesoBruto}`),
                    createData("Preço: ", `${formatNumber(dados.preco, true, true)}`, `Estoque: `, `${dados.estoque > 0 ? dados.estoque : "Sem Estoque"}`, !!dados.valorPromocao && dados.valorPromocao > 0 ? "promocao" : ""),
                    !!dados.valorPromocao ? createData(`Valor Promoção: `, `${formatNumber(dados.valorPromocao, true, true)}`, `Data Promoção: `, `${moment(dados.dataInicialPromocao).format('DD/MM/YYYY')} até ${moment(dados.dataFinalPromocao).format('DD/MM/YYYY')}`) : "",
                    createData(`Marca: `, `${dados.marca}`, `Grupo: `, `${dados.grupo}`),
                    createData(`SubGrupo: `, `${dados.subGrupo}`)
                ];
                setDadosTabela(listaDados);
            }
        ).catch(
            err => {
                console.log(err);
            }
        )
    }

    function createData(coluna1, valor1, coluna2, valor2, style1 = "", style2 = "") {
        return { coluna1, valor1, coluna2, valor2, style1, style2 }
    };

    return (
        <Modal centered
            width={700}
            title="Dados Produto"
            visible={exibirModal}
            onCancel={onCloseModal}
            destroyOnClose
            footer={null}
            maskClosable={false}
        >
            <Row gutter={[8, 0]} justify={"center"}>
                <Col>
                    <Image height={350} src={"data:image/jpg;base64," + dadosProdutos.imagem} />
                </Col>
            </Row>
            <Table size="small">
                <TableBody>
                    <TableRow key={"descricao"}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        style={{ margin: 0 }}>
                        <TableCell colSpan={4}>Descrição: <b>{dados.descricao}</b></TableCell>
                    </TableRow>
                    {dadosTabela.map((row) => {
                        if (!!row.coluna1) {
                            return <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                style={{ margin: 0 }}>
                                <TableCell>{row.coluna1}</TableCell>
                                <TableCell className={row.style1} align='center'><b>{row.valor1}</b></TableCell>
                                <TableCell>{row.coluna2}</TableCell>
                                <TableCell className={row.style2} align='center'><b>{row.valor2}</b></TableCell>
                            </TableRow>
                        }
                    })}
                </TableBody>

            </Table>

        </Modal>
    );
}