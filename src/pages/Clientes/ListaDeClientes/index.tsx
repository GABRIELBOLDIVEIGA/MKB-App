import { IonItem, IonRadio, IonText } from "@ionic/react";
import { Cliente } from "interface/Cliente";
import styles from "./ListaDeClientes.module.scss";

interface IProps {
    cliente: Cliente;
}

const ListaDeClientes = ({ cliente }: IProps) => {
    return (
        <IonItem>
            <div className={styles.item}>
                <IonText>{cliente.nome}</IonText>
                <IonRadio value={cliente._id} />
            </div>
        </IonItem>
    );
};

export default ListaDeClientes;
