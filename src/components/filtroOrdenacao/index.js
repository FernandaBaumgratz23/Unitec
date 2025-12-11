import React from "react";
import { Form, Select } from "antd";

import { useStateValue } from '../../state';
import { listagemActions } from '../../actions';

export default function FiltroOrdenacao({ opcoesOrdenacao }) {
    const [{ listagem }, dispatch] = useStateValue();
    return (
        <Form.Item label="Ordenar por">
            <Select showSearch options={opcoesOrdenacao} placeholder="Selecione a Ordenação" value={listagem.ordem} onChange={(val) => { dispatch({ type: listagemActions.CHANGE, data: { ordem: val}}) }} />
        </Form.Item>
    );
}