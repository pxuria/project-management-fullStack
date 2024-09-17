import { Link } from "react-router-dom";
import { item } from "../../types";

interface RowListProps {
  link: string;
  item: item;
}

const RowList = ({ link, item }: RowListProps) => {
  return (
    <Link to={link} key={item._id}>
      <li className="cursor-pointer bg-[#fdfdfd] hover:bg-slate-100 transition-all ease-in duration-200 w-full py-3 px-2 border-b border-b-slate-200 rounded">
        {item.name}
      </li>
    </Link>
  );
};

export default RowList;
