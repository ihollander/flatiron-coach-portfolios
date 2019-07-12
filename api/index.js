const fetch = require("node-fetch")

const githubFetch = async query => {
  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    body: JSON.stringify({ query }),
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    },
  })
  return await response.json()
}

const getUserInfo = login => {
  return githubFetch(`
  {
    user(login: ${login}) {
      login
      id
      pinnedItems(first: 6) {
        nodes {
          ... on Repository {
            id
            name
            homepageUrl
            primaryLanguage {
              name
            }
            shortDescriptionHTML
            url
            readme: object(expression: "master:README.md") {
              ... on Blob {
                id
                text
              }
            }
          }
        }
      }
    }
  }
`)
}

module.exports = {
  getUserInfo,
}
