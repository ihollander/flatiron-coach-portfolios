const { getUserInfo } = require("./api")
const { GithubUserNode, GithubRepoNode, GithubReadmeNode } = require("./nodes")

exports.onCreateNode = async ({ node, actions }) => {
  if (node.internal.type === "ContentfulPerson") {
    // fetch user data and repos from Github
    const json = await getUserInfo(node.github)

    if (json.data && json.data.user) {
      const { createNode } = actions
      const { user } = json.data

      // create a node for each user from github
      // and connect to the contentfulPerson node
      const userNode = GithubUserNode(user, {
        contentfulPerson___NODE: node.id
      })
      createNode(userNode)

      // create relationship from contentfulPerson -> githubUser
      node.githubUser___NODE = userNode.id

      // create nodes for each pinned item repository
      user.pinnedItems.nodes.forEach(repo => {
        const repoNode = GithubRepoNode(repo, {
          parent: userNode.id,
        })
        createNode(repoNode)

        if (repo.readme && repo.readme.text) {
          const readmeNode = GithubReadmeNode(repo.readme, {
            githubRepository___NODE: repoNode.id
          })
          createNode(readmeNode)
          readmeNode.internal.mediaType = 'text/markdown'
          readmeNode.internal.content = repo.readme.text

          repoNode.githubReadme___NODE = readmeNode.id

          console.log("****readme node****")
          console.log(readmeNode)

          console.log("****repo node****")
          console.log(repoNode)
        }
      })
    }
  }
}
