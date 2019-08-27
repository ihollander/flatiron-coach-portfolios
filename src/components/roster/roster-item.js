import React from "react"
import { css } from "@emotion/core"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import Img from "gatsby-image"

import { colors } from "../../css/theme"

const RosterItem = ({ github, image, name }) => (
  <Link
    to={`/${github}`}
    css={css`
      opacity: 1;
      transition: opacity 0.1s ease-in-out;
      background-color: #f1f1f1;
      position: relative;

      &:hover {
        opacity: 0.8;
      }
    `}
  >
    {image && <Img fluid={image.fluid} alt={name} />}
    <div
      css={css`
        padding: 0.5em;
        text-align: center;
        background-color: ${colors.primaryLight};
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
      `}
    >
      {name}
    </div>
  </Link>
)

RosterItem.propTypes = {
  name: PropTypes.string.isRequired,
  github: PropTypes.string.isRequired,
  image: PropTypes.any,
}

export default RosterItem
