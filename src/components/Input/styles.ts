import styled, { css } from "styled-components";
import { darken, lighten } from "polished"

const blue = '#3880ff';
const red = '#ff4961';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: .5rem;
  padding-bottom: 0;
  width: 100%;

  label + input {
    margin-top: .5rem;
  }
`
export const Input = styled.input<{ hasError: boolean }>`

padding: .5rem;
border-radius: 8px;
border: 1px solid ${blue};
color: var(--ion-color-secondary-contrast);

&:focus {
  border-color: ${darken(0.1, blue)};
  outline: 2px solid ${lighten(0.2, blue)};
}

&::placeholder {
  color: var(--ion-color-medium-tint)
}

${({ hasError }) => hasError && css`
  border-color: ${red};
  `}
`;
export const Label = styled.label`
  font-size: .9rem;
  color: var(--ion-color-light-contrast); 
`

export const HelperText = styled.p`
  text-align: left;
  color: ${red};
  margin: 0;
  padding-top: .2rem;
  height: max-content;
`
