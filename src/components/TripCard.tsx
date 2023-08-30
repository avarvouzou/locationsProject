import Trip from "@/models/Trip";
import { useCurrency } from "@/pages/_app";

interface Props {
  item: Trip
}

function Card({ item }: Props) {
  const { currency } = useCurrency()

  return (
    <div className="card">
      <img src={item.image} alt={item.title} />
      <h3>{item.title}</h3>
      <p>{currency === 'usd' ? `\$${item.priceUsd}` : `€${item.priceEuro}`}</p>
    </div>
  );
}
export default Card