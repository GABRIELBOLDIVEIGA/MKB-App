import { IonCard } from "@ionic/react"
import styled from "styled-components"

export const Container = styled.section`
  display: grid;
  place-items: center;
  height: 100%;
`
export const Card = styled(IonCard)`
  @media screen and (max-width: 650px) {
    padding-top: 2rem;
    width: 100%;
    height: 100%;
  }
  @media screen and (min-width: 650px) {
    width: 50%;
    height: max-content; 
    margin: 0 !important;
  }
`