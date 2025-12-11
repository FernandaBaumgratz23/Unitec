export default function maskFormat(data, text, cpfCnpj = false) {
    if (!data) {
        return;
    }

    if (cpfCnpj) {
        if (data.length > 11) {
            text = '00.000.000/0000-00';
        } else {
            text = '000.000.000-00';
        }
    }    

    let onlyNumbers = data.replace(/[^0-9]/g, '');
    if (onlyNumbers === '') {
        return;
    } else {
        let result = '';
        let format = text.split('');
        let numbers = onlyNumbers.split('');
        let item = '';
        let index = 0;
        for (var i in numbers) {
            let num = numbers[i];
            if (!!format[index]) {
                let caracter = format[index];
                while (caracter !== '0') {
                    item = item + caracter;
                    index++;
                    caracter = format[index];
                }
                item = item + num;
                index++;
            } else {
                return;
            }
            result = item.replace('*', ' ');
            if (format.length === result.length) {
                return result;
            }
        }
    }
};