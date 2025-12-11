import { drawerActions, manutencaoActions, listagemActions, tributacaoActions, listaTabelaDadosActions, parametrosEmpresaActions, selectPaginadoActions } from '../actions'

export const reducer = (state, action) => {
    switch (action.type) {
        case drawerActions.CHANGE:
            return {
                ...state,
                ui: action.data
            };

        case manutencaoActions.CHANGE:
            return {
                ...state,
                manutencao: action.data
            };

        case listagemActions.CHANGE:
            return {
                ...state,
                listagem: { ...state.listagem, ...action.data }
            };

        case tributacaoActions.CHANGE:
            return {
                ...state,
                tributacao: { ...state.tributacao, ...action.data }
            };
        case parametrosEmpresaActions.CHANGE:
            return {
                ...state,
                parametrosEmpresa: { ...state.parametrosEmpresa, ...action.data }
            };

        case selectPaginadoActions.CHANGE:
            return {
                ...state,
                listaSelectPaginacao: action.data
            };

        case listaTabelaDadosActions.CHANGE:
            return {
                ...state,
                listaTabelaDados: action.data
            }
        default:
            return state;
    }
};