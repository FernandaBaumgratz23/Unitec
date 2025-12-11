import React, { useEffect, useState } from 'react';
import { Form, Input } from 'antd';
import { MaskedInput } from 'antd-mask-input';

export default function InputCep(props) {

    const mask = '00000-000';

    class NovoValor extends React.Component {

        onChange = (e, a) => {
            const { value } = e.target;
            let data = value;

            this.props.onChange(data.replace(/\D/g, ""));
        };

        onBlur = (e) => {
            if (!!props.onBlur) {
                props.onBlur(e);
            }
        }

        onKeyUp = e => {
            if (!!props.onKeyUp) {
                props.onKeyUp(e);
            }
        }

        onPressEnter = (e) => {
            if (!!props.onPressEnter) {
                props.onPressEnter(e);
            }
        };

        onFocus = (e) => {
            if (!!props.onFocus) {
                props.onFocus(e);
            }
        };

        onKeyPress = (e) => {
            if (!!props.onKeyPress) {
                props.onKeyPress(e);
            }
        };

        render() {
            const { value } = this.props;

            return (
                <MaskedInput
                    {...this.props}
                    id={props.name}
                    disabled={!!props.disabled ? props.disabled : false}
                    placeholder={!!props.placeholder ? props.placeholder : 'Informe o CEP'}
                    value={value}
                    mask={mask}
                    className="ant-input ant-input-sm"
                    onBlur={this.onBlur}
                    onChange={this.onChange}
                    onKeyUp={this.onKeyUp}
                    onPressEnter={this.onPressEnter}
                    onFocus={this.onFocus}
                    onKeyPress={this.onKeyPress}
                />
            );
        }
    };

    class InputCep extends React.Component {
        constructor(props) {
            super(props);
            this.state = { value: '' };
        }

        onChange = value => {
            this.setState({ value });
            if (!!props.onChange) {
                props.onChange();
            }
        };

        render() {
            return (
                <Form.Item ref={props.ref} name={props.name} label={props.label} initialValue={props.initialValue} style={!!props.style ? props.style : {}} className={!!props.className ? props.className : ''} hidden={!!props.hidden} rules={!!props.rules ? props.rules : []}>
                    <NovoValor value={this.state.value} onChange={this.onChange} />
                </Form.Item>
            )
        }
    };

    return (
        <InputCep />
    );
};