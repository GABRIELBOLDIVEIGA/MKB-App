export const pedidos2csv = (data: any) => {

  if (
    data.cliente === null ||
    data.usuario === null ||
    data.pedido === null ||
    data.pedido.carrinho === null
  ) { 
    throw new Error("Deu ruim aqui... [pedidos2csv]")
  }

  const cliente = data.cliente;
  const funcionario = data.usuario;
  const pedido = {
    date: data.pedido.date,
    _id: data.pedido._id,
  };
  const carrinho = data.pedido.carrinho;
  const array = [cliente, funcionario, pedido, carrinho];

  var keysHeaders: Array<string[]> = [];
  array.forEach((itemDoArray, index) => {
    if (itemDoArray instanceof Array) {
      keysHeaders.push(Object.keys(itemDoArray[0]).map((item) => {
        return item;
      }))
    } else {
      keysHeaders.push(Object.keys(itemDoArray).map((item) => {
        return `${item}_${index}`;
      }))
    }
  });

  var valuesOutros: Array<string> = [];
  var valuesCarrinho: Array<string> = [];
  array.forEach((itemDoArray) => {
    if (itemDoArray instanceof Array) {
      var quantidadeDeItensNoCarrinho = itemDoArray.length;
      for (let i = 0; i < quantidadeDeItensNoCarrinho; i++) {
        valuesCarrinho.push(Object.values(itemDoArray[i]).join(","));
      }
    } else {
      valuesOutros.push(Object.values(itemDoArray).join(","));
    }
  })

  var values: Array<string> = valuesCarrinho.map((item: any) => {
    const row = [valuesOutros.join(','), item].join(',');
    return row;
  });

  const headers = keysHeaders.join(',').toUpperCase();
  const csv = [headers, ...values].join('\n');
  // console.log(csv)

  return csv;
}