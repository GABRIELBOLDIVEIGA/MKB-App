import { IonItem } from "@ionic/react";
import React from "react";
import { ICliente } from "interface/ICliente";

interface IProps {
    clientes: ICliente[];
}

const ListaEmpresas = ({ clientes }: IProps ) => {
    return <IonItem></IonItem>;
};

export default ListaEmpresas;
