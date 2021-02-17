import { useState } from "react";
import { useRouter } from "next/router";
import dynamic from 'next/dynamic';

const AddToCartModal = dynamic(
    () => import("@/components/AddToCartModal"),
    { loading: () => <p>Carregando...</p>, ssr: false }
);

export default function Product() {
  const router = useRouter();
  const [isAddToCartModalVisible, setIsAddToCartModalVisible] = useState(false);

  function handleAddToCart() {
    setIsAddToCartModalVisible(true);
  }

  return (
      <div>
          <h1>{router.query.product}</h1>

          <button onClick={handleAddToCart}>Add to cart</button>

          { isAddToCartModalVisible && <AddToCartModal /> }
      </div>
  );
}
