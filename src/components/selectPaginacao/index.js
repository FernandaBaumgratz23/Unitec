import React, { useEffect, useState } from 'react';
import { Select, Divider, Pagination, Button, Row, Col } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import api from '../../services/api';
import { useStateValue } from '../../state';
import { selectPaginadoActions } from '../../actions';
import { isNotNullOrEmpty } from '../../services/funcoes';

export default function SelectPaginacao({ url, idValue, nameValue, nameLabel, onChangeFunction, onBlurFunction, onClearFunction, campoFiltro = "filtro", placeholder,
    form, atualizaComponente = false, mostrarCodigoLabel = false, multiple = false, funcaoIncluir = null, allowClear = false, conteudo = null, filtroPesq = null, filtroExtra,
    disabled = false, returnObject = false, selecionarRegUnico = null, setListaDados = null, usaDados = true }) {
    const [{ listaSelectPaginacao }, dispatch] = useStateValue();
    const [carregando, setCarregando] = useState(false);
    const [lista, setLista] = useState([]);
    const [filtro, setFiltro] = useState('');
    const [pagina, setPagina] = useState(1);
    const [registrosPorPagina, setRegistrosPorPagina] = useState(10);
    const [totalReg, setTotalReg] = useState(0);
    const [usouFiltro, setUsouFiltro] = useState(false);
    const [valor, setValor] = useState(null);
    const [campoDescricao, setCampoDescricao] = useState(null);
    const [filtroAnt, setFiltroAnt] = useState("");
    const [multiplosFiltros, setMultiplosFiltros] = useState(false);
    const [listaFiltros, setListaFiltros] = useState([]);
    const _nameValue = idValue ? idValue : nameValue;

    useEffect(() => {
        if (!!lista && lista.length > 0) {
            if (lista.length == 1 && !!selecionarRegUnico) {
                let dados = lista.find(l => l.key == lista[0].key);
                if (!!selecionarRegUnico) {
                    let val = dados ? dados[selecionarRegUnico] : null
                    setValor(val);
                    form.setFieldsValue({ [_nameValue]: val });
                }
            }
            if (usaDados) {
                if (!!setListaDados) {
                    setListaDados(lista);
                } else {
                    dispatch({ type: selectPaginadoActions.CHANGE, data: { itens: [...lista] } });
                }
            }
        }
    }, [lista]);

    useEffect(() => {
        setFiltro(filtroPesq);
    }, [filtroPesq, atualizaComponente]);

    useEffect(() => {
        if (!isNotNullOrEmpty(form.getFieldValue([_nameValue]))) {
            setFiltro('');
        }
        setValor(form.getFieldValue([_nameValue]));
    }, [form.getFieldValue([_nameValue])]);

    useEffect(() => {
        if (!!lista && listaSelectPaginacao?.itens?.length > 0) {
            let lista = [...listaSelectPaginacao.itens];
            let listaFil = lista.filter(s => s.name === _nameValue);
            //if (listaFil.length == 1) {
            let item = listaFil[0];
            if (!!item && !!item.value) {
                if (!!item.campo) {
                    setCampoDescricao(item.campo);
                }
                setPagina(1);
                setFiltro(item.value);
                let idx = lista.indexOf(item);
                lista.splice(idx, 1);
                dispatch({ type: selectPaginadoActions.CHANGE, data: { itens: lista } })
            }
        }
    }, [listaSelectPaginacao]);

    function carregarDados() {
        setCarregando(true);
        let parametrosUrl = '';
        if (atualizaComponente !== null) {
            if (!multiplosFiltros) {
                !!filtro ? parametrosUrl = `&${!!campoDescricao ? campoDescricao : campoFiltro}=${filtro}` : parametrosUrl = "";
            } else {
                !!listaFiltros && listaFiltros.length > 0 ? listaFiltros.forEach(lf => parametrosUrl += `&${!!lf.campoDescricao ? lf.campoDescricao : lf.campoFiltro}=${lf.filtro}`) : parametrosUrl = "";
            }
            if (!!campoDescricao) {
                setCampoDescricao(null);
            }
            if (mostrarCodigoLabel) {
                parametrosUrl += `&Order=%2B${nameValue}`;
            }
            else {
                parametrosUrl += (nameLabel.search('[/+/g]') > 0 ? `&Order=%2B${nameLabel.split('+')[0]}` : `&Order=%2B${nameLabel}`);
            }
            parametrosUrl += `&pageNumber=${pagina}&pageSize=${registrosPorPagina}`;
            if (url.search(/[?]/g) === -1) {
                parametrosUrl = parametrosUrl.replace('&', '?');
            }
            !!filtroExtra ? parametrosUrl += filtroExtra : naoFazNada();
            api.get(url + parametrosUrl).then(
                (res) => {
                    if (res.status === 200) {
                        let dados = [];

                        let indice = !!atualizaComponente ? 0 : lista.length > 0 ? lista[lista.length - 1].key + 1 : 0;
                        res.data?.items?.map((item, idx) => {
                            item.key = indice;
                            dados.push(item);
                            indice++;
                        });

                        setTotalReg(res.data.totalItems)
                        if (!isNotNullOrEmpty(filtro)) {//filtro em branco
                            if (usouFiltro === true || atualizaComponente !== false) {
                                atualizaComponente = false
                                setUsouFiltro(false);
                                setLista(dados);
                            } else {
                                setLista([...lista, ...dados]);
                            }
                        } else {
                            if (filtro === filtroAnt) {
                                if (pagina > 1) {
                                    setLista([...lista, ...dados]);
                                } else {
                                    setLista(dados);
                                }
                            } else {
                                setUsouFiltro(true);
                                setFiltroAnt(filtro);
                                setLista(dados);
                                setPagina(1);
                            }
                        }
                    }
                }
            ).finally(
                () => {
                    setCarregando(false)
                }
            );
        }
    }

    function naoFazNada() { }

    function recarregaDados() {
        let totalPag = Math.trunc(totalReg / registrosPorPagina) + 1
        if (totalPag > pagina) {
            setPagina(pagina + 1)
        }
    }

    useEffect(() => carregarDados(), [filtro, pagina, atualizaComponente]);

    return (
        <Select
            loading={carregando}
            mode={multiple ? "multiple" : ""}
            showSearch
            allowClear={allowClear}
            placeholder={placeholder}
            value={valor}
            disabled={disabled}
            optionFilterProp="children"
            filterOption={(input, option) => {
                if (option.props.value) {
                    return true;
                } else {
                    return false;
                }
            }}
            onSearch={(valor) => { setFiltro(valor); }}
            onPopupScroll={e => {
                const { target } = e;
                if (target.scrollTop + target.offsetHeight === target.scrollHeight) {
                    recarregaDados();
                }
            }}
            dropdownRender={!!funcaoIncluir ? menu => (
                <div>
                    <Row>
                        <Col span={24}>
                            {menu}
                        </Col>
                    </Row>
                    <Row align="middle" justify="center" gutter={[0, 8]}>
                        <Col span={24}>
                            <Divider className="m-0" />
                        </Col>
                    </Row>
                    <Row align="middle" justify="center" gutter={[0, 5]}>
                        <Col>
                            <Button onClick={() => { funcaoIncluir() }}>
                                <PlusOutlined /> Adicionar
                            </Button>
                        </Col>
                    </Row>
                </div>
            ) : null}
            onChange={(valor) => {
                setValor(valor);
                form.setFieldsValue({ [_nameValue]: valor });
                !!onChangeFunction ? onChangeFunction(valor) : naoFazNada();
            }}
            onBlur={(valor) => {
                !!onBlurFunction ? onBlurFunction(valor) : naoFazNada();
            }}
            onClear={(valor) => {
                !!onClearFunction ? onClearFunction(valor) : naoFazNada();
            }}
        >
            {lista.map(item =>
                !!conteudo ? conteudo(item) :
                    <Select.Option key={item.key} value={returnObject ? JSON.stringify(item) : item[nameValue]}>{mostrarCodigoLabel ? item[nameValue] + " - " : ""} {(nameLabel.search(/[+]/g) > 0 ? (item[nameLabel.split('+')[0]] + " - " + item[nameLabel.split('+')[1]]) : item[nameLabel])} </Select.Option>
            )}
        </Select>
    )
}
