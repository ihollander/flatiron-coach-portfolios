const createNodeHelpers = require("gatsby-node-helpers").default

// https://github.com/angeloashmore/gatsby-node-helpers
const {
  createNodeFactory,
  generateNodeId,
  generateTypeName,
} = createNodeHelpers({
  typePrefix: `Github`,
})

const GITHUB_USER_TYPE = `User`
const GITHUB_REPOSITORY_TYPE = `Repository`
const GITHUB_README_TYPE = `Readme`

const GithubUserNode = createNodeFactory(GITHUB_USER_TYPE, node => {
  if (node.pinnedItems) {
    const { nodes } = node.pinnedItems

    // Set children
    node.children = nodes.map(repo =>
      generateNodeId(GITHUB_REPOSITORY_TYPE, repo.id)
    )

    // Remove unnecessary fields
    delete node.pinnedItems
  }

  return node
})

const GithubRepoNode = createNodeFactory(GITHUB_REPOSITORY_TYPE)

const GithubReadmeNode = createNodeFactory(GITHUB_README_TYPE)

module.exports = {
  GithubUserNode,
  GithubRepoNode,
  GithubReadmeNode
}