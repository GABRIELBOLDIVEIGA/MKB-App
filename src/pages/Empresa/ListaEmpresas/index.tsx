import { IonItem, IonRadio, IonText } from "@ionic/react";
import { ICliente } from "interface/ICliente";

interface IProps {
    cliente: ICliente;
}

const ListaEmpresas = ({ cliente }: IProps) => {
    return (
        <IonItem>
            <div>
                <IonText>{cliente.Nome}</IonText>
                <IonRadio value={cliente.Cod} />
            </div>
        </IonItem>
    );
};

export default ListaEmpresas;
