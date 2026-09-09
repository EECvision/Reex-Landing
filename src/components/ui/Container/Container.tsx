import React from "react";
import styles from "./Container.module.css";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  size?: "default" | "sm" | "lg" | "full";
  className?: string;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  size = "default",
  className = "",
  ...props
}) => {
  return (
    <div
      className={`${styles.container} ${styles[size]} ${className}`.trim()}
      {...props}
    >
      {children}
    </div>
  );
};
