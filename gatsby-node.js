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
const PINNED_REPOSITORY_TYPE = `PinnedRepository`

const UserNode = createNodeFactory(USER_TYPE, node => {
  if (node.pinnedItems) {
    const { nodes } = node.pinnedItems

    // Set children
    node.children = nodes.map(variant =>
      generateNodeId(PINNED_REPOSITORY_TYPE, variant.id)
    )

    // Remove unnecessary fields
    delete node.pinnedItems
  }

  return node
})

exports.onCreateNode = async ({ node, actions }) => {
  if (node.internal.type === "ContentfulPerson") {
    // fetch user repos from Github
    const user = await getUserInfo(node.github)

    const userNode = UserNode({
      ...user,
      id: generateNodeId(user.login),
      parent: node.id,
    })
    console.log("****user node****")
    console.log(userNode)
    actions.createNode(userNode)
    console.log("****parent node****")
    console.log(node)
  }
}
