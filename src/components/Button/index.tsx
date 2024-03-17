import { ButtonHTMLAttributes, ReactNode } from 'react';
import './styles.css';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'icon';
  className?: string;
  disabled?: boolean;
};

interface ButtonVariants {
  [key: string]: string;
}

const BUTTON_VARIANTS: ButtonVariants = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  icon: 'iconButton',
};

const getButtonVariant = (variant: string | undefined): string => {
  return variant ? BUTTON_VARIANTS[variant] : '';
};

const Button: React.FC<Props> = ({
  children,
  className = '',
  variant = 'primary',
  disabled = false,
  ...props
}) => {
  return (
    <button
      className={`button ${getButtonVariant(variant)} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
