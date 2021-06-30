import * as React from 'react'
import styled from 'styled-components'

const Page = styled.div`
    padding: 20px;
    text-align: center;
`

class ErrorBoundary extends React.Component<any, any> {
  constructor (props:any) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError () {
    return { hasError: true }
  }

  componentDidCatch (error:any, errorInfo:any) {
    console.error('ErrorBoundary', error, errorInfo)
  }

  render () {
    if (this.state.hasError) {
      return (
        <Page>
          <h1>Something went wrong.</h1>
        </Page>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
