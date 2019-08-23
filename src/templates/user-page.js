import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
// import Portfolio from '../components/Portfolio'

export default props => {
  const person = props.data.contentfulPerson
  return (
    <Layout location={props.location}>
      <h1>{person.name}</h1>
      <h3>{person.company}</h3>
      {person.shortBio && <p dangerouslySetInnerHTML={{ __html: person.shortBio.childMarkdownRemark.html }} />}
      <hr />
      <h3>Projects</h3>
      <ul>
        {person.githubUser.childrenGithubRepository.map(repo => (
          <li key={repo.name}>
            <Link to={`/${person.github}/${repo.name}`}>{repo.name}</Link>
          </li>
        ))}
      </ul>
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
