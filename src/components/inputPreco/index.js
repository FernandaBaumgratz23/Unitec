import React, { useState } from "react";
import { Input, Form } from "antd";

/*
    Ao utilizar o componente não setar valor para constantes como por exemplo setValorPedido(valor), pois isso fará com que o focus saia do input
*/

export default function InputPreco(props) {

    /* props.percent ou props.cifrao removido, pois ao tentar utilizar o backspace não funciona */
    function formatNumber(value) {
        let precisao = !!props.precision ? props.precision : props.precision == 0 ? 0 : 2;
        if (!(!!value) || isNaN(value)) {
            value = !!props.initialValue ? props.initialValue : '0.00';
        }
        value = parseFloat(value).toFixed(precisao);
        value += '';
        const list = value.split('.');
        const prefix = list[0].charAt(0) === '-' ? '-' : '';
        let num = prefix ? list[0].slice(1) : list[0];
        let result = '';
        while (num.length > 3) {
            result = `.${num.slice(-3)}${result}`;
            num = num.slice(0, num.length - 3);
        }
        if (num) {
            result = num + result;
        }

        let aposVirgula = '';
        while (aposVirgula.length < precisao) aposVirgula = "0" + aposVirgula;
        let resultado = precisao == 0 ? '' :','+ aposVirgula;

        return `${prefix}${result}${list[1] ? `,${list[1]}` : resultado}`;
    }

    class InputValor extends React.Component {
        onChange = e => {
            const { value } = e.target;
            let precisao = !!props.precision ? props.precision : props.precision == 0 ? 0 : 2;
            let valorTemp = value;
            valorTemp = valorTemp.replace('', '');
            valorTemp = valorTemp.replaceAll(',', '').replaceAll('.', '');
            if (parseFloat(valorTemp).toString().length <= precisao) {
                let zeros = '0'.repeat(precisao);
                let valDivisao = 1 + zeros;
                valorTemp = parseFloat(valorTemp / valDivisao).toFixed(precisao);
            } else {
                valorTemp = valorTemp.slice(0, valorTemp.length - precisao) + '.' + valorTemp.slice(valorTemp.length - precisao);
            }
            valorTemp = valorTemp.toString();
            const reg = /^-?\d*(\.\d*)?$/;
            if ((!isNaN(valorTemp) && reg.test(valorTemp)) || valorTemp === '' || valorTemp === '-') {
                this.props.onChange(valorTemp);
            }
        };

        onBlur = () => {
            const { value, onBlur, onChange } = this.props;
            if (!!value) {
                let valueTemp = value.toString();
                if (valueTemp.charAt(valueTemp.length - 1) === '.' || valueTemp === '-') {
                    valueTemp = valueTemp.slice(0, -1);
                }
                onChange(valueTemp.replace(/0*(\d+)/, '$1'));
                if (onBlur) {
                    onBlur();
                }
            }
        };

        render() {
            const { value } = this.props;
            let valor = value;
            if (props.somenteValorPositivo !== null && props.somenteValorPositivo !== undefined) {
                valor = parseFloat(value);
                if (!!props.somenteValorPositivo) {
                    if (valor < 0) {
                        valor = valor * -1;
                    }
                }
                valor = valor.toString();
                if (valor.indexOf('.') > -1 && valor.split('.')[1].length < 2) {
                    valor += '0';
                }
            }
            return (
                <Input ref={c => (this.myInputRef = c)}
                    {...this.props}
                    value={formatNumber(valor)}
                    disabled={!!props.disabled}
                    onChange={this.onChange}
                    onBlur={this.onBlur}
                    style={!!props.style ? props.style : {}}
                    onFocus={this.onFocus}
                    precision={!!props.precision ? props.precision : 2}
                    placeholder={!!props.placeholder ? props.placeholder : ''}
                    maxLength={18}
                    className='text-right'
                />
            );
        }
    };

    class NumericInputDemo extends React.Component {
        constructor(props) {
            super(props);
            this.state = { value: 0 };
        }

        onChange = value => {
            this.setState({ value });
            if (!!props.onChange) {
                props.onChange();
            }
        };

        onBlur = () => {
            if (!!props.onBlur) {
                props.onBlur();
            }
        };

        onPressEnter = () => {
            if (!!props.onPressEnter) {
                props.onPressEnter();
            }
        };

        onFocus = () => {
            if (!!props.onFocus) {
                props.onFocus();
            }
        };

        render() {
            return (
                <Form.Item name={!!props.name ? props.name : ''} style={!!props.styleForm ? props.styleForm : {}} label={!!props.label ? props.label : ''} className={!!props.className ? props.className : ''} initialValue={!!props.initialValue ? props.initialValue : 0} hidden={!!props.hidden} rules={!!props.rules ? props.rules : []}>
                    <InputValor value={this.state.value} onChange={this.onChange} onBlur={this.onBlur} onFocus={this.onFocus} initialValue={!!props.initialValue ? props.initialValue : 0} onPressEnter={this.onPressEnter} />
                </Form.Item>
            );
        }
    }

    return (
        <NumericInputDemo />

    );
}