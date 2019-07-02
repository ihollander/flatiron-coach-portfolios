import React from "react"

import Layout from '../components/layout'
// import Portfolio from '../components/Portfolio'

export default (props) => {
  console.log(props)
  return (
    <Layout location={props.location}>
      <div>{props.pageContext.user.name}</div>
    </Layout>
  )
}