import "./error.css"
import { IonIcon } from "@ionic/react"
import { homeOutline } from "ionicons/icons"
import { Link } from "react-router-dom"
import styled from "styled-components"

const LinkS = styled(Link)`
  text-decoration: none;
  text-align: center;
`

const Container = styled.div`
  text-align: center;
`

export default function Error() {
  return (
    <div>
      <div className="container">
        <p className="glitch">
          <span aria-hidden="true">Error!</span>
          Error!
          <span aria-hidden="true">Error!</span>
        </p>
      </div>
      <Container>
        <p>As coisas estão meio estranhas hoje...</p>
        <p>Melhor voltar para o <LinkS to='/login'> <IonIcon src={homeOutline} /> Início</LinkS></p>
      </Container>
    </div>
  )
}
