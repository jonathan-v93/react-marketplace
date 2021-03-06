import {penceToPounds} from '../utils/apiRequests'

export function ItemTile({ item }) {
  return (
    <div>
      <img src={item.img_url} alt={item.item_name} />
      <h2>{item.item_name}</h2>
      <p>{item.description}</p>
      <p>{item.category_name}</p>
          <h4>{penceToPounds(item.price)}</h4>
          <br />
    </div>
  );
}
