
import { IonCard } from "@ionic/react"
import styled from "styled-components"

export const Container = styled.section`
  display: grid;
  place-items: center;
  height: max-content;
`
export const Card = styled(IonCard)`
  @media screen and (max-width: 650px) {
    width: 100%;
    height: max-content;
    margin: 0 !important;
  }
  @media screen and (min-width: 650px) {
    width: 50%;
    height: max-content; 
    margin: 2rem 0 !important;
  }
`