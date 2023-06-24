import { InputHTMLAttributes, forwardRef, useId } from 'react'
import * as S from './styles'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  hasError?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ name = '', type = 'text', hasError = '', ...props }, ref) => {

    const inputId = useId();
    const error = hasError.length > 0;

    return (
      <S.Container>
        <S.Label htmlFor={inputId}>{props.label}</S.Label>
        <S.Input id={inputId} name={name} type={type} ref={ref} hasError={error} {...props} />
        <S.HelperText>{hasError}</S.HelperText>
      </ S.Container>
    );
  }
);
