import React from "react"
import { css } from "@emotion/core"
import PropTypes from "prop-types"

const RosterGrid = props => (
  <div
    css={css`
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      grid-gap: 20px;
      padding: 10px;
    `}
  >
    {props.children}
  </div>
)

RosterGrid.propTypes = {
  children: PropTypes.node.isRequired,
}

export default RosterGrid
