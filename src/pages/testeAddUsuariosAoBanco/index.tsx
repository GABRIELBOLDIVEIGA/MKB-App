import React from "react";

import { Usuario } from "interface/Usuario";
import { IonButton, IonCard, IonCardContent, IonCardTitle, IonContent, IonItem, IonPage } from "@ionic/react";
import { useAdicionarItem } from "./graphQL/usuarios/hooks";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "./graphQL/usuarios/queries";

const Add: React.FC = () => {
    const user: Usuario = {
        nome: "Alguem",
        cpf: "teste 1",
        email: "teste1@gmail.com",
        senha: "senhaDeTeste123!",
        privilegio: 0,
    };

    const [createUsuario, { loading, error }] = useMutation(ADD_USER);

    
    // const arrayOfUsers: Usuario[] = [
    //     {
    //         nome: "User1",
    //         cpf: "User1",
    //         email: "User1",
    //         senha: "User1",
    //         privilegio: 1,
    //     },
    //     {
    //         nome: "User2",
    //         cpf: "User2",
    //         email: "User2",
    //         senha: "User2",
    //         privilegio: 2,
    //     },
    //     {
    //         nome: "User3",
    //         cpf: "User3",
    //         email: "User3",
    //         senha: "User3",
    //         privilegio: 3,
    //     },
    // ];


    // arrayOfUsers.forEach((user) => {
    //     createUsuario({
    //         variables: {
    //             usuarioInput: {
    //                 nome: user.nome,
    //                 cpf: user.cpf,
    //                 email: user.email,
    //                 senha: user.senha,
    //                 privilegio: user.privilegio,
    //             },
    //         },
    //     });
    // });

    return (
        <IonPage>
            <IonContent>
                <IonCard>
                    <IonCardTitle>Add User</IonCardTitle>
                    <IonCardContent>
                        <IonItem>Nome: {user.nome}</IonItem>
                        <IonItem>E-mail: {user.email}</IonItem>
                        <IonItem>CPF: {user.cpf}</IonItem>
                        <IonItem>Senha: {user.senha}</IonItem>
                        <IonItem>Privilegio: {user.privilegio}</IonItem>
                    </IonCardContent>
                    <IonButton
                        onClick={() => {
                            createUsuario({
                                variables: {
                                    usuarioInput: {
                                        nome: "123",
                                        cpf: "",
                                        email: "",
                                        senha: "",
                                        privilegio: 0,
                                    },
                                },
                            });
                        }}
                    >
                        +
                    </IonButton>
                </IonCard>
            </IonContent>
        </IonPage>
    );
};

export default Add;
