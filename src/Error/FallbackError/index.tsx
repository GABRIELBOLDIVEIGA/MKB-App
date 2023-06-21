import "./FallbackError.css"

export type ErrorFallbackProps = {
  error: Error;
  resetErrorBoundary?: () => void;
}

export default function FallbackError({ error, resetErrorBoundary }: ErrorFallbackProps) {
  return (
    <div>
      <div>
        <div className="container">
          <p className="glitch">
            <span aria-hidden="true">Error!</span>
            Error!
            <span aria-hidden="true">Error!</span>
          </p>
        </div>

        <div className="containerTexto">
          <p>As coisas estão meio estranhas hoje...</p>
        </div>
      </div>
    </div>

  )
}
