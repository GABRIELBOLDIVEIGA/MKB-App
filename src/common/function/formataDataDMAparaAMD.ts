export default function formataDataDMAparaAMD(data: string) {
    const regex = /(\d{2})\/(\d{2})\/(\d{4})/;
    const substituicao = "$3-$2-$1";
    const dataFormatada = data.replace(regex, substituicao);
    
    return dataFormatada;
}
