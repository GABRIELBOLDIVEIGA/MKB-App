import { IonCol, IonContent, IonGrid, IonItem, IonPage, IonRow } from "@ionic/react";
import BarraPesquisa from "components/BarraPesquisa";
import Cabecalho from "components/Cabecalho";
import { useEffect, useState } from "react";
import CardFuncionario from "./CardFuncionario";
import { useGetUsuarios } from "graphQL/usuario/hook";
import { Usuario } from 'interface/Usuario';
import ButtonRouter from "components/ButtonRouter";
import { addCircleOutline } from "ionicons/icons";

export default function FuncionariosADM() {
  const [busca, setBusca] = useState("");
  const [usuarios, setUsuarios] = useState<Usuario[]>();
  const { data, error, loading, refetch } = useGetUsuarios();

  useEffect(() => {
    setUsuarios(data)
  }, [loading])

  return (
    <IonPage>
      <Cabecalho texto="Cadastro Novo Cliente">
        <IonItem>
          <BarraPesquisa busca={busca} setBusca={setBusca} />
          <ButtonRouter
            icon={addCircleOutline}
            slotButton="end"
            text="Cadastrar Funcionario"
            routerLink="/cadastrarFuncionario"
          />
        </IonItem>
      </Cabecalho>

      <IonContent>
        <IonGrid>
          <IonRow>
            {usuarios?.map((usuario) => {
              return (
                <IonCol key={usuario._id} sizeSm="12" sizeMd="6" sizeLg="4" sizeXl="4">
                  <CardFuncionario {...usuario} />
                </IonCol>
              )
            })}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  )
}
