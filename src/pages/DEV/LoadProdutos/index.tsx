import { useCreateProduto, useCriarProdutoNovoBanco } from "graphQL/produtos/hooks";
import produtosJSON from "./produtos.json";
import { IonButton, IonContent, IonPage } from "@ionic/react";
import { useState } from "react";

interface IProduto {
  descr_detalhada: string,
  cod_prod: string,
  descr_resumida: string,
  unidade: string,
  preco: string
}

export default function LoadProdutos() {
  const { adicionarProduto, data, error } = useCriarProdutoNovoBanco()

  const cadastrar = () => {
    console.log("cadastrar")
    console.log("[Produtos.json] - ", produtosJSON.length);

    // produtosJSON.forEach((produto) => {
    //   const prod = {
    //     codigo: produto.cod_prod,
    //     descricao: produto.descr_resumida,
    //     preco: parseFloat(produto.preco.replace(",", "."))
    //   }
    //   if (prod.preco === 0) {
    //     adicionarProduto({
    //       variables: {
    //         produtoInput: { ...prod }
    //       },
    //       onCompleted: () => {
    //         console.log("Sucesso!")
    //       },
    //       onError: (erro) => {
    //         console.log("Erro");
    //         console.log(erro)
    //       }
    //     })
    //   }
    // })
  }

  return (
    <IonPage>
      <IonContent>
        <IonButton onClick={() => cadastrar()}>Cadastrar Produtos</IonButton>
      </IonContent>
    </IonPage>
  )
}
