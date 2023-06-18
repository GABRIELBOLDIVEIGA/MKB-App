import { useState, useEffect, useLayoutEffect } from 'react';
import {
  IonContent,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonList,
} from '@ionic/react';
import { Produto } from 'interface/Produto';
import ProdutoItem from './item';

interface IProps {
  produtos: Produto[];
  filtro: Produto[];
}

function InfiniteScroll({ produtos, filtro }: IProps) {
  const [produtosLista, setProdutosLista] = useState<Produto[]>([]);
  
  useEffect(() => {
    generateListaProdutos();
  }, [produtos]);

  useLayoutEffect(() => {
    setProdutosLista(filtro.slice(0, 50))
  }, [filtro])
  
  const generateListaProdutos = () => {
    const newListaTeste: Produto[] = [];
    newListaTeste.push(...produtosLista, ...produtos.slice(produtosLista.length, produtosLista.length + 50))
    setProdutosLista([...newListaTeste]);
  };

  return (
    <IonContent>
      <IonList>
        {produtosLista.map((item) => (
          <ProdutoItem key={item._id} item={item} />
        ))}
      </IonList>

      <IonInfiniteScroll
        onIonInfinite={(ev) => {
          generateListaProdutos();
          setTimeout(() => ev.target.complete(), 500);
        }}
      >
        <IonInfiniteScrollContent />
      </IonInfiniteScroll>
    </IonContent>
  );
}
export default InfiniteScroll;