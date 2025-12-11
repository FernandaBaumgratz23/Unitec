import React, { useState, useEffect } from 'react';
import { Table, Row, Col, Divider } from 'antd';
import PropTypes from 'prop-types';

import api from '../../services/api';
import { listaTabelaDadosActions, listagemActions } from '../../actions';
import { ArrowDownOutlined, ArrowUpOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { useStateValue } from '../../state';
import { isNotNullOrEmpty } from '../../services/funcoes';

function TabelaPaginada({ colunas, url, expandir, selecionarItem = false, parametrosSelecionarItens, condicao = undefined, footerTabela,
    headerTabela, tipo = "checkbox", keySelecionaRadio = null }) {
    const [carregando, setCarregando] = useState(false);
    const [lista, setLista] = useState([]);
    const [pagina, setPagina] = useState(1);
    const [registrosPorPagina, setRegistrosPorPagina] = useState(20);
    const [listaTbDados, setListaTbDados] = useState([]);
    const [{ listagem }, dispatch] = useStateValue();

    const configPaginacao = {
        current: pagina,
        pageSize: registrosPorPagina,
        total: lista.totalItems,
        showSizeChanger: true,
        onChange: (pg) => setPagina(pg),
        onShowSizeChange: (atual, porPagina) => setRegistrosPorPagina(porPagina)
    };

    const configSelecionarItem = selecionarItem ?
        setCondicaoSelecionarItem()
        : null;

    const configSelecionarRadio = tipo == "radio" && selecionarItem ?
        setSelecionaRadio() : null;

    useEffect(() => {
        if (!!listaTbDados && listaTbDados.length > 0) {
            dispatch({ type: listaTabelaDadosActions.CHANGE, data: { itens: [...listaTbDados] } });
        }

    }, [listaTbDados]);

    function setCondicaoSelecionarItem() {
        if (!!parametrosSelecionarItens && !!parametrosSelecionarItens.tipo) {
            if (parametrosSelecionarItens.tipo === "change") {
                return {
                    onChange: (selectedRowKeys, selectedRows) => {
                        parametrosSelecionarItens.funcao(selectedRowKeys, selectedRows);
                    }
                }
            } else if (parametrosSelecionarItens.tipo === "select") {
                return {
                    onSelect: (record, selected, selectedRows) => {
                        parametrosSelecionarItens.funcao(record, selected, selectedRows);
                    }
                }
            } else if (parametrosSelecionarItens.tipo === "selectall") {
                return {
                    onSelectAll: (selected, selectedRows, changeRows) => {
                        parametrosSelecionarItens.funcao(selected, selectedRows, changeRows);
                    }
                }
            }
        }
        return "";
    };

    function setSelecionaRadio() {
        if (isNotNullOrEmpty(keySelecionaRadio)) {
            return {
                selectedRowKeys: [keySelecionaRadio]
            }
        }
    }

    function carregarDados() {
        if (listagem.ordem) {
            setCarregando(true);
            let parametrosUrl = '';
            parametrosUrl = `&pageNumber=${pagina}&pageSize=${registrosPorPagina}`;
            if (listagem?.ordem) parametrosUrl += `&order=${listagem.ordem}`;
            if (listagem?.filtro) parametrosUrl += listagem?.campoFiltro ? `&${listagem.campoFiltro}=${listagem.filtro}` : `&filtro=${listagem.filtro}`;
            if (listagem?.outrosFiltros) parametrosUrl += listagem.outrosFiltros;
            if (!!parametrosUrl) parametrosUrl = parametrosUrl.replace('&', '?');

            api.get(url + parametrosUrl).then((res) => {
                if (res.status === 200) {
                    let dados = [];

                    if (condicao !== undefined) {
                        res.data.items = res.data.items.filter(condicao);
                    }
                    if (!!res.data && !!res.data.items) {
                        res.data.items.map((item, idx) => {
                            item.key = idx;
                            dados.push(item);
                        })
                    } else {
                        res.data.map((item, idx) => {
                            item.key = idx;
                            dados.push(item);
                        })
                    }

                    setListaTbDados(dados);
                    setLista(res.data);
                }
            }).finally(() => {
                setCarregando(false);
            });
        }
    }

    useEffect(() => {
        if (!!listagem?.pagina) {
            setPagina(listagem.pagina);
            dispatch({ type: listagemActions.CHANGE, data: { filtro: listagem.filtro, pagina: null } })
        } else if (!!pagina) {
            carregarDados();
        }
    }, [listagem, pagina, registrosPorPagina])


    return (
        <Table loading={carregando} columns={colunas} dataSource={lista.items} pagination={configPaginacao} expandedRowRender={expandir}
            expandIcon={({ record, expanded, onExpand }) => {
                return expanded ? (
                    <ArrowUpOutlined onClick={(e) => onExpand(record, e)} />
                ) : (
                    <ArrowDownOutlined onClick={(e) => onExpand(record, e)} />
                );
            }}
            locale={{
                emptyText: (
                    <Row>
                        <Col span={24}>
                            <Divider orientation="center">
                                <ExclamationCircleOutlined /> Nenhum Registro Encontrado
                            </Divider>
                        </Col>
                    </Row>)
            }}
            rowSelection={selecionarItem ? { type: tipo, ...configSelecionarItem, ...configSelecionarRadio } : null}
            scroll={{ x: 920 }} footer={footerTabela} showHeader={headerTabela} columnWidth={30}
        />
    );
}


TabelaPaginada.propTypes = {
    colunas: PropTypes.array.isRequired,
    url: PropTypes.string.isRequired,
    paginacao: PropTypes.bool
}

export default TabelaPaginada;