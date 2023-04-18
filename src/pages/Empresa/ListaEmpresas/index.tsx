import { IonItem, IonRadio, IonText } from "@ionic/react";
import { ICliente } from "interface/ICliente";
import { IClientesNew } from "interface/IClientesNew";

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
