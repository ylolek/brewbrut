import { ActionReducerMap } from "@ngrx/store";
import { IBrews } from "../definitions/brews.definition";
import { breweriesReducer } from "./breweries.reducer";

export interface AppState {
  brews: IBrews;
}

export const reducers: ActionReducerMap<AppState> = {
  brews: breweriesReducer
};
