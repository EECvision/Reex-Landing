"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logoDark from "@/assets/logo-dark.svg";
import { Button } from "@/components/ui/Button/Button";
import { Menu, X, Package, ArrowRight } from "lucide-react";
import styles from "./Navbar.module.css";

export const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Keep this threshold in sync with Navbar.module.css.
    const desktop = window.matchMedia("(min-width: 1120px)");
    const handleResize = () => {
      if (desktop.matches) setMobileOpen(false);
    };
    desktop.addEventListener("change", handleResize);
    return () => desktop.removeEventListener("change", handleResize);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
        toggleRef.current?.focus();
      }
    };
    const handlePointerDown = (event: PointerEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) setMobileOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [mobileOpen]);

  const toggleMobile = () => setMobileOpen((prev) => !prev);
  const closeMobile = () => setMobileOpen(false);

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (mobileOpen) closeMobile();
    if (window.location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "auto" });
      if (window.location.hash) {
        window.history.pushState(null, "", "/");
      }
    }
  };

  return (
    <div
      ref={wrapperRef}
      className={styles.navWrapper}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) closeMobile();
      }}
    >
      <header className={styles.navbar}>
        {/* Brand Logo */}
        <Link
          href="/"
          className={styles.brand}
          onClick={handleLogoClick}
          aria-label="Reex API - Scroll to top"
        >
          <Image src={logoDark} alt="Reex API" width={110} height={34} priority />
        </Link>

        {/* Desktop Navigation */}
        <nav className={styles.desktopNav} aria-label="Primary">
          <ul className={styles.navLinks}>
            <li>
              <a href="#features" className={styles.navLink}>
                Features
              </a>
            </li>
            <li>
              <a href="#code-gen" className={styles.navLink}>
                Code Engine
              </a>
            </li>
            <li>
              <a href="#diff-engine" className={styles.navLink}>
                Schema Diff
              </a>
            </li>
            <li>
              <a href="#how-it-works" className={styles.navLink}>
                How It Works
              </a>
            </li>
            <li>
              <a href="#open-source" className={styles.navLink}>
                Open Source
              </a>
            </li>
            <li>
              <a href="#faq" className={styles.navLink}>
                FAQ
              </a>
            </li>
          </ul>
        </nav>

        {/* Desktop Actions */}
        <div className={styles.actions}>
          <a
            href="https://www.npmjs.com/package/reex-cli"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.githubButton}
            title="View Reex CLI on NPM"
          >
            <Package size={13} color="#f43f5e" />
            <span>NPM</span>
            <span className={styles.starCount}>v7.3.1</span>
          </a>

          <Button
            variant="glow"
            size="sm"
            href="https://reex-api-builder.toolshq.app"
            external
            iconRight={<ArrowRight size={13} strokeWidth={2.2} />}
            className={styles.launchBtn}
          >
            Launch Studio
          </Button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          ref={toggleRef}
          className={styles.mobileToggle}
          onClick={toggleMobile}
          aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </header>

      {/* Mobile Drawer */}
      {/* Explicit tab stops keep these links reachable in WebKit's keyboard navigation mode. */}
      {mobileOpen && (
        <nav id="mobile-navigation" aria-label="Mobile" className={styles.mobileMenu}>
          <ul className={styles.mobileNavLinks}>
            <li>
              <a href="#features" tabIndex={0} className={styles.mobileNavLink} onClick={closeMobile}>
                Features
              </a>
            </li>
            <li>
              <a href="#code-gen" tabIndex={0} className={styles.mobileNavLink} onClick={closeMobile}>
                Code Engine
              </a>
            </li>
            <li>
              <a href="#diff-engine" tabIndex={0} className={styles.mobileNavLink} onClick={closeMobile}>
                Schema Diff
              </a>
            </li>
            <li>
              <a href="#how-it-works" tabIndex={0} className={styles.mobileNavLink} onClick={closeMobile}>
                How It Works
              </a>
            </li>
            <li>
              <a href="#open-source" tabIndex={0} className={styles.mobileNavLink} onClick={closeMobile}>
                Open Source
              </a>
            </li>
            <li>
              <a href="#faq" tabIndex={0} className={styles.mobileNavLink} onClick={closeMobile}>
                FAQ
              </a>
            </li>
          </ul>

          <div className={styles.mobileActions}>
            <a
              href="https://www.npmjs.com/package/reex-cli"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.githubButton}
              style={{ justifyContent: "center" }}
              tabIndex={0}
            >
              <Package size={13} color="#f43f5e" />
              <span>NPM Package (v7.3.1)</span>
            </a>

            <Button
              variant="glow"
              size="md"
              href="https://reex-api-builder.toolshq.app"
              external
              iconRight={<ArrowRight size={14} strokeWidth={2.2} />}
              className={styles.mobileLaunchBtn}
              tabIndex={0}
            >
              Launch Studio Free
            </Button>
          </div>
        </nav>
      )}
    </div>
  );
};
