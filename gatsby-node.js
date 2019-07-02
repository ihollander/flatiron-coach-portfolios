const { getUserInfo } = require("./api")
const { GithubUserNode, GithubRepoNode, GithubReadmeNode } = require("./nodes")

// will run during build when Gatsby is creating the source nodes
exports.onCreateNode = async ({ node, actions }) => {
  // we want to add additional info the ContentfulPerson nodes by making a fetch to Github
  if (node.internal.type === "ContentfulPerson") {
    console.log('**** create person node ****')
    // fetch user data and repos from Github
    const json = await getUserInfo(node.github)

    if (json.data && json.data.user) {
      const { createNode } = actions
      const { user } = json.data

      // create a node for each user from github
      // create relationship from contentfulPerson -> githubUser
      const userNode = GithubUserNode(user, {
        contentfulPerson___NODE: node.id
      })
      createNode(userNode)

      // create relationship from githubUser -> contentfulPerson
      node.githubUser___NODE = userNode.id

      // create nodes for each pinned item repository
      user.pinnedItems.nodes.forEach(repo => {

        // create a node for each repo for a user
        const repoNode = GithubRepoNode(repo, {
          // does it need a parent relationship?
          parent: userNode.id,
        })
        createNode(repoNode)

        if (repo.readme && repo.readme.text) {
          // create a node the project readme
          const readmeNode = GithubReadmeNode(repo.readme, {
            // create relationship from githubReadme -> githubRepo
            // does it need a parent relationship?
            githubRepository___NODE: repoNode.id
          })
          createNode(readmeNode)

          // set internals for gatsby-transformer-remark
          readmeNode.internal.mediaType = 'text/markdown'
          readmeNode.internal.content = repo.readme.text

          // create relationship from githubRepo -> githubReadme
          // does it need a parent relationship?
          repoNode.githubReadme___NODE = readmeNode.id
        }
      })
    }
  }
}

// to create invidual pages from source
exports.createPages = async function ({ actions: { createPage }, graphql }) {
  const { data } = await graphql(`
    query AllUserInfo {
      allContentfulPerson {
        nodes {
          name
          github
          email
          company
          githubUser {
            id
            childrenGithubRepository {
              id
              shortDescriptionHTML
              url
              name
              homepageUrl
              githubReadme {
                childMarkdownRemark {
                  html
                }
              }
            }
          }
        }
      }
    }
  `)

  await Promise.all(
    data.allContentfulPerson.nodes.map(async node => {
      console.log('**** create page ****')
      return await createPage({
        path: `/${node.github}`,
        component: require.resolve(`./src/templates/user-page.js`),
        context: { user: node },
      })
    })
  )
}