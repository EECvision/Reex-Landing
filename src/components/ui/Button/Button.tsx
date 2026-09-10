import React from "react";
import Link from "next/link";
import styles from "./Button.module.css";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "glow";
  size?: "sm" | "md" | "lg";
  href?: string;
  external?: boolean;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "secondary",
  size = "md",
  href,
  external = false,
  icon,
  iconRight,
  children,
  className = "",
  disabled,
  tabIndex,
  ...props
}) => {
  const combinedClassName = `${styles.button} ${styles[variant]} ${styles[size]} ${
    disabled ? styles.disabled : ""
  } ${className}`.trim();

  const content = (
    <>
      {icon && <span className={styles.icon}>{icon}</span>}
      <span>{children}</span>
      {iconRight && <span className={styles.icon}>{iconRight}</span>}
    </>
  );

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={combinedClassName}
          tabIndex={tabIndex}
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={combinedClassName} tabIndex={tabIndex}>
        {content}
      </Link>
    );
  }

  return (
    <button className={combinedClassName} disabled={disabled} tabIndex={tabIndex} {...props}>
      {content}
    </button>
  );
};
