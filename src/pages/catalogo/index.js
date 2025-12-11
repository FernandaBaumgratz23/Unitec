import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Col, Collapse, Form, Input, Radio, Row, Select, Table } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined, DeleteOutlined } from '@ant-design/icons';

import { BreadcrumbPage, FiltroBusca, FiltroOrdenacao, SelectPaginacao } from '../../components';
import ListaProduto from './listaProdutos';
import { listagemActions } from '../../actions';
import { useStateValue } from '../../state';

export default function Catalogo() {
    const [formPesquisa] = Form.useForm();
    const [open, setOpen] = useState(false);
    const [{ }, dispatch] = useStateValue();
    const [listaParametros, setListaParametros] = useState([])
    const [listaMarcas, setListaMarcas] = useState([]);
    const [listaGrupo, setListaGrupo] = useState([]);
    
    useEffect(() => {
        dispatch({ type: listagemActions.CHANGE, data: { ordem: 'codigo' ,outrosFiltros: '&Status=1'} });
    }, []);

    const togglePesquisa = () => {

    }

    function filtrarAvancado() {
        let filtro = "";
        let dadosForm = formPesquisa.getFieldValue();
        if (listaParametros.length > 0) {
            let listGr = [];
            let listMar = [];
            listaParametros.forEach((item) => {
                if (item.tipo == 1) {
                    listGr.push(item.valor);
                } else {
                    listMar.push(item.valor);
                }
            });
            if (listGr.length > 0) {
                filtro += `&Grupo=${listGr.join(", ")}`;
            }
            if (listMar.length > 0) {
                filtro += `&Marca=${listMar.join(", ")}`;
            }
        }
        if (dadosForm.Estoque != null) {
            filtro += `&Estoque=${dadosForm.Estoque}`;
        }
        if (dadosForm.Status != null && dadosForm.Status != 2) {
            filtro += `&Status=${dadosForm.Status}`;
        }
        dispatch({ type: listagemActions.CHANGE, data: { outrosFiltros: filtro } });
    }

    function adicionarFiltros(obj) {
        let lista = [...listaParametros];
        if (obj.tipo == 'grupo') {
            let listGrupo = [...listaGrupo];
            let grupo = listGrupo.find(g => g.key == obj.valor);
            lista.push({ tipo: 1, valor: grupo.chave.codigo, descricao: grupo.descricao })
        } else {
            let listMarca = [...listaMarcas];
            let marca = listMarca.find(m => m.key == obj.valor);
            lista.push({ tipo: 2, valor: marca.chave.codigo, descricao: marca.descricao })
        }
        setListaParametros(lista);
    }

    function removerParametro(record) {
        let lista = [...listaParametros];
        let nvLista = lista.filter(l => (l.tipo != record.tipo || (l.tipo == record.tipo && l.valor != record.valor)));
        setListaParametros(nvLista);
    }

    return (
        <div className="p-10">
            <Row align="middle" justify="space-between" className="col-pagina-breadcrumb" gutter={[8, 8]}>
                <Col className="col-w-100">
                    <BreadcrumbPage />
                </Col>
            </Row>
            <Row gutter={[8, 8]}>

            </Row>
            <Form layout="vertical" name="formularioPesqAvancada" form={formPesquisa} >
                <Row gutter={[8, 0]}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={14} xxl={16}>
                        <Row align="middle" gutter={[8, 0]}>
                            <Col xs={24} sm={17} md={17} lg={19} xl={19} xxl={19}>
                                <FiltroBusca ordem={"+descricao"} />
                            </Col>
                            <Col xs={24} sm={7} md={7} lg={5} xl={5} xxl={5}>
                                <FiltroOrdenacao opcoesOrdenacao={[
                                    { label: "Descrição A - Z", value: "+descricao" },
                                    { label: "Descrição Z - A", value: "-descricao" },
                                    { label: "Código Crescente", value: "+codigo" },
                                    { label: "Código Decrescente", value: "-codigo" }
                                ]} />
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={24} sm={24} md={9} lg={9} xl={6}>
                        <Form.Item label="Selecione Status do Produto" name="Status" initialValue={1}>
                            <Radio.Group onChange={() => filtrarAvancado()}>
                                <Radio value={2}>Todos</Radio>
                                <Radio value={1}>Ativo</Radio>
                                <Radio value={0}>Inativo</Radio>
                            </Radio.Group>
                        </Form.Item>
                    </Col>
                </Row>
                <Row align="middle" gutter={[0, 8]}>
                    <Col span={24}>
                        <Collapse className="p-relative mt-coll" accordion ghost destroyInactivePanel={true}>
                            <div className="colDet"></div>
                            <Collapse.Panel key="1" showArrow={false} extra={
                                <Button type="primary" onClick={togglePesquisa} block>
                                    {open ? <ArrowUpOutlined /> : <ArrowDownOutlined />} Realizar pesquisa avançada
                                </Button>
                            }>
                                <Row gutter={[8, 0]} align="bottom" justify={"start"} style={{ position: "relative" }}>
                                    <Col span={6}>
                                        <Form.Item name="Marca" label="Marca">
                                            <SelectPaginacao url={"Marca/Buscar"} form={formPesquisa} placeholder="Selecione a Marca" nameValue="marca"
                                                nameLabel="descricao" onChangeFunction={(obj) => adicionarFiltros({ tipo: "marca", valor: obj })} setListaDados={setListaMarcas}
                                                conteudo={(m) => (<Select.Option label={m.descricao} value={m.key} key={m.key}>{m.descricao}</Select.Option>)} />
                                        </Form.Item>
                                    </Col>
                                    <Col span={6}>
                                        <Form.Item name="Grupo" label="Grupo">
                                            <SelectPaginacao url={"Grupo/Buscar"} form={formPesquisa} placeholder="Selecione o Grupo" nameValue="grupo"
                                                nameLabel="descricao" onChangeFunction={(obj) => adicionarFiltros({ tipo: "grupo", valor: obj })} setListaDados={setListaGrupo}
                                                conteudo={(g) => (<Select.Option label={g.descricao} value={g.key} key={g.key}>{g.descricao}</Select.Option>)} />
                                        </Form.Item>
                                    </Col>
                                    <Col span={3}>
                                        <Form.Item name="Estoque" valuePropName="checked">
                                            <Checkbox onChange={filtrarAvancado} >Somente produtos com estoque</Checkbox>
                                        </Form.Item>
                                    </Col>
                                    <Col span={9}>
                                        <Row justify={"end"}>
                                            <Button type='primary' onClick={filtrarAvancado}>Pesquisar</Button>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row align='middle' justify='end' >

                                </Row>
                                {listaParametros.length > 0 && <Row className='Tabela'>
                                    <Col span={12}>
                                        <Table dataSource={listaParametros} columns={
                                            [
                                                {
                                                    title: "Parametro",
                                                    render: ({ tipo }) => (
                                                        <div>
                                                            {tipo == 1 ? "Grupo" : "Marca"}
                                                        </div>
                                                    )
                                                }, {
                                                    title: "Valor",
                                                    render: ({ descricao }) => (
                                                        <div>
                                                            <b>{descricao}</b>
                                                        </div>
                                                    )
                                                }, {
                                                    title: "Remover",
                                                    align: "center",
                                                    render: (rec) => (
                                                        <div>
                                                            <DeleteOutlined onClick={() => { removerParametro(rec) }} />
                                                        </div>
                                                    )
                                                }
                                            ]
                                        } />
                                    </Col>
                                </Row>}
                            </Collapse.Panel>
                        </Collapse>
                    </Col>
                </Row>

            </Form>
            <ListaProduto />
        </div>
    );
}