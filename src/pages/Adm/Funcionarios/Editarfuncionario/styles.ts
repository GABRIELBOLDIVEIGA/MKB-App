import { IonCard } from "@ionic/react"
import styled from "styled-components"

export const Section = styled.section`
  margin-top: 5rem;
  display:  flex;
  justify-content: center;
`
export const Card = styled(IonCard)`
  width: 50%;
  @media screen and (max-width: 650px) {
    width: 100%;
  }
`