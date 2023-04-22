import { IonItem, IonRadio, IonText } from "@ionic/react";
import { Cliente } from "interface/Cliente";

interface IProps {
    cliente: Cliente;
}

const ListaEmpresas = ({ cliente }: IProps) => {
    return (
        <IonItem>
            <div>
                <IonText>{cliente.nome}</IonText>
                <IonRadio value={cliente.cod} />
            </div>
        </IonItem>
    );
};

export default ListaEmpresas;
