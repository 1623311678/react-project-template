import React from "react";
import { Skeleton } from "../Skeleton";
import "./index.scss";
import { ListContext } from "./ListContext";
interface ListProps {
  loading?: boolean;
  className?: string;
}
const LoadingCount = new Array(5).fill("");
export const List: React.FC<ListProps> = ({
  className = "",
  children,
  loading = false,
  ...attrs
}) => {
  return (
    <ListContext.Provider value={{ loading }}>
      <ul {...attrs} className={`fpp_list ${className}`}>
        {loading ? (
          <div className="fpp_list-skeleton">
            {LoadingCount.map((item, index) => (
              <Skeleton key={index} height={25} />
            ))}
          </div>
        ) : (
          <>{children}</>
        )}
      </ul>
    </ListContext.Provider>
  );
};
