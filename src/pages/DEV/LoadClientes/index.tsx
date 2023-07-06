import clientes1 from "./clientes1.json";
import clientes2 from "./clientes2.json";
import clientes3 from "./clientes3.json";
import clientes4 from "./clientes4.json";
import { IonButton, IonContent, IonItem, IonPage, IonSearchbar } from "@ionic/react";
import { useCadastrarClientesNovoBanco } from "graphQL/clientes/hooks";

export default function LoadClientes() {
  const { adicionarCliente, data, error, loading } = useCadastrarClientesNovoBanco();

  const cadastrar = () => {
    console.log("cadastrar") // 3296 clientes
    console.log("[Clientes.json 1] ", clientes1.length) // 994
    console.log("[Clientes.json 2] ", clientes2.length) // 722
    console.log("[Clientes.json 3] ", clientes3.length) // 757
    console.log("[Clientes.json 4] ", clientes4.length) // 823

    // clientes4.forEach((cliente) => {
    //   adicionarCliente({
    //     variables: {
    //       clienteInput: {
    //         ...cliente,
    //         documento: cliente.documento.replace(",", "."),
    //         inscricaoEstadual: cliente.inscricaoEstadual.replace(",", "."),
    //         endereco: cliente.endereco.replace(",", "."),
    //         numero: cliente.numero.replace(",", "."),
    //         complemento: cliente.complemento.replace(",", "."),
    //         bairro: cliente.bairro.replace(",", "."),
    //         municipio: cliente.municipio.replace(",", "."),
    //         observacoes: cliente.observacoes.replace(",", ".")
    //       }
    //     },
    //     onCompleted: () => {
    //       console.log("Sucesso!")
    //     },
    //     onError: (erro) => {
    //       console.log("Erro!")
    //       console.log(erro)
    //     }
    //   })
    // })
  }

  

  return (
    <IonPage>
      <IonContent>
        <IonButton onClick={() => cadastrar()}>Cadastrar Clientes</IonButton>

      </IonContent>
    </IonPage>
  )
}
