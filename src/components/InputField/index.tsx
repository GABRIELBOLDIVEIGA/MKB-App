import { IonItem, IonLabel, IonInput } from '@ionic/react'

interface Props {
  required?: boolean;
  label?: string;
  placeholder?: string;
  position?: "fixed" | "stacked" | "floating" | undefined;
  state: string | undefined;
  // setState: React.Dispatch<React.SetStateAction<string | undefined>>;
  setState: React.Dispatch<React.SetStateAction<string | undefined>> | undefined
  type?: "number" | "password" | "text"
}

export default function InputField({ type = "text", required = false, label = "", placeholder = "", position = undefined, state, setState }: Props) {
  return (
    <IonItem>
      <IonLabel position={position}>{label}</IonLabel>
      <IonInput type={type} required={required} placeholder={placeholder} value={state} onIonChange={(ev) => {
        if (typeof ev.target.value === 'string') {
          if(setState != undefined)
          setState(ev.target.value)
        }
      }} />
    </IonItem>
  )
}
