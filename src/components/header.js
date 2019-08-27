import { css } from "@emotion/core"
import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import { colors } from "../css/theme"

const Logo = ({ siteTitle }) => {
  const slashCss = css`
    font-weight: bold;
    font-size: 24px;
    margin: 0 1rem;
  `

  return (
    <Link to="/">
      <span css={slashCss}>//</span>
      <span>{siteTitle}</span>
    </Link>
  )
}

const Header = ({ siteTitle }) => {
  const headerCss = css`
    background: ${colors.primary};
  `
  const navCss = css`
    display: flex;
    align-items: center;
    color: #fff;

    menu {
      margin: 0 0 0 auto;
    }

    span {
      vertical-align: middle;
    }
  `
  const linkCss = css`
    display: inline-block;
    padding: 0.75rem 1rem;

    &.active {
      background-color: ${colors.primaryLight};
    }
  `

  return (
    <header css={headerCss}>
      <nav css={navCss}>
        <Logo siteTitle={siteTitle} />
        <menu className="right">
          <Link to="/" css={linkCss} activeClassName="active">
            Roster
          </Link>
          <Link to="/blog" css={linkCss} activeClassName="active">
            Blog
          </Link>
          <Link to="/about" css={linkCss} activeClassName="active">
            About
          </Link>
        </menu>
      </nav>
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
