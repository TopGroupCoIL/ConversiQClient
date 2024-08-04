import { Location, NavigateFunction } from 'react-router-dom';

export const history: {
  location: null | Location;
  navigate: null | NavigateFunction;
} = {
  location: null,
  navigate: null,
};
