import { createReducer, on } from "@ngrx/store";
import {
  fetchBreweries,
  fetchError,
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
  loading: true,
  error: null
};

export const breweriesReducer = createReducer(
  initialState,
  on(fetchBreweries, (state, { page, perPage, sort }) => ({
    ...state,
    page,
    perPage: !!perPage ? perPage : state.perPage,
    sort: !!sort ? sort : state.sort,
    loading: true,
    error: null
  })),

  on(fetchError, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),

  on(retrievedBreweries, (state, { breweries }) => ({
    ...state,
    breweries,
    loading: false,
    error: null
  })),

  on(fetchBreweryDetails, state => ({
    ...state,
    loading: true,
    error: null
  })),

  on(retrievedBrewery, (state, { brewery }) => ({
    ...state,
    selected: [brewery],
    loading: false,
    error: null
  })),

  on(showBreweryDetails, (state, { breweryId }) => ({
    ...state,
    selected: state.breweries.filter(brewery => brewery.id === breweryId),
    error: null
  })),

  on(breweriesFilter, (state, { filter }) => ({
    ...state,
    filter,
    error: null
  }))
);
