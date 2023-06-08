export const dateFormatter = (data: Date) => {
  const date = new Date(data)

  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short'
  }).format(date);
}