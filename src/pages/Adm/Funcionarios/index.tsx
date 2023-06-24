import { IonContent, IonPage, IonTitle } from "@ionic/react";
import Cabecalho from "components/Cabecalho";
import ButtonRouter from "components/ButtonRouter";
import { addCircleOutline } from "ionicons/icons";
import TabelaFuncionarios from "./TabelaFuncionarios";

export default function FuncionariosADM() {
  
  return (
    <IonPage>
      <Cabecalho>
        <IonTitle>Funcionários</IonTitle>
        <ButtonRouter
          icon={addCircleOutline}
          text="Cadastrar Funcionario"
          routerLink="/cadastrarFuncionario"
        />
      </Cabecalho>

      <IonContent>
        <TabelaFuncionarios />
      </IonContent>
    </IonPage>
  )
}
