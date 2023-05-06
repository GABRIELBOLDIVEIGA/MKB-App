import { IonItem, IonRadio, IonText } from "@ionic/react";
import { Cliente } from "interface/Cliente";
import styles from "./ListaEmpresas.module.scss";

interface IProps {
    cliente: Cliente;
}

const ListaEmpresas = ({ cliente }: IProps) => {
    return (
        <IonItem>
            <div className={styles.item}>
                <IonText>{cliente.nome}</IonText>
                <IonRadio value={cliente.cod} />
            </div>
        </IonItem>
    );
};

export default ListaEmpresas;
