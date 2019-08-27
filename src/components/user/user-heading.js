import React from "react"
import { css } from "@emotion/core"
import Img from "gatsby-image"

import { colors } from "../../css/theme"
import { container } from "../../css/mixins"

const UserHeading = ({ name, company, shortBio, image }) => {
  const headingCss = css`
    background-color: ${colors.primaryLight};
  `
  return (
    <div css={headingCss}>
      <div css={container}>
        {image && (
          <Img
            fluid={image.fluid}
            alt={name}
            css={css`
              width: 25%;
            `}
          />
        )}
        <div>
          <h1>{name}</h1>
          <h3>{company}</h3>
          {shortBio && (
            <p
              dangerouslySetInnerHTML={{
                __html: shortBio.childMarkdownRemark.html,
              }}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default UserHeading
