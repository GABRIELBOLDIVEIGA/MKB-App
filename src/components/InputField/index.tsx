import { IonItem, IonLabel, IonInput } from '@ionic/react'

interface Props {
  label?: string;
  placeholder?: string;
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>
}

export default function InputField({ label = "", placeholder = "", state, setState }: Props) {
  return (
    <IonItem>
      <IonLabel position='stacked'>{label}</IonLabel>
      <IonInput placeholder={placeholder} value={state} onIonChange={(ev) => {
        if (typeof ev.target.value === 'string') {
          setState(ev.target.value)
        }
      }} />
    </IonItem>
  )
}
