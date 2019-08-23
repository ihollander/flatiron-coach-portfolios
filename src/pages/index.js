import React from "react"
import { css } from '@emotion/core'
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = props => {
  const { edges } = props.data.allContentfulPerson;
  console.log(edges)
  return (
    <Layout>
      <SEO title="Home" />
      <h1>Flatiron Alumni Portfolios</h1>
      <div css={css`
        display: flex;
      `}>
        {edges.map(({ node }) => (
          <div key={node.github} css={css`

          `}>
            {node.image && <Img fixed={node.image.fixed} alt={node.name} />}
            <Link to={`/${node.github}`}>{node.name}</Link>
          </div>
        ))}
      </div>
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  query {
    allContentfulPerson {
      edges {
        node {
          github
          company
          email
          facebook
          name
          image {
            fixed(width: 400, height: 400) {
              width
              height
              src
              srcSet
            }
          }
        }
      }
    }
  }`
