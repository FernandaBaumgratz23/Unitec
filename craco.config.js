const CracoLessPlugin = require('craco-less');

module.exports = {
    plugins: [{
        loader: 'less-loader',
        plugin: CracoLessPlugin,
        options: {
            lessLoaderOptions: {
            lessOptions: {
                modifyVars: { 
                    'primary-color' : '#0053a6',
                    'primary-color-hover' : '#004b97',
                    'primary-color-active' : '#004b97',
                    'primary-color-outline' : 'rgb(17 163 179 / 20%)',
                    'primary-1': '#eaeaea',
                    'primary-2': '#91d5ff',
                    'primary-3': '#69c0ff',
                    'primary-4': '#40a9ff',
                    'primary-5': '#bdc4cb',
                    'primary-6': '#0053a6',
                    'primary-7': '#0053a6',
                    'link-color' : '#0053a6',
                    'text-color' : '#3c3c3c',
                    'font-size-base': '12px',
                    'border-color-base': '#dfdfdf',
                    'disabled-color':  'rgba(0, 0, 0, 0.2)',
                    'primary-color-deprecated-l-35': '#62b0fd',
                    'primary-color-deprecated-l-20': '#4da5fb',
                    'primary-color-deprecated-t-20': '#3695f3',
                    'primary-color-deprecated-t-50': '#177adb',
                },
                    javascriptEnabled: true,
                },
            },
        },
    },],
};