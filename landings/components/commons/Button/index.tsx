
import {FC, HTMLProps} from "react";

interface Props extends HTMLProps<HTMLButtonElement>{
    type?: 'primary' | 'success' | 'info' | 'warning' | 'danger' | 'secondary' | 'default' | 'change'
    className?: string
    role?: 'button' | 'submit' | 'reset'
}
const Button: FC<Props> = ({children, type = 'default', className= '', role= 'button', onClick, ...rest}) => {
    return <button type={role} {...rest} className={`bg-${type} ${type === 'secondary' || type === 'default' ? 'text-dark' : 'text-white'} ${className}`} onClick={onClick}>
        {children}
    </button>
}

export default Button;
