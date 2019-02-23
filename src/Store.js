import API from "./API";

const MAX_DIST_CHANGED = "MAX_DIST_CHANGED";
const MIN_STARS_CHANGED = "MIN_STARS_CHANGED";
const MAX_RESULTS_CHANGED = "MAX_RESULTS_CHANGED";
const SET_LOADING = "SET_LOADING";

const initialState = {
  lat: 40.75,
  lng: -111.85,
  zoom: 10,
  loading: false,
  trails: [],
  todos: [],
  disabled: [],
  maxDist: "",
  minStars: "",
  maxRes: ""
};

export const actions = {
  maxDistChanged(maxDist) {
    return {
      type: MAX_DIST_CHANGED,
      maxDist
    };
  },
  setLoading(loading) {
    return {
      type: SET_LOADING,
      loading
    };
  },
  minStarsChanged(minStars) {
    return {
      type: MIN_STARS_CHANGED,
      minStars
    };
  },
  maxResultsChanged(maxRes) {
    return {
      type: MAX_RESULTS_CHANGED,
      maxRes
    };
  },
  getTrails(maxDist, minStars, maxRes) {
    return {
      type: "TRAILS",
      payload: API.search(maxDist, minStars, maxRes)
    };
  }
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case MAX_DIST_CHANGED: {
      return {
        ...state,
        maxDist: action.maxDist
      };
    }
    case MIN_STARS_CHANGED: {
      return {
        ...state,
        minStars: action.minStars
      };
    }
    case MAX_RESULTS_CHANGED: {
      return {
        ...state,
        maxRes: action.maxRes
      };
    }
    case SET_LOADING: {
      return {
        ...state,
        loading: action.loading
      };
    }
    case "TRAILS_FULFILLED": {
      return {
        ...state,
        loading: false,
        trails: action.payload
      };
    }
    default:
      return state;
  }
}
