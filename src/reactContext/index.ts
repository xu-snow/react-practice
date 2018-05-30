import * as  React from "react";

export interface IState {
  color: string;
  theme: string;
  dispatch?: (action: any) => void
}

export const initialState: IState = {
  color: "blue",
  theme: "dark",
};

export const GlobalStoreContext: React.Context<IState> = React.createContext({
  ...initialState
});