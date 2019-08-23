import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = props => {
  const { edges } = props.data.allContentfulPerson;
  return (
    <Layout>
      <SEO title="Home" />
      <h1>Flatiron Alumni Portfolios</h1>
      {edges.map(({ node }) => (
        <div key={node.github}>
          {node.image && <Img fixed={node.image.fixed} alt={node.name} />}
          <Link to={`/${node.github}`}>{node.name}</Link>
        </div>
      ))}
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
