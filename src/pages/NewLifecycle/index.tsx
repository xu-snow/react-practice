import * as React from 'react'


const THEME = ['red', 'light', 'dark', 'blue']

export default class NewLifecycle extends React.Component<{}, { theme: string }> {

  public state = {
    theme: THEME[0]
  }

  public handleChange = () => {
    this.setState(() => {
      return {
        theme: THEME[Math.floor(Math.random() * THEME.length)]
      }
    })
  }

  public render() {
    return <div>
      <aside style={{marginBottom:12}}>代替 componentWillReceiveProps 的新生命周期: static getDerivedStateFromProps(props, state)</aside>
      <div>
        <label>
          点击会改变子组件的值，通过getDerivedStateFromProps
          <button onClick={this.handleChange}>change theme</button>
        </label>
        <h4>子组件:</h4>
        <div>
          <ChildComponent value={this.state.theme} />
        </div>
      </div>
    </div>
  }
}



// tslint:disable-next-line:max-classes-per-file
class ChildComponent extends React.Component<{ value: string }, { newTheme: string, oldTheme: string }> {

  public static getDerivedStateFromProps(nextProps: { value: string }, prevState: { newTheme: string, oldTheme: string }) {
    if (nextProps.value !== prevState.newTheme) {
      return {
        newTheme: nextProps.value,
        oldTheme: prevState.newTheme,
      };
    }
    return null
  }

  public state = {
    newTheme: '',
    oldTheme: ''
  }



  constructor(props: { value: string }) {
    super(props)
  }

  public render() {
    const { newTheme, oldTheme } = this.state
    return <div>
      <p>新主题:{newTheme}</p>
      <p>旧主题:{oldTheme}</p>
    </div>
  }
}