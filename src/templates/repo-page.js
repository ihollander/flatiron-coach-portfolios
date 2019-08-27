import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
// import Portfolio from '../components/Portfolio'

export default props => {
  const repo = props.data.githubRepository;
  return (
    <Layout location={props.location}>
      <h1>{repo.name}</h1>
      {repo.githubReadme &&
        <p dangerouslySetInnerHTML={{ __html: repo.githubReadme.childMarkdownRemark.html }} />
      }
    </Layout>
  )
}

export const query = graphql`
  query ($repo: String!, $github: String!) {
    githubRepository(name: {eq: $repo}, githubUser: {eq: $github}) {
      name
      githubReadme {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`
