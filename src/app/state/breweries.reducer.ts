import { createReducer, on } from "@ngrx/store";
import {
  fetchBreweries,
  retrievedBreweries,
  retrievedBrewery,
  showBreweryDetails,
  breweriesFilter,
  fetchBreweryDetails
} from "./breweries.actions";

export const initialState = {
  breweries: [],
  selected: null,
  filter: "",
  page: 1,
  perPage: 25,
  maxPage: 100,
  sort: "name",
  loading: true
};

export const breweriesReducer = createReducer(
  initialState,
  on(fetchBreweries, (state, { page, perPage, sort }) => ({
    ...state,
    page,
    perPage: !!perPage ? perPage : state.perPage,
    sort: !!sort ? sort : state.sort,
    loading: true
  })),

  on(retrievedBreweries, (state, { breweries }) => ({
    ...state,
    breweries,
    loading: false
  })),

  on(fetchBreweryDetails, state => ({
    ...state,
    loading: true
  })),

  on(retrievedBrewery, (state, { brewery }) => ({
    ...state,
    selected: [brewery],
    loading: false
  })),

  on(showBreweryDetails, (state, { breweryId }) => ({
    ...state,
    selected: state.breweries.filter(brewery => brewery.id === breweryId)
  })),

  on(breweriesFilter, (state, { filter }) => ({
    ...state,
    filter
  }))
);
