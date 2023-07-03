import { IonItem, IonRadio, IonText } from "@ionic/react";
import { Cliente } from "interface/Cliente";
// import styles from "./ListaDeClientes.module.scss";
import styled from "styled-components";


const Row = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  /* justify-content: space-between; */

  @media screen and (max-width: 600px) {
    /* border: 1px solid red; */
    flex-direction: column;
    align-items: flex-start;
  }
`
const P = styled.p`
  font-size: .75rem;
  padding-right: 1rem;
`

interface IProps {
  cliente: Cliente;
}

const ListaDeClientes = ({ cliente }: IProps) => {

  return (
    <IonItem>
      <Row>
        <P>CNPJ: {cliente.cnpj}</P>
        <IonText>{cliente.nome}</IonText>
      </Row>
      <IonRadio value={cliente._id} />
    </IonItem>
  );
};

export default ListaDeClientes;
