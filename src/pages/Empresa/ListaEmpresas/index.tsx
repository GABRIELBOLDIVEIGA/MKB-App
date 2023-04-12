import { IonButton, IonItem, IonRadio, IonRadioGroup, IonText } from "@ionic/react";
import React from "react";
import { ICliente } from "interface/ICliente";

interface IProps {
    cliente: ICliente;
}

const ListaEmpresas = ({ cliente }: IProps) => {
    return (
        <>
            <IonItem>
                <div>
                    <IonText>{cliente.Nome}</IonText>
                    <IonRadio value={cliente.Cod} />
                </div>
            </IonItem>

            {/* <IonItem>
                <div>
                    <IonText>{cliente.Nome}</IonText>
                    <IonButton></IonButton>
                </div>
            </IonItem> */}
        </>
    );
};

export default ListaEmpresas;
