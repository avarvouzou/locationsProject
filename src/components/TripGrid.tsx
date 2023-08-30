import Card from "@/components/TripCard";
import Trip from "@/models/Trip";

type Props = {
  data: Trip[]
}
function CardGrid({ data }: Props) {
  return (
    <div className="card-grid">
      {data.map(item => (
        <Card
          key={item.id}
          item={item}
        />
      ))}
    </div>
  );
}

export default CardGrid