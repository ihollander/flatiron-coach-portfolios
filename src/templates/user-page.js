import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
// import Portfolio from '../components/Portfolio'

export default props => {
  console.log(props)
  return (
    <Layout location={props.location}>
      <div>{props.data.contentfulPerson.name}</div>
    </Layout>
  )
}

export const query = graphql`
  query($github: String!) {
    contentfulPerson(github: { eq: $github }) {
      github
      company
      name
      email
      shortBio {
        childMarkdownRemark {
          html
        }
      }
      githubUser {
        childrenGithubRepository {
          name
        }
      }
    }
  }
`
