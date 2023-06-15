import { IonCol, IonContent, IonGrid, IonItem, IonPage, IonRow, IonTitle } from "@ionic/react";
import BarraPesquisa from "components/BarraPesquisa";
import Cabecalho from "components/Cabecalho";
import { useEffect, useState } from "react";
import CardFuncionario from "./CardFuncionario";
import { useGetUsuarios } from "graphQL/usuario/hook";
import { Usuario } from 'interface/Usuario';
import ButtonRouter from "components/ButtonRouter";
import { addCircleOutline } from "ionicons/icons";
import TabelaFuncionarios from "./TabelaFuncionarios";

export default function FuncionariosADM() {
  const [busca, setBusca] = useState("");
  const [usuarios, setUsuarios] = useState<Usuario[]>();
  const { data, error, loading, refetch } = useGetUsuarios();

  useEffect(() => {
    setUsuarios(data);
  }, [loading])

  useEffect(() => {
    refetch();
  }, [])

  return (
    <IonPage>
      <Cabecalho>
        <IonTitle>Funcionários</IonTitle>
        <ButtonRouter
          icon={addCircleOutline}
          slotButton="end"
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
