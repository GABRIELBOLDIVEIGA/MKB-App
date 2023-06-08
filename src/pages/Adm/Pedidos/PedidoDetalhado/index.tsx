import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonPage, IonRow } from "@ionic/react";
import Cabecalho from "components/Cabecalho";
import { useGetPedidoById } from "graphQL/pedidos/hooks"
import { useParams } from "react-router";
import { BsFiletypeCsv, BsFiletypePdf } from "react-icons/bs";
import CampoTexto from "./CampoTexto";
import { formatadorMonetario } from "common/function/formatadorMonetario";
export default function PedidoDetalhado() {
  const params = useParams<{id: string}>();
  const { data, loading, error, refetch } = useGetPedidoById(params.id);
  const valorTotalDoPedido = formatadorMonetario.format(data?.pedido.total ? +data?.pedido.total : 0)

  return (
    <IonPage>
      <Cabecalho texto="Pedido Detalhado">
        <IonButton size="small" fill="default">
          <BsFiletypeCsv size={24} color="#FFF" />
        </IonButton>
        <IonButton size="small" fill="default">
          <BsFiletypePdf size={24} color="#FFF" />
        </IonButton>
      </Cabecalho>

      <IonContent>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>{data?.cliente.nome}</IonCardTitle>
            <IonCardSubtitle>{`Email: ${data?.cliente.email}`}</IonCardSubtitle>
            <IonCardSubtitle>{`CNPJ: ${data?.cliente.cnpj}`}</IonCardSubtitle>
          </IonCardHeader>

          <IonCardContent>
            <IonGrid>
              <IonRow>
                <CampoTexto size={1.5} label="Info Compra" lines="full" />
              </IonRow>
              <IonRow>
                <CampoTexto size={1.5} label="Total:" dados={`${valorTotalDoPedido}`} lines="full" />
              </IonRow>
              <IonRow>
                {data?.pedido.carrinho.map(item => {
                  return (
                    <IonCol key={item.cod_prod} sizeSm="12" sizeMd="6" sizeLg="6" sizeXl="4">
                      <div style={{ border: "1px solid #86888f", borderRadius: "10px", padding: "5px" }}>
                        <CampoTexto label="Cod:" dados={item.cod_prod} />
                        <CampoTexto label="Descrição Detalhada:" dados={item.descr_detalhada} />
                        <CampoTexto label="Descrição Resumida:" dados={item.descr_resumida} />
                        <CampoTexto label="Tipo:" dados={item.unidade} />
                        <CampoTexto label="Quantidade:" dados={`${item.quantidade}`} />
                        <CampoTexto label="Preço:" dados={`${formatadorMonetario.format(item.preco)}`} />
                      </div>
                    </IonCol>
                  )
                })}
              </IonRow>


              <IonRow>
                <IonCol>
                  <CampoTexto size={1.5} label="Info Cliente" lines="full" />
                </IonCol>
                <IonCol>
                  <CampoTexto size={1.5} label="Info Funcionário" lines="full" />
                </IonCol>
              </IonRow>

              <IonRow>
                <IonCol>
                  <CampoTexto label="UF:" dados={data?.cliente.uf} />
                  <CampoTexto label="Cidade:" dados={data?.cliente.cidade} />
                  <CampoTexto label="Bairro:" dados={data?.cliente.bairro} />
                  <CampoTexto label="Endereço:" dados={data?.cliente.endereco} />
                  <CampoTexto label="Número:" dados={data?.cliente.numero} />
                  <CampoTexto label="CEP:" dados={data?.cliente.cep} />
                  <CampoTexto label="Fone 1:" dados={`(${data?.cliente.ddd}) ${data?.cliente.fone1}`} />
                  <CampoTexto label="Fone 2:" dados={`(${data?.cliente.ddd}) ${data?.cliente.fone2}`} />
                  <CampoTexto label="Celular:" dados={`(${data?.cliente.ddd}) ${data?.cliente.celular}`} />
                  <CampoTexto label="Fax:" dados={data?.cliente.fax} />
                  <CampoTexto label="Fax:" dados={data?.cliente.fax} />
                </IonCol>

                <IonCol>
                  <CampoTexto label="Nome" dados={data?.usuario.nome} />
                  <CampoTexto label="Email" dados={data?.usuario.email} />
                  <CampoTexto label="CPF" dados={data?.usuario.cpf} />
                </IonCol>
              </IonRow>

            </IonGrid>
          </IonCardContent>
        </IonCard>

      </IonContent>
    </IonPage>
  )
}
