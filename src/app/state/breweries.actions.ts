import { createAction, props } from "@ngrx/store";
import { IBrewery } from "../definitions/brewery.definition";

export const fetchBreweries = createAction(
  "[API] fetch Breweries",
  props<{
    page: number;
    perPage?: number;
    sort?: string;
  }>()
);

export const retrievedBreweries = createAction(
  "[API] retrieved breweries success",
  props<{ breweries: Array<IBrewery> }>()
);

export const retrievedBrewery = createAction(
  "[API] retrieved brewey success",
  props<{ brewery: IBrewery }>()
);

export const fetchBreweryDetails = createAction(
  "[Brewery] fetch brewery details",
  props<{ breweryId: number }>()
);

export const getBreweryDetails = createAction(
  "[Brewery] get one brewery details",
  props<{ breweryId: number }>()
);

export const showBreweryDetails = createAction(
  "[Brewery] show one brewery details",
  props<{ breweryId: number }>()
);

export const breweriesFilter = createAction(
  "[Breweries] breweries filter changed",
  props<{ filter: string }>()
);

export const prevPage = createAction("[Breweries] prev page of breweries");
export const nextPage = createAction("[Breweries] next page of breweries");
