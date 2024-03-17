import { AnchorHTMLAttributes, ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import './styles.css';

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
  variant?: 'anchor' | 'a-button';
  className?: string;
};

const Link: React.FC<Props> = ({
  href,
  children,
  className = '',
  variant = 'anchor',
  ...props
}: Props) => {
  return (
    <NavLink to={href} className={`${className} ${variant}`} {...props}>
      {children}
    </NavLink>
  );
};

export default Link;
