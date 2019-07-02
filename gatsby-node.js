const { getUserInfo } = require("./api")
const createNodeHelpers = require("gatsby-node-helpers").default

// https://github.com/angeloashmore/gatsby-node-helpers
const {
  createNodeFactory,
  generateNodeId,
  generateTypeName,
} = createNodeHelpers({
  typePrefix: `Github`,
})

const USER_TYPE = `User`
const REPOSITORY_TYPE = `Repository`

const UserNode = createNodeFactory(USER_TYPE, node => {
  if (node.pinnedItems) {
    const { nodes } = node.pinnedItems

    // Set children
    node.children = nodes.map(repo =>
      generateNodeId(REPOSITORY_TYPE, repo.id)
    )

    // Remove unnecessary fields
    delete node.pinnedItems
  }

  return node
})

const RepoNode = createNodeFactory(REPOSITORY_TYPE)

exports.onCreateNode = async ({ node, actions }) => {
  if (node.internal.type === "ContentfulPerson") {
    // fetch user repos from Github
    const json = await getUserInfo(node.github)

    if (json.data && json.data.user) {
      const { createNode } = actions
      const { user } = json.data
      const userNode = UserNode(user, {
        id: generateNodeId(USER_TYPE, user.login),
        contentfulPerson___NODE: node.id
      })

      console.log("****parent node****")
      console.log(node)
      createNode(userNode)

      node.githubUser___NODE = userNode.id
      console.log("****user node****")
      console.log(userNode)

      user.pinnedItems.nodes.forEach(repo => {
        const repoNode = RepoNode(repo, {
          parent: userNode.id,
        })
        createNode(repoNode)
      })
    }
  }
}
