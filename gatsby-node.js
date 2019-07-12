const { getUserInfo } = require("./api")
const { createDigest } = require("./build-helpers")

/* 
  onCreateNode will run during build when Gatsby is creating the source nodes
  We can programatically add to the node tree at this point 
  (https://www.gatsbyjs.org/docs/gatsby-lifecycle-apis/)
  We want to get additional info for each person from the Github API based on 
  their github username, which is stored in Contentful for each person. This 
  will allow us to grab pinned repositories to populate the portfolio data.
*/
exports.onCreateNode = async ({ node, actions }) => {
  if (node.internal.type === "ContentfulPerson") {
    // fetch user data and repos from Github
    const json = await getUserInfo(node.github)

    if (json.data && json.data.user) {
      const { createNode } = actions

      /* 
        Creates a githubUser node under contentfulPerson 
        TODO: extract node creation logic or use gatsby-node-helpers package
      */
      const { user } = json.data
      const userContent = JSON.stringify(user)
      const userNode = {
        ...user,
        id: `GithubUser-${user.id}`,
        parent: node.id,
        internal: {
          type: `GithubUser`,
          content: userContent,
          contentDigest: createDigest(userContent),
        },
      }
      // delete pinned repos, will handle with separate node creation
      delete userNode.pinnedItems

      createNode(userNode)
      node.githubUser___NODE = userNode.id

      /* 
        Create child nodes for each githubRepository under githubUser
      */
      user.pinnedItems.nodes.forEach(repo => {
        const repoContent = JSON.stringify(repo)
        const repoNode = {
          ...repo,
          id: `GithubRepository-${repo.id}`,
          parent: userNode.id,
          internal: {
            type: `GithubRepository`,
            content: repoContent,
            contentDigest: createDigest(repoContent),
          },
        }
        createNode(repoNode)
        userNode.children.push(repoNode.id)

        if (repo.readme && repo.readme.text) {
          /* 
            Create a githubReadme node under githubRepository
            Set mediaType to text/markdown so gatsby-transformer-remark will parse it
          */
          const readmeNode = {
            id: `GithubReadme-${repo.id}`,
            parent: repoNode.id,
            internal: {
              type: `GithubReadme`,
              mediaType: `text/markdown`,
              content: repo.readme.text,
              contentDigest: createDigest(repo.readme.text),
            },
          }
          createNode(readmeNode)
          repoNode.githubReadme___NODE = readmeNode.id
        }
      })
    }
  }
}

/*
  createPages will run during build and can be used to programatically create pages
  based on the data in our sources
  https://www.gatsbyjs.org/docs/creating-and-modifying-pages/
*/
exports.createPages = async function({ actions, graphql, reporter }) {
  /* 
    This will query the data pulled in from any Gatsby source plugins as well as 
    additional data pulled in during the onCreateNode lifecycle, so we have access
    to all the data from Contentful as well as Github API at this point
  */
  const result = await graphql(`
    query AllUserInfo {
      allContentfulPerson {
        edges {
          node {
            github
          }
        }
      }
    }
  `)

  if (result.error) {
    reporter.panic("Uh oh. There was a problem loading the source nodes...")
    return
  }

  // programatically create pages for each person returned by Contentful
  result.data.allContentfulPerson.edges.forEach(({ node: { github } }) => {
    actions.createPage({
      path: `/${github}/`, // the url path for this page
      component: require.resolve(`./src/templates/user-page.js`), // which component template to use
      context: { github }, // This will be available as a variable to graphQL query in user-page.js
    })

    // TODO: we could also create individual pages for each project if that feature sounds cool
    // we'd just have to extend the graphql query above to get repos
  })
}
