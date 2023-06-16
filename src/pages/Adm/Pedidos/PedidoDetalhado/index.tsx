import { IonButton, IonCol, IonContent, IonGrid, IonItem, IonPage, IonRow, IonText, IonTitle } from "@ionic/react";
import Cabecalho from "components/Cabecalho";
import { useGetPedidoById, useGetPedidoById2Csv, useGetPedidosByUserIdV2 } from "graphQL/pedidos/hooks"
import { useParams } from "react-router";
import { BsFiletypeCsv, BsFiletypePdf } from "react-icons/bs";
import { formatadorMonetario } from "common/function/formatadorMonetario";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { pedidos2csv } from "utils/gerarCSVpedidos";
import { CSVLink } from "react-csv";
import iconLogo from "assets/icon-logo.jpg"
import { dateFormatter } from "common/function/formatadorDataPT-BR";
import { Produto } from "interface/Produto";
import { Carrinho } from "interface/Carrinho";

const Container = styled.section`
  height: 100%;
  display: grid;
  place-items: center;
`
const Section = styled.section`
  border: 3px solid var(--ion-color-medium-tint);
  border-radius: 10px;
  width: 100%;
  max-width: 900px;
  min-width: 412px;
  margin-top: 1.5rem;
  background-color: var(--ion-color-light);
`
const Div = styled.div`
  border: 1px solid var(--ion-color-light-contrast);
  border-radius: 10px;
  padding: 1rem;
  margin: 1rem;
`
const Strong = styled.strong`
  font-size: 1rem;
`
const P = styled.p`
  padding: .3rem;
  border-bottom: 1px solid var(--ion-color-light-contrast);
`
const Img = styled.img`
  border: 1px solid red;
  width: 64px;
`

export default function PedidoDetalhado() {
  const params = useParams<{ id: string }>();
  const { data, loading, error, refetch } = useGetPedidoById(params.id);
  const valorTotalDoPedido = formatadorMonetario.format(data?.pedido?.total ? +data?.pedido?.total : 0);
  const { data: dataCSV, loading: loadingCSV, error: errorCSV, refetch: refetchCSV } = useGetPedidoById2Csv(params.id);
  const [csvData, setCsvData] = useState("")

  useEffect(() => {
    if (dataCSV) {
      setCsvData(pedidos2csv(dataCSV))
    }

  }, [loadingCSV])


  return (
    <IonPage>
      <Cabecalho>
        <IonTitle>Pedido Detalhado</IonTitle>
        <IonItem>

          <CSVLink title="Baixar pedido em CSV" filename={"pedido.csv"} target="_blank" data={csvData}>
            <IonButton size="small" fill="default" >
              <BsFiletypeCsv size={24} color="#FFF" />
            </IonButton>
          </CSVLink>
          <IonButton title="Baixar pedido em PDF" size="small" fill="default">
            <BsFiletypePdf size={24} color="#FFF" />
          </IonButton>
        </IonItem>
      </Cabecalho>

      <IonContent>
        <Container>
          <Section>
            <Div>
              <IonRow class=" ion-align-items-center">
                {/* <IonCol size="1"> */}
                {/* <Img src={iconLogo} /> */}
                {/* </IonCol> */}

                <IonCol size="8">
                  <IonRow class="ion-justify-content-center">
                    <p>Rua Professor Walter Wey, 237 - CEP : 03257-150 - São Paulo / SP</p>
                  </IonRow>
                  <IonRow class="ion-justify-content-center">
                    <p>TEL. : (11) 2703-5745 - FAX: (11) 2143-0452</p>
                  </IonRow>
                  <IonRow class="ion-justify-content-center">
                    <p>site: www.kmbrodizios.com.br e-mail kmb@kmbrodizios.com.br</p>
                  </IonRow>
                </IonCol>

                <IonCol size="2" offsetXl="2" offsetSm="0">
                  <P style={{ width: "max-content" }}>
                    {data?.pedido?.date ?
                      dateFormatter(data?.pedido?.date) :
                      ''
                    }
                  </P>
                </IonCol>
              </IonRow>
            </Div>
            <Div>
              <IonText><Strong>Dados do Cliente</Strong></IonText>
              <IonGrid>
                <IonRow>
                  <IonCol><P><Strong>Nome: </Strong>{data?.cliente?.nome.toUpperCase()}</P></IonCol>
                  <IonCol><P><Strong>CNPJ: </Strong>{data?.cliente?.cnpj}</P></IonCol>
                </IonRow>

                <IonRow>
                  <IonCol><P><Strong>End: </Strong>{data?.cliente?.endereco?.toUpperCase()}</P></IonCol>
                </IonRow>

                <IonRow>
                  <IonCol><P><Strong>Bairro: </Strong>{data?.cliente?.bairro?.toUpperCase()}</P></IonCol>
                  <IonCol><P><Strong>Cidade: </Strong>{data?.cliente?.cidade?.toUpperCase()}</P></IonCol>
                  <IonCol><P><Strong>CEP: </Strong>{data?.cliente?.cep}</P></IonCol>
                  <IonCol><P><Strong>UF: </Strong>{data?.cliente?.uf?.toUpperCase()}</P></IonCol>
                </IonRow>

                <IonRow>
                  <IonCol><P><Strong>DDD: </Strong>{data?.cliente?.ddd}</P></IonCol>
                  <IonCol><P><Strong>Fone1: </Strong>{data?.cliente?.fone1}</P></IonCol>
                  <IonCol><P><Strong>Fone2: </Strong>{data?.cliente?.fone2}</P></IonCol>
                  <IonCol><P><Strong>Celular: </Strong>{data?.cliente?.celular}</P></IonCol>
                  <IonCol><P><Strong>Fax: </Strong>{data?.cliente?.fax}</P></IonCol>
                </IonRow>

                <IonRow>
                  <IonCol><P><Strong>Email: </Strong>{data?.cliente?.email?.toUpperCase()}</P></IonCol>
                  <IonCol><P><Strong>Vendedor: </Strong>{data?.usuario?.nome?.toUpperCase()}</P></IonCol>
                </IonRow>
              </IonGrid>
            </Div>

            <Div>
              <IonText><Strong>Relação de Produtos Vendidos</Strong></IonText>
              <IonGrid>
                <IonRow style={{ borderBottom: "1px solid var(--ion-color-light-contrast)", margin: "1rem 0" }}>
                  <IonCol size="2"><IonText><Strong>Cód Prod</Strong></IonText></IonCol>
                  <IonCol size="4"><IonText><Strong>Descriminação dos Produtos</Strong></IonText></IonCol>
                  <IonCol size="1"><IonText><Strong>Unid</Strong></IonText></IonCol>
                  <IonCol size="1"><IonText><Strong>Qtde</Strong></IonText></IonCol>
                  <IonCol size="2"><IonText><Strong>Val. Uni </Strong></IonText></IonCol>
                  <IonCol size="2"><IonText><Strong>Valor Total</Strong></IonText></IonCol>
                </IonRow>

                {data?.pedido?.carrinho?.map((item: Carrinho) => {
                  return (
                    <IonRow key={item.cod_prod} >
                      <IonCol size="2">{item.cod_prod}</IonCol>
                      <IonCol size="4">{item.descr_resumida}</IonCol>
                      <IonCol size="1">{item.unidade}</IonCol>
                      <IonCol size="1">{item.quantidade}</IonCol>
                      <IonCol size="2">{formatadorMonetario.format(item.preco)}</IonCol>
                      <IonCol size="2">{formatadorMonetario.format(item.preco)}</IonCol>
                    </IonRow>
                  )
                })}
              </IonGrid>
            </Div>

            <Div>
              <IonRow>
                <IonCol offsetXl="10" offsetSm="0"><P><Strong>Total: </Strong>{valorTotalDoPedido}</P></IonCol>
              </IonRow>
            </Div>

          </Section>
        </Container>
      </IonContent>
    </IonPage>
  )
}
