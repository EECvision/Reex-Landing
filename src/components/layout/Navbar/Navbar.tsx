"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logoDark from "@/assets/logo-dark.svg";
import { Button } from "@/components/ui/Button/Button";
import { Badge } from "@/components/ui/Badge/Badge";
import { Star, ExternalLink, Menu, X, Code2, Package, ArrowRight } from "lucide-react";
import styles from "./Navbar.module.css";

export const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleMobile = () => setMobileOpen((prev) => !prev);
  const closeMobile = () => setMobileOpen(false);

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (mobileOpen) closeMobile();
    if (window.location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      if (window.location.hash) {
        window.history.pushState(null, "", "/");
      }
    }
  };

  return (
    <div className={styles.navWrapper}>
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
        <nav>
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
          className={styles.mobileToggle}
          onClick={toggleMobile}
          aria-label="Toggle Navigation Menu"
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </header>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className={styles.mobileMenu}>
          <ul className={styles.mobileNavLinks}>
            <li>
              <a href="#features" className={styles.mobileNavLink} onClick={closeMobile}>
                Features
              </a>
            </li>
            <li>
              <a href="#code-gen" className={styles.mobileNavLink} onClick={closeMobile}>
                Code Engine
              </a>
            </li>
            <li>
              <a href="#diff-engine" className={styles.mobileNavLink} onClick={closeMobile}>
                Schema Diff
              </a>
            </li>
            <li>
              <a href="#how-it-works" className={styles.mobileNavLink} onClick={closeMobile}>
                How It Works
              </a>
            </li>
            <li>
              <a href="#open-source" className={styles.mobileNavLink} onClick={closeMobile}>
                Open Source
              </a>
            </li>
            <li>
              <a href="#faq" className={styles.mobileNavLink} onClick={closeMobile}>
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
            >
              Launch Studio Free
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
