export default function formataDataDMAparaAMD(data: string) {
    const regex = /(\d{2})\/(\d{2})\/(\d{4})/;
    const substituicao = "$3-$2-$1";
    const dataFormatada = data.replace(regex, substituicao);
    
    return dataFormatada;
}


export function formataData(data: string) {

    const dia = new Date(data).getDate(); 
    const mes = new Date(data).getMonth();
    const ano = new Date(data).getFullYear()

    const d = +dia < 10 ? `0${dia}` : dia;
    const m = +mes < 9 ? `0${+mes+1}` : `${(+mes+1)}`
    
    const dataFromatada = `${d}/${(m)}/${ano}`;

    return dataFromatada;
}