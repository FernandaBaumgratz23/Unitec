import { Breadcrumb } from "antd";

export const TOKEN_KEY = "@GestorErp-Token";
export const EMPRESA_KEY = "@GestorErp-Empresa";
export const LOCAL_KEY = "@GestorErp-Local";
export const linkApi = (window.location.href.indexOf('localhost') > -1 ? 'https://localhost:7085/' : 'https://apigestornuvem.abase.com.br:8000/');
export const NOMEEMPRESA_KEY = "@GestorErp-NomeEmpresa";
export const NOMELOCAL_KEY = "@GestorErp-NomeLocal";
export const NOMEUSUARIO_KEY = "@GestorErp-NomeUsuario";
export const IDUSUARIO_KEY = "@GestorErp-IdUsuario";
export const EMAILUSUARIO_KEY = "@GestorErp-EmailUsuario";
export const BREADCRUMB_KEY = "@GestorErp-Breadcrumb";
export const SEQUSUARIO_KEY = "@GestorErp-SeqUsuario";

export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const getEmpresa = () => localStorage.getItem(EMPRESA_KEY);
export const getLocal = () => localStorage.getItem(LOCAL_KEY);
export const getNomeEmpresa = () => localStorage.getItem(NOMEEMPRESA_KEY);
export const getNomeLocal = () => localStorage.getItem(NOMELOCAL_KEY);
export const getNomeUsuario = () => localStorage.getItem(NOMEUSUARIO_KEY);
export const getIdUsuario = () => localStorage.getItem(IDUSUARIO_KEY);
export const getSeqUsuario = () => localStorage.getItem(SEQUSUARIO_KEY);
export const getEmailUsuario = () => localStorage.getItem(EMAILUSUARIO_KEY);
export const getBreadcrumb = () => localStorage.getItem(BREADCRUMB_KEY);
export const login = token => {
    localStorage.setItem(TOKEN_KEY, token);
};
export const setEmpresa = empresa => {
    localStorage.setItem(EMPRESA_KEY, empresa);
};
export const setLocal = local => {
    localStorage.setItem(LOCAL_KEY, local);
};
export const removerLocal = () => {
    localStorage.removeItem(LOCAL_KEY);
};
export const setNomeEmpresa = nomeEmpresa => {
    localStorage.setItem(NOMEEMPRESA_KEY, nomeEmpresa);
};
export const setNomeLocal = nomeLocal => {
    localStorage.setItem(NOMELOCAL_KEY, nomeLocal);
};
export const setNomeUsuario = nomeUsuario => {
    localStorage.setItem(NOMEUSUARIO_KEY, nomeUsuario);
};
export const setSeqUsuario = seq => {
    localStorage.setItem(SEQUSUARIO_KEY, seq)
}
export const setIdUsuario = idUsuario => {
    localStorage.setItem(IDUSUARIO_KEY, idUsuario);
};
export const setEmailUsuario = emailUsuario => {
    localStorage.setItem(EMAILUSUARIO_KEY, emailUsuario);
};
export const setBreadcrumb = breadcumb => {
    localStorage.setItem(BREADCRUMB_KEY, breadcumb);
}
export const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(EMPRESA_KEY);
    localStorage.removeItem(LOCAL_KEY);
    localStorage.removeItem(NOMEEMPRESA_KEY);
    localStorage.removeItem(NOMELOCAL_KEY);
    localStorage.removeItem(NOMEUSUARIO_KEY);
    localStorage.removeItem(IDUSUARIO_KEY);
    localStorage.removeItem(EMAILUSUARIO_KEY);
    localStorage.removeItem(BREADCRUMB_KEY);
    localStorage.removeItem(SEQUSUARIO_KEY);
    if (window.location.pathname !== '/') window.location = '/';
}
