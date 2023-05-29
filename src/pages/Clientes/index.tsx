import { IonButton, IonButtons, IonContent, IonFooter, IonHeader, IonItem, IonLoading, IonMenuButton, IonPage, IonRadioGroup, IonTitle, IonToolbar } from "@ionic/react";
import BarraPesquisa from "components/BarraPesquisa";
import { useEffect, useState } from "react";

import ListaDeClientes from "./ListaDeClientes";
import { Link } from "react-router-dom";
import styles from "./Empresa.module.scss";
import { useCarrinhoContext } from "context/CarrrinhoContext";
import { useClientes } from "graphQL/clientes/hooks";
import { Cliente } from "interface/Cliente";

const Clientes = () => {
  const [busca, setBusca] = useState("");
  const [btnAvancar, setBtnAvancar] = useState(false);
  const [filtro, setFiltro] = useState<Cliente[]>([]);
  const { selecionaCliente } = useCarrinhoContext();
  const { data, loading, error } = useClientes();
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    if (data) {
      if (data.length >= 50) {
        setFiltro(data.slice(0, 100));
      } else {
        setFiltro(data);
      }
    }
  }, [data]);

  useEffect(() => {
    setShowLoading(loading)
  }, [loading])

  const aplicarFiltro = () => {
    const b = busca && busca.toLowerCase();

    const result = data?.filter((prod) => prod.nome.toLowerCase().includes(b));

    console.log(result);
    if (result) {
      if (result.length >= 50) {
        setFiltro(result.slice(0, 100));
      } else {
        setFiltro(result);
      }
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Empresas</IonTitle>
        </IonToolbar>
        <IonToolbar>
          <BarraPesquisa placeholder="Selecione uma Empresa" busca={busca} setBusca={setBusca} />
          <IonButton onClick={aplicarFiltro} slot="end">
            Filtrar
          </IonButton>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonRadioGroup
          allowEmptySelection={false}
          onIonChange={(ev) => {
            selecionaCliente(ev.target.value);
            setBtnAvancar(true);
          }}
        >
          {filtro.map((cliente, index) => {
            return <ListaDeClientes key={index} cliente={cliente} />;
          })}
        </IonRadioGroup>
      </IonContent>
      <IonFooter>
        <IonToolbar>
          <IonItem>
            <div className={styles.ionButtonContainer}>
              <Link to="produtos">
                <IonButton slot="end" color="primary" disabled={!btnAvancar} size="default">
                  Avançar
                </IonButton>
              </Link>
            </div>
          </IonItem>
        </IonToolbar>
      </IonFooter>
      <IonLoading
        isOpen={showLoading}
        message={'Carregando lista de clientes...'}
      />
    </IonPage>
  );
};

export default Clientes;
