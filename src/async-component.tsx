/*
 * @Author: zhengxu 
 * @Date: 2018-05-29 15:08:10 
 * @Last Modified by: zhengxu
 * @Last Modified time: 2018-05-30 21:36:36
 */

/**
 * for react router4 code splitting
 */

import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'

type AsyncImportComponent = () => Promise<any>

export default (loadComponent: AsyncImportComponent, placeholder = null): React.ComponentClass<RouteComponentProps<any>> => {
  return class AsyncComponent extends React.Component<RouteComponentProps<any>, { component: any }>{
    private unmount: boolean = false
    constructor(props: RouteComponentProps<any>) {
      super(props)
      this.state = {
        component: null
      }
    }

    public componentWillUnmount() {
      this.unmount = false
    }

    public async  componentDidMount() {
      const { default: component } = await loadComponent()
      if (this.unmount) { return }
      this.setState({
        component
      })
    }

    public render() {
      const C = this.state.component
      return C ? <C {...this.props} /> : placeholder
    }
  }
}