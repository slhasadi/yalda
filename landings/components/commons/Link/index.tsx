import {FC, HTMLProps} from "react";
import NextLink, { LinkProps } from 'next/link'

interface Props extends LinkProps{
    href: string
    title?: string
}
const Link: FC<Props> = ({children, href, title, ...rest}) => {
    const theTitle = title && {title: `title="${title}"`}
    return <NextLink href={href} {...rest}>
        <a {...theTitle}>
            {children}
        </a>
    </NextLink>
}

export default Link;
