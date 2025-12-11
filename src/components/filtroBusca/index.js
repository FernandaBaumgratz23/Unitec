import React, { useEffect } from "react";
import { Form, Input } from "antd";

import { useStateValue } from '../../state';
import { listagemActions } from '../../actions';

export default function FiltroBusca({ labelInput, placeholderInput, nameInput = "", form = null, ordem = null }) {

    const [{ listagem }, dispatch] = useStateValue();

    useEffect(() => { dispatch({ type: listagemActions.CHANGE, data: { filtro: null, pagina: 1, ordem: ordem } }) }, []);

    return (
        <Form.Item label={labelInput || "Pesquisar por"} name={nameInput}>
            <Input.Search placeholder={placeholderInput || "Código, descrição"} allowClear
                onSearch={valor => {
                    dispatch({ type: listagemActions.CHANGE, data: { filtro: valor, pagina: 1 } })
                }
                } onBlur={valor => {
                    if (!!form && !!nameInput) {
                        form.setFieldsValue({ [nameInput]: valor.target.value });
                    }
                }}
            />
        </Form.Item>
    );

}