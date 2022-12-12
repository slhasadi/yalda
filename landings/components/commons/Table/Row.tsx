import {FC} from "react";

type Props = {
    type?: string
}

const TableRow: FC<Props> = ({children, type}) => {
    return <tr className={`font-medium text-white table-row-${type} block lg:table-row text-right rounded-xl overflow-hidden [&>td:last-of-type]:rounded-l-lg [&>td:first-of-type]:rounded-r-lg mb-[10px]`}>
        {children}
    </tr>
}

export default TableRow;
