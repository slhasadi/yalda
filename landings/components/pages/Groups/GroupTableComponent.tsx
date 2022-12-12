import React, { ReactNode } from "react";
import classes from "./GroupTableComponent.module.css";

interface GroupTableComponentPropsDateIFace {
  heads: string[];
  bodies: (string | number | ReactNode)[][];
  title?: string;
}

const GroupTableComponent: React.FC<GroupTableComponentPropsDateIFace> = ({
  heads,
  bodies,
  title,
}) => {
  return (
    <>
      {title && <h4 className="md:text-lg md:font-bold">{title}</h4>}
      <table className="table-auto w-full">
        <thead className="text-xs md:text-[16px]">
          <tr>
            {heads.map((item, index) => (
              <th key={index} className="py-2">
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-xs md:text-[16px]">
          {bodies.map((item, index) => (
            <tr key={index} className={classes.row_item}>
              {item.map((it, ind) => (
                <td
                  key={ind}
                  className={`text-center py-3 ${
                    typeof it !== "string" || typeof it !== "number"
                      ? ""
                      : "text-center"
                  }`}
                >
                  {it}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default GroupTableComponent;
