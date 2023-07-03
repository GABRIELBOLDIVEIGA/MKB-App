import { useCreateProduto } from "graphQL/produtos/hooks";
import produtos from "./produtos.json";
import { IonButton, IonContent, IonPage } from "@ionic/react";

export default function LoadProdutos() {
  const { createProduto, data, error, loading } = useCreateProduto();


  const cadastrar = () => {
    console.log("cadastrar")

    produtos.forEach((produto) => {
      createProduto({
        variables: {
          produtoInput: { ...produto, preco: parseFloat(produto.preco.replace(",", ".")) }
        },
        onCompleted: () => {
          console.log("Sucesso!")
        },
        onError: (erro) => {
          console.log("Erro!")
          console.log(erro)
        }
      })
    })
  }

  return (
    <IonPage>
      <IonContent>
        <IonButton onClick={() => cadastrar()}>Cadastrar</IonButton>
      </IonContent>
    </IonPage>
  )
}
