import * as React from 'react';
import { GlobalStoreContext, initialState, IState } from '../../reactContext/index'

type ActionType = 'UPDATE_THEME' | 'UPDATE_COLOR' | 'UPDATE_THEME_THEN_COLOR'
interface IStateDispatch extends IState {
  dispatch: (action: { [key: string]: any, type: ActionType }) => void
}

class GlobalStoreContextProvider extends React.Component {
  // initialState
  public state = {
    ...initialState
  };
  // reducer
  public handleContextChange = (action: { type: ActionType, theme: string, color: string }) => {
    switch (action.type) {
      case "UPDATE_THEME":
        return this.setState({
          theme: action.theme
        });
      case "UPDATE_COLOR":
        return this.setState({
          color: action.color
        });
      case "UPDATE_THEME_THEN_COLOR":
        return this.setState({
          color: action.color,
          theme: action.theme
        });
      default:
        return;
    }
  };

  public render() {
    return (
      <GlobalStoreContext.Provider
        value={{
          color: this.state.color,
          dispatch: this.handleContextChange,
          theme: this.state.theme,
        }}
      >
        {this.props.children}
      </GlobalStoreContext.Provider>
    );
  }
}

const SubComponent = (props: IStateDispatch) => {
  function handleUT() {
    props.dispatch({
      theme: "light",
      type: "UPDATE_THEME",
    })
  }
  function handleUC() {
    props.dispatch({
      color: "red",
      type: "UPDATE_COLOR",
    })
  }
  function handleUTC() {
    props.dispatch({
      color: "purple",
      theme: "dark",
      type: "UPDATE_THEME_THEN_COLOR",
    })
  }
  return (
    <div>
      <button onClick={handleUT}  >
        change theme
      </button>
      <div className="content-theme">{props.theme}</div>
      {/* action */}
      <button onClick={handleUC} >
        change color
      </button>
      <div className="content-color">{props.color}</div>
      {/* action */}
      <button
        className="change-all"
        onClick={handleUTC}
      >
        change theme then color
      </button>
    </div>
  )
};


// tslint:disable-next-line:max-classes-per-file
export default class ContextAPI extends React.Component {
  public render() {
    return (
      <GlobalStoreContextProvider>
        <GlobalStoreContext.Consumer>
          {(context) => (
            <SubComponent
              theme={context.theme}
              color={context.color}
              dispatch={context.dispatch!}
            />
          )}
        </GlobalStoreContext.Consumer>
      </GlobalStoreContextProvider>
    );
  }
}