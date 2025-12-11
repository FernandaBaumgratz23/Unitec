import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import { useStateValue } from '../../state';
import { drawerActions, manutencaoActions, } from '../../actions';

export default function BotaoIncluirDados(props) {

    const [{ ui }, dispatch] = useStateValue();
    //const [desabilita, setDesabilita] = useState(false)

    /*useEffect(() => {
        setDesabilita(validarPermissaoTela(0));
    }, []);*/

    return (
        <div>
            <Button /*disabled={desabilita}*/ type="primary" icon={<PlusOutlined />} size="middle" onClick={() => {
                //dispatch({ type: manutencaoActions.CHANGE, data: { dados: null}});
                if (!!props.onClick) {
                    props.onClick();
                }
                dispatch({ type: drawerActions.CHANGE, data: { showDrawer: true, editItem: false } });
            }}>
                {!!props.children ? props.children : "NOVO"}
            </Button>
        </div>
    );

}