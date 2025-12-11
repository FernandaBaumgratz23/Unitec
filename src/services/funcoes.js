import { notification } from "antd";
import { Buffer } from 'buffer';

export const validaForm = (formulario, listaValidacoes) => {
    let retorno = false;
    if (!!formulario && !!listaValidacoes) {
        let formObj = formulario.getFieldValue();
        let msgRetorno = [];
        listaValidacoes.forEach((validacao) => {
            if (validacao.obrigatorio && (!!formObj[validacao.nome] === false && formObj[validacao.nome] !== 0)) {
                msgRetorno.push('O campo ' + validacao.label + ' é obrigatório!');
            }
        });
        if (msgRetorno.length > 0) {
            msgRetorno.forEach((msg) =>
                notification.warning({ message: 'Aviso', description: msg })
            );
        } else {
            retorno = true;
        }
    }
    return retorno;
};

export const encodeBase64 = (data) => {
    return Buffer.from(data).toString('base64');
}

export const decodeBase64 = (data, type = 'ascii') => {
    return Buffer.from(data, 'base64').toString(type);;
}

export const parseToken = (token) => {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(decodeBase64(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};

export const isNotNullOrEmpty = (registro) => {
    let retorno = false;
    if (!!registro || registro === 0) {
        retorno = true;
    }
    return retorno;
};

export async function consultaCNPJ(cnpj) {
    cnpj = cnpj.replace(/\D/g, '');

    return jsonp(`https://www.receitaws.com.br/v1/cnpj/${encodeURI(cnpj)}`, 60000)
        .then((json) => {
            if (json['status'] === 'ERROR') {
                return Promise.reject(json['message']);
            } else {
                return Promise.resolve(json);
            }
        });
};


export function jsonp(url, timeout) {
    const func = 'jsonp_' + Math.random().toString(36).substr(2, 5);

    return new Promise(function (resolve, reject) {
        let script = document.createElement('script');

        let timer = setTimeout(() => {
            reject('Tempo limite atingido');
            document.body.removeChild(script);
        }, timeout);

        window[func] = (json) => {
            clearTimeout(timer);
            resolve(json);
            document.body.removeChild(script);
            delete window[func];
        };
        script.src = url + '?callback=' + encodeURI(func);
        document.body.appendChild(script);
    });
};

export const removerCarcaterEspecial = (valor) => {
    valor = valor?.replaceAll(/[^a-zA-Z 0-9]+/g, '');
    return valor;
};
