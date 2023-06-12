import { IonContent, IonPage } from "@ionic/react";

const dataAPI = {
  cliente: {
    cod: "1",
    nome: "KMB INDÚSTRIA E COMÉRCIO LTDA EPP",
    cnpj: "05440364000106",
    email: "kmb@kmbrodizios.com.br"
  },
  usuario: {
    cpf: "000",
    email: "krebinho@gmail.com",
    nome: "Krebinho"
  },
  pedido: {
    carrinho: [
      {
        cod_prod: "004GBR1635",
        descr_resumida: "GB 102 FE/PU RO",
        preco: 252,
        quantidade: 322
      },
      {
        cod_prod: "004FBR1634",
        descr_resumida: "FB 102 FE/PU RO",
        preco: 183,
        quantidade: 123
      }
    ],
    date: "2023-06-07T17:19:25.917Z",
    total: 103653
  }
}

const cliente = {
  codCliente: dataAPI.cliente.cod,
  nomeCliente: dataAPI.cliente.nome,
  emailCliente: dataAPI.cliente.email,
  cnpjCliente: dataAPI.cliente.cnpj
};
const funcionario = {
  cpfFuncionario: dataAPI.usuario.cpf,
  nomeFuncionario: dataAPI.usuario.nome,
  emailFuncionario: dataAPI.usuario.email,
};
const pedido = {
  date: dataAPI.pedido.date,
  total: dataAPI.pedido.total,
};
const carrinho = dataAPI.pedido.carrinho;

const arrayCsv = carrinho.map((item) => {
  var obj = {
    ...cliente,
    ...funcionario,
    ...pedido,
    ...item
  }

  console.log(JSON.stringify(obj));
  return obj
})
console.log(arrayCsv)

export default function TesteCSV() {
  return (
    <IonPage>
      <IonContent>

      </IonContent>
    </IonPage>
  )
}
