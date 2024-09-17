import { item } from "../../types";
import { RowList } from "../UI";

interface listShowProps {
  link: string;
  title: string;
  items: item[];
}

const ListShow = ({ link, items, title }: listShowProps) => {
  return (
    <div className="w-full flex gap-4 flex-col items-start">
      <h2 className="text-base font-medium">{title}</h2>
      <div className="w-full p-2">
        <ul className="w-full border rounded-md overflow-hidden">
          {items.map((item) => (
            <RowList item={item} key={item._id} link={link} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ListShow;
