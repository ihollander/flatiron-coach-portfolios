const fetch = require("node-fetch")

// helper fn to query github
const getUserInfo = async login => {
  const query = `
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
                    text
                  }
                }
              }
            }
          }
        }
      }
    `

  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    body: JSON.stringify({ query }),
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    },
  })
  return await response.json()
}

module.exports = {
  getUserInfo,
}
