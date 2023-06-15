import { IonContent, IonFooter, IonHeader, IonItem, IonLoading, IonMenuButton, IonPage, IonRadioGroup, IonSearchbar, IonTitle, IonToolbar } from "@ionic/react";
import { useEffect, useState } from "react";
import ListaDeClientes from "./ListaDeClientes";
import { useCarrinhoContext } from "context/CarrrinhoContext";
import { useClientes } from "graphQL/clientes/hooks";
import { Cliente } from "interface/Cliente";
import ButtonRouter from "components/ButtonRouter";
import { arrowForwardOutline } from "ionicons/icons";

const Clientes = () => {
  const [busca, setBusca] = useState<string | null | undefined>("");
  const [btnAvancar, setBtnAvancar] = useState(false);
  const [filtro, setFiltro] = useState<Cliente[]>([]);
  const { selecionaCliente } = useCarrinhoContext();
  const { data, loading } = useClientes();
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

  useEffect(() => {
    const b = busca && busca.toLowerCase();

    const result = data?.filter((cliente) => cliente.nome.toLowerCase().includes(b!));

    if (result) {
      if (result.length >= 50) {
        setFiltro(result.slice(0, 100));
      } else {
        setFiltro(result);
      }
    }
  }, [busca])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonItem>
            <IonMenuButton />
            <IonTitle>Selecione um Cliente</IonTitle>
          </IonItem>
        </IonToolbar>
        <IonToolbar>
          <IonSearchbar
            placeholder="Filtro..."
            color="light"
            showCancelButton="focus"
            animated={true}
            onIonChange={(ev) => setBusca(ev.target.value)}
          />
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
          <ButtonRouter
            icon={arrowForwardOutline}
            slotIcon="end"
            text="Avançar"
            routerLink="/produtos"
            disabled={!btnAvancar}
          />
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
