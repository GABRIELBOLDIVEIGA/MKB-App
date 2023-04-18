import { IonItem, IonRadio, IonText } from "@ionic/react";
import { IClientesNew } from "interface/ICliente";

interface IProps {
    cliente: IClientesNew;
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
