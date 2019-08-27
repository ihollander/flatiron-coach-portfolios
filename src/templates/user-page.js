import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"

import UserHeading from "../components/user/user-heading"

export default props => {
  const person = props.data.contentfulPerson
  return (
    <Layout>
      <UserHeading
        name={person.name}
        company={person.company}
        shortBio={person.shortBio}
        image={person.image}
      />
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
      image {
        fluid(maxWidth: 400) {
          ...GatsbyContentfulFluid
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
