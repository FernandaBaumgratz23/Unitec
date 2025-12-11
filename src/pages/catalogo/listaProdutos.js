import React, { useEffect, useState } from 'react';
import { Button, Popover, Tag } from 'antd';
import { useStateValue } from '../../state';
import { TabelaPaginada } from '../../components';
import { listagemActions } from '../../actions';
import formatNumber from '../../valueObjects/formatNumber';
import { InfoCircleOutlined } from '@ant-design/icons';
import { ModalProduto } from '../../components/modals';

export default function ListaProduto() {
    const [{ }, dispatch] = useStateValue();
    const [dadosProdutos, setDadosProdutos] = useState({});
    const [exibirModal, setExibirModal] = useState(false);

  
    function buscarInformacoes(produto) {
        if (produto) {
            setDadosProdutos(produto);
            setExibirModal(true);
        }
    }

    function fecharModal() {
        setExibirModal(false);
        setDadosProdutos({});
    }

    return (
        <div className="tabela">
            <TabelaPaginada url="Produto/Buscar" colunas={[
                {
                    title: 'Código',
                    width: 75,
                    align: 'center',
                    render: ({ codigo, ativo }) => (
                        <Popover content={ativo ? 'Ativo' : 'Inativo'} placement="right">
                            <Tag color={ativo ? 'processing' : 'default'} className="w-100">
                                <b>{codigo}</b>
                            </Tag>
                        </Popover>
                    ),
                }, {
                    title: "Descrição",
                    render: ({ descricao }) => (
                        <div>
                            <b>{descricao}</b>
                        </div>
                    )
                }, {
                    title: "Estoque",
                    align: "Center",
                    render: ({ estoque }) => (
                        <div>
                            {estoque > 0 ? estoque : "Sem Estoque"}
                        </div>
                    )
                }, {
                    title: "Preço(R$)",
                    align: "Center",
                    render: ({ preco, valorPromocao }) => {
                        if (!!valorPromocao && valorPromocao > 0) {
                            return <div>
                                <div>
                                    de <s>{formatNumber(preco, true)}</s> por {formatNumber(valorPromocao, true)}
                                </div>
                            </div>
                        } else {
                            return <div>
                                {formatNumber(preco, true)}
                            </div>
                        }
                    }
                },
                {
                    title: 'Ações',
                    dataIndex: '',
                    key: 'x',
                    align: 'center',
                    width: 95,
                    fixed: 'right',
                    render: (produto) => (
                        <div>
                            <Button icon={<InfoCircleOutlined />} onClick={() => { buscarInformacoes(produto) }} />
                        </div>
                    ),
                },
            ]} />
            <ModalProduto exibirModal={exibirModal} fecharModal={fecharModal} dados={dadosProdutos} />
        </div>
    );
}