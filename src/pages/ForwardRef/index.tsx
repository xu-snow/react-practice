import * as React from 'react'
import CustomTextInput from '../CreateRefAPI';
/**   higher-order components */

function logProps(WrappedComponent: React.ComponentClass) {
  class LogProps extends React.Component<{ forwardRef?: React.Ref<any> }> {
    public componentDidUpdate(prevProps: any) {
      // tslint:disable:no-console
      console.log('old props:', prevProps);
      console.log('new props:', this.props);
    }

    public render(): JSX.Element {
      const { forwardRef, ...rest } = this.props
      return <WrappedComponent {...rest} ref={forwardRef} />;
    }
  }

  return React.forwardRef((props, ref) => {
    return <LogProps {...props} forwardRef={ref} />
  })
}

const WrapCustomTextInput = logProps(CustomTextInput)

// tslint:disable-next-line:max-classes-per-file
export default class IncludeForWardRefCom extends React.Component<{}, { value: string }> {
  // componentRef 为被包装的组件 CustomTextInput 而不是包装后的组件LogProps
  public componentRef: React.RefObject<CustomTextInput>

  constructor(props: {}) {
    super(props)
    this.componentRef = React.createRef()
    this.state = {
      value: ''
    }
  }
  public handleClick = () => {
    if (this.componentRef.current) {
      const value = this.componentRef.current.textInput.current!.value
      this.setState({ value })
    }
  }

  public handleClear=()=>{
    if (this.componentRef.current) {
      this.componentRef.current.textInput.current!.value = ''
      this.setState({ value:'' })
    }
  }

  public render() {
    return <React.Fragment>
      <div>
        <label>value:{this.state.value}</label>
      </div>
      <WrapCustomTextInput ref={this.componentRef} >
        <React.Fragment>
          <button onClick={this.handleClick}>commit</button>
          <button onClick={this.handleClear}>clear</button>
        </React.Fragment>
      </WrapCustomTextInput>
    </React.Fragment >
  }
}



