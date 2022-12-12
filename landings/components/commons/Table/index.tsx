import {FC} from "react";

type Header = {
    title?: string | undefined
    direction?: string
}

type Props = {
    header: Header[]
}

const Table: FC<Props> = ({header, children}) => {
    return <div className="transition overflow-x-auto relative">
        <table className="block lg:table table-auto w-full text-sm text-left text-gray-500 dark:text-gray-400 border-separate border-spacing-y-3">
            <thead className="hidden lg:table-header-group lg:text-[18px] font-medium text-transparent">
            <tr>
                {header.map(item => {
                    return <th key={item.title} scope="col" className={`text-current text-sm lg:text-base whitespace-nowrap text-black py-3 px-3 text-${item.direction ?? 'right'}`}>
                        {item.title}
                    </th>
                })}
            </tr>
            </thead>
            <tbody className='block w-full lg:table-row-group'>
                {children}
            </tbody>
        </table>
    </div>
}

export default Table;
