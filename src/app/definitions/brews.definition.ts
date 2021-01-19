import { IBrewery } from "./brewery.definition";

export interface IBrews {
  breweries: ReadonlyArray<IBrewery>;
  selected: IBrewery;
  filter: string;
  page: number;
  perPage: number;
  maxPage: number;
  sort: string;
  loading: boolean;
  error: any;
}
