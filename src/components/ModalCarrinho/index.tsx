import { IonModal, IonHeader, IonToolbar, IonTitle, IonButton, IonContent, IonList, IonItem, IonCard, IonCardTitle, IonCardSubtitle, IonCardHeader, IonCardContent, IonFooter, IonText } from "@ionic/react";
import { useRef } from "react";
import { formatadorMonetario } from "common/function/formatadorMonetario";
import { Carrinho } from "interface/Carrinho";
import { useCarrinhoContext } from "context/CarrrinhoContext";
import styles from "./ModalCarrinho.module.scss";
import { useCriarPedido } from "graphQL/pedidos/hooks"

interface IProps {
    carrinho: Carrinho[];
}

export default function ModalCarrinho({ carrinho: itemNoCarrinho }: IProps) {
    const modal = useRef<HTMLIonModalElement>(null);
    const [criarPedido, { data, loading, error }] = useCriarPedido();
    const { carrinho, cliente, quantidadeDeProdutos, valorTotalCarrinho } = useCarrinhoContext();

    function dismiss() {
        modal.current?.dismiss();
    }

    return (
        <IonModal ref={modal} trigger="open-modal">
            <IonHeader>
                <IonToolbar>
                    <IonItem>
                        <IonButton onClick={() => dismiss()}>Voltar</IonButton>
                        <IonTitle>Confira seu pedido</IonTitle>

                        <IonButton onClick={() => {
                            console.log("finalizar")
                            const x = {
                                cliente,
                                carrinho: carrinho,
                                total: valorTotalCarrinho
                            };
                            // console.log(JSON.stringify(x));
                            
                            
                            var json = JSON.stringify(x);  // {"type":"Fiat","model":"500","color":"White"}
                            console.log(json);
                            var unquoted = json.replace(/"([^"]+)":/g, '$1:');
                            console.log(unquoted);  // {type:"Fiat",model:"500",color:"White"}
                            var result = unquoted.replaceAll("\"", "'");
                            console.log(result); // {type:'Fiat',model:'500',color:'White'}
                            

                            // aqui !!!!
                            
                            const resultado = result.replace(/''/g, '"');
                            console.log(resultado)
                            console.log(JSON.parse(resultado))

                            criarPedido({
                                variables: {
                                    pedidoInput: {
                                        pedido: resultado
                                    }
                                }
                            })


                        }}>Finalizar</IonButton>
                    </IonItem>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonList>
                    {itemNoCarrinho?.map((prod) => (
                        <IonCard key={prod.produto.cod_prod}>
                            <IonCardHeader>
                                <IonCardTitle>{prod.produto.descr_detalhada}</IonCardTitle>
                                <IonCardSubtitle>{prod.produto.descr_resumida}</IonCardSubtitle>
                            </IonCardHeader>
                            <IonCardContent>
                                <IonItem>
                                    <IonItem slot="start">R$ {prod.produto.preco}</IonItem>
                                    <IonItem slot="end">Quantidade {prod.quantidade}</IonItem>
                                </IonItem>

                                <IonItem>Total: {formatadorMonetario.format(prod.produto.preco * prod.quantidade)}</IonItem>
                            </IonCardContent>
                        </IonCard>
                    ))}
                </IonList>
            </IonContent>

            <IonFooter>
                <IonToolbar>
                    <div className={styles.rodape}>
                        <IonTitle className={styles.textoRodape}>Valor Total do pedido: {formatadorMonetario.format(valorTotalCarrinho)}</IonTitle>
                    </div>
                </IonToolbar>
            </IonFooter>
        </IonModal>
    );
}
