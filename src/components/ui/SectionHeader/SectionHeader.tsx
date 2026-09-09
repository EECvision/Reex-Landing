import React from "react";
import styles from "./SectionHeader.module.css";

/* =========================================================================
   SectionTag Component
   ========================================================================= */
export interface SectionTagProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  className?: string;
  as?: "span" | "div" | "p";
}

export const SectionTag: React.FC<SectionTagProps> = ({
  children,
  className = "",
  as: Component = "span",
  ...props
}) => {
  return (
    <Component className={`${styles.tag} ${className}`.trim()} {...props}>
      {children}
    </Component>
  );
};

/* =========================================================================
   SectionTitle Component
   ========================================================================= */
export interface SectionTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4";
  size?: "default" | "lg";
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  children,
  className = "",
  as: Component = "h2",
  size = "default",
  ...props
}) => {
  const sizeClass = size === "lg" ? styles.titleLg : "";
  return (
    <Component className={`${styles.title} ${sizeClass} ${className}`.trim()} {...props}>
      {children}
    </Component>
  );
};

/* =========================================================================
   SectionDescription Component (also aliased as SectionSubtitle)
   ========================================================================= */
export interface SectionDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
  className?: string;
  as?: "p" | "div";
}

export const SectionDescription: React.FC<SectionDescriptionProps> = ({
  children,
  className = "",
  as: Component = "p",
  ...props
}) => {
  return (
    <Component className={`${styles.description} ${className}`.trim()} {...props}>
      {children}
    </Component>
  );
};

export const SectionSubtitle = SectionDescription;

/* =========================================================================
   SectionHeader Component
   ========================================================================= */
export interface SectionHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  tag?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  maxWidth?: number | string;
  children?: React.ReactNode;
  className?: string;
  titleSize?: "default" | "lg";
}

export const SectionHeader: React.FC<SectionHeaderProps> & {
  Tag: typeof SectionTag;
  Title: typeof SectionTitle;
  Description: typeof SectionDescription;
  Subtitle: typeof SectionSubtitle;
} = ({
  tag,
  title,
  description,
  align = "left",
  maxWidth,
  children,
  className = "",
  titleSize = "default",
  style,
  ...props
}) => {
  const alignClass = align === "center" ? styles.center : "";
  const customStyle: React.CSSProperties = {
    ...(maxWidth ? { maxWidth } : {}),
    ...style,
  };

  return (
    <div
      className={`${styles.header} ${alignClass} ${className}`.trim()}
      style={customStyle}
      {...props}
    >
      {tag && <SectionTag>{tag}</SectionTag>}
      {title && <SectionTitle size={titleSize}>{title}</SectionTitle>}
      {description && <SectionDescription>{description}</SectionDescription>}
      {children}
    </div>
  );
};

SectionHeader.Tag = SectionTag;
SectionHeader.Title = SectionTitle;
SectionHeader.Description = SectionDescription;
SectionHeader.Subtitle = SectionSubtitle;
