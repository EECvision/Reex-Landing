import React from "react";
import styles from "./Card.module.css";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "glass" | "interactive" | "glow";
  glowColor?: "cyan" | "indigo" | "emerald" | "amber" | "purple";
  padding?: "none" | "sm" | "default" | "lg";
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  variant = "default",
  glowColor,
  padding = "default",
  children,
  className = "",
  ...props
}) => {
  const glowClass = glowColor ? styles[glowColor] : "";
  const paddingClass =
    padding === "none"
      ? styles.paddingNone
      : padding === "sm"
      ? styles.paddingSm
      : padding === "lg"
      ? styles.paddingLg
      : "";
  const combinedClassName = `${styles.card} ${styles[variant]} ${glowClass} ${paddingClass} ${className}`.trim();

  return (
    <div className={combinedClassName} {...props}>
      {children}
    </div>
  );
};
