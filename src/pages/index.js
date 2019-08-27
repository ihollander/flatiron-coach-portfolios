import React from "react"
import { graphql } from "gatsby"

import RosterGrid from "../components/roster/roster-grid"
import RosterItem from "../components/roster/roster-item"
import Layout from "../components/layout"

const IndexPage = ({
  data: {
    allContentfulPerson: { edges },
  },
}) => {
  return (
    <Layout>
      <RosterGrid>
        {edges.map(({ node }) => (
          <RosterItem
            key={node.github}
            github={node.github}
            image={node.image}
            name={node.name}
          />
        ))}
      </RosterGrid>
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
            fluid(maxWidth: 400) {
              ...GatsbyContentfulFluid
            }
          }
        }
      }
    }
  }
`
