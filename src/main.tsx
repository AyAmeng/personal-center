import React from 'react'
import { render } from 'react-dom'
import './test/test'

class AppComponent extends React.PureComponent {
  render() {
    return (
      <div className='container'>
        HAAAAA
      </div>
    )
  }
}

const rootElement = document.getElementById('app')

render(
  <AppComponent />,
  rootElement
)
