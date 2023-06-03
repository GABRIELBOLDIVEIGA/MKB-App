import { IonButton, IonCol, IonContent, IonGrid, IonItem, IonPage, IonRow } from "@ionic/react";
import BarraPesquisa from "components/BarraPesquisa";
import Cabecalho from "components/Cabecalho";
import { useEffect, useState } from "react";
import CardFuncionario from "./CardFuncionario";
import { useGetUsuarios } from "graphQL/usuario/hook";
import { Usuario } from 'interface/Usuario';

export default function FuncionariosADM() {
  const [busca, setBusca] = useState("");
  const [usuarios, setUsuarios] = useState<Usuario[]>();
  const { data, error, loading, refetch } = useGetUsuarios();

  useEffect(() => {
    console.log(data)
    setUsuarios(data)
  }, [loading])

  return (
    <IonPage>
      <Cabecalho texto="Funcionarios">
        <IonGrid>
          <IonRow>
            <IonCol sizeXs="12" sizeSm="12" sizeMd="8" sizeLg="8" sizeXl="8">
              <BarraPesquisa busca={busca} setBusca={setBusca} placeholder="Funcionario" />
            </IonCol>
            <IonCol sizeXs="12" sizeSm="12" sizeMd="2" sizeLg="2" offsetXl="2">
              <IonButton>Adicionar Funionario</IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
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
