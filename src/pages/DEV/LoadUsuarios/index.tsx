import usuarios from "./usuarios.json";
import { IonButton, IonContent, IonPage } from "@ionic/react";
import { useCadastrarUsuarioNovoBanco } from "graphQL/usuario/hook";

export default function LoadUsuarios() {
  const { adicionarUsuario, data, error, loading } = useCadastrarUsuarioNovoBanco();


  const cadastrar = () => {
    console.log("cadastrar")
    console.log(usuarios.length)
    usuarios.forEach((usuario) => {
      // adicionarUsuario({
      //   variables: {
      //     usuarioInput: { ...usuario, observacoes: usuario.observacoes.replace(",", ".") }
      //   },
      //   onCompleted: () => {
      //     console.log("Sucesso!")
      //   },
      //   onError: (erro) => {
      //     console.log("Erro!")
      //     console.log(erro)
      //   }
      // })
    })
  }

  return (
    <IonPage>
      <IonContent>
        <IonButton onClick={() => cadastrar()}>Cadastrar Usuarios</IonButton>
      </IonContent>
    </IonPage>
  )
}
