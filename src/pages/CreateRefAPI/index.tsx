import * as React from 'react'





/**
 *  使用React.createRef，引用dom元
 *  素或者是react实例
 * 
 */
export default class CustomTextInput extends React.Component {
  public textInput: React.RefObject<HTMLInputElement>

  constructor(props: {}) {
    super(props)
    this.textInput = React.createRef()
  }

  public componentDidMount() {
    this.focusTextInput()
  }

  public focusTextInput = () => {
    this.textInput.current!.focus()
  }

  public render() {
    return (
      <div>
        <input
          ref={this.textInput}
          type="text" />
        <div style={{ textAlign: 'center', marginTop: 12 }}>
          <button onClick={this.focusTextInput}> focus</button>
          {
            this.props.children
          }
        </div>
      </div>
    );
  }
}