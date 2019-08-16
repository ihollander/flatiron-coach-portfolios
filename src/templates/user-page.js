import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
// import Portfolio from '../components/Portfolio'

export default props => {
  console.log(props)
  const person = props.data.contentfulPerson

  return (
    <Layout location={props.location}>
      <div className="columns">
        <div className="column is-one-third">
          <figure class="image is-3by2">
            <img class="is-rounded" src={person.image.fluid.src} alt={person.name} />
          </figure>
          <aside className="buttons" style={{ padding: "1rem 0" }}>
            <a href={`https://github.com/${person.github}`} target="_blank" className="button is-white is-fullwidth">
              <span className="icon is-small">
                <i className="fab fa-github"></i>
              </span>
              <span>GitHub</span>
            </a>
            <a href={`https://twitter.com/${person.twitter}`} target="_blank" className="button is-white is-fullwidth">
              <span className="icon is-small">
                <i className="fab fa-github"></i>
              </span>
              <span>Twitter</span>
            </a>
          </aside>
        </div>
        <div className="column">
          <h1 className="title">{person.name}</h1>
          <h2 className="subtitle">{person.company}</h2>
          <div className="content" dangerouslySetInnerHTML={{ __html: person.shortBio.childMarkdownRemark.html }} />
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query ($github: String!) {
    contentfulPerson(github: {eq: $github}) {
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
      image {
        fluid {
          sizes
          src
          aspectRatio
        }
      }
    }
  }
`
