import * as React from 'react'

const THEME = ['red', 'light', 'dark', 'blue']

const initItem = Array.from({ length: 10 })

// tslint:disable:no-console
export default class NewLifecycle extends React.Component<{}, { theme: string, item: number[] }> {
  public listRef: React.RefObject<HTMLDivElement>

  public state = {
    item: initItem.map((i, index) => index),
    theme: THEME[0]
  }

  constructor(props: {}) {
    super(props)
    this.listRef = React.createRef();
  }

  public handleChange = () => {
    this.setState(() => {
      return {
        theme: THEME[Math.floor(Math.random() * THEME.length)]
      }
    })
  }

  public getSnapshotBeforeUpdate(prevProps: {}, prevState: { theme: string, item: number[] }) {
    if (prevState.item.length !== this.state.item.length) {
      const list = this.listRef.current!;
      return list.scrollHeight - list.scrollTop;
    }
    return null;
  }

  public componentDidUpdate(prevProps: {}, prevState: { theme: string, item: number[] }, snapshot: null | number) {
    if (snapshot !== null) {
      const list = this.listRef.current!;
      list.scrollTop = list.scrollHeight - snapshot > 0 ? list.scrollHeight - snapshot : 0;
    }
  }


  public handleAdd = () => {
    this.setState((state) => {
      // state.item.unshift(...initItem.map((i, index) => index + state.item.length))
      const item = state.item.slice();
      item.unshift(...initItem.map((i, index) => index + state.item.length))
      return { item }
    })
  }

  // tslint:disable-next-line:no-empty
  public handleReduce = () => {
    if (this.state.item.length > 0) {
      this.setState((state) => {
        // state.item.unshift(...initItem.map((i, index) => index + state.item.length))
        const item = state.item.slice();
        item.splice(0, 10)
        return { item }
      })
    }
  }

  public render() {
    return (
      <div>
        <h2>getDerivedStateFromProps</h2>
        <aside style={{ marginBottom: 12 }}>代替 componentWillReceiveProps 的新生命周期: static getDerivedStateFromProps(props, state)</aside>
        <div>
          <label>
            点击会改变传给子组件的props，通过getDerivedStateFromProps改变子组件state
          <button onClick={this.handleChange}>change theme</button>
          </label>
          <h4>子组件:</h4>
          <div>
            <ChildComponent value={this.state.theme} />
          </div>
        </div>
        <h2>getSnapshotBeforeUpdate</h2>
        <aside style={{ marginBottom: 12 }}>在 getSnapshotBeforeUpdate 声明周期中读取的dom元素保证跟更新前状态一致 </aside>
        <div>
          <span>
            点击增加或减少列表数量 </span>
          <button style={{ marginLeft: 20 }} onClick={this.handleAdd}>add</button>
          <span>
            <button style={{ marginLeft: 20 }} onClick={this.handleReduce}>reduce</button>
          </span>


          <div id="zx" style={{ height: 200, overflow: 'auto', marginBottom: 50, border: '1px solid' }} ref={this.listRef}>
            <ul className="my-ul">
              {
                this.state.item.map(k => {
                  // 为了更加明显看出差别，设置随机key让元素每次都重新渲染
                  return <li key={Math.random()}> ITEM{k}</li>
                })
              }
            </ul>
          </div>
        </div>
      </div>
    )
  }
}


interface IChildComponentState {
  newTheme: string,
  oldTheme: string,
  currentPropValue: string
}

// tslint:disable:max-classes-per-file
class ChildComponent extends React.Component<{ value: string }, IChildComponentState> {


  public static getDerivedStateFromProps(nextProps: { value: string }, prevState: IChildComponentState) {
    console.log(nextProps, prevState);
    if (nextProps.value !== prevState.currentPropValue) {
      return {
        currentPropValue:nextProps.value,
        newTheme: nextProps.value,
        oldTheme: prevState.newTheme,
      };
    }
    return null
  }



  public state = {
    currentPropValue: '',
    newTheme: '',
    oldTheme: '',
  }

  public handleClick = () => {
    if(this.state.newTheme !=='yellow'){
      this.setState({ newTheme: 'yellow',oldTheme:this.state.newTheme })
    }
   
  }

  public render() {
    const { newTheme, oldTheme } = this.state
    return <div>
      <p>新主题:{newTheme}</p>
      <p>旧主题:{oldTheme}</p>
      <label>
        直接修改<span style={{ color: 'red' }}>子组件state</span>，也会触发getDerivedStateFromProps，不同于componentWillReceiveProps
            <button onClick={this.handleClick}>yellow</button>
      </label>
    </div>
  }
}