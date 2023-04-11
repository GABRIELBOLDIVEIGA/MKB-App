import React, { useState } from "react";
import { IonAlert, IonButton, IonIcon } from "@ionic/react";
import { logOutOutline } from "ionicons/icons";
import "./LogOut.css";

const LogOut: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    // aqui tem que usar o context pra saber se esta logado ou nao

    return (
        <React.Fragment>
            <IonButton onClick={() => setIsOpen(!isOpen)} color="danger" fill="outline">
                <IonIcon slot="start" icon={logOutOutline} />
                Sair
            </IonButton>
            <IonAlert
                header="Deseja Sair ?"
                buttons={[
                    {
                        text: "Voltar",
                        role: "cancel",
                        cssClass: "alert-button-cancel",
                        handler: () => {
                            setIsOpen(!isOpen);
                        },
                    },
                    {
                        text: "Sair",
                        role: "confirm",
                        cssClass: "alert-button-confirm",
                        handler: () => {
                            window.location.href = "/login";
                        },
                    },
                ]}
                isOpen={isOpen}
            ></IonAlert>
        </React.Fragment>
    );
};

export default LogOut;
