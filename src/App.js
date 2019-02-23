import React, { Component } from "react";
import { Map, Marker, Popup } from "react-leaflet";
import { connect } from "react-redux";
import { actions } from "./Store.js";

import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./App.css";

import MapboxLayer from "./MapboxLayer";

const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1IjoiYWxleG1jYyIsImEiOiJjam5pMWdtN3gwanQ1M3BxdDVuZGlyZXdkIn0.SlU2gCqByEwsz0pt7ocg8A";

const myIcon = L.icon({
  iconUrl:
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAFgUlEQVR4Aa1XA5BjWRTN2oW17d3YaZtr2962HUzbDNpjszW24mRt28p47v7zq/bXZtrp/lWnXr337j3nPCe85NcypgSFdugCpW5YoDAMRaIMqRi6aKq5E3YqDQO3qAwjVWrD8Ncq/RBpykd8oZUb/kaJutow8r1aP9II0WmLKLIsJyv1w/kqw9Ch2MYdB++12Onxee/QMwvf4/Dk/Lfp/i4nxTXtOoQ4pW5Aj7wpici1A9erdAN2OH64x8OSP9j3Ft3b7aWkTg/Fm91siTra0f9on5sQr9INejH6CUUUpavjFNq1B+Oadhxmnfa8RfEmN8VNAsQhPqF55xHkMzz3jSmChWU6f7/XZKNH+9+hBLOHYozuKQPxyMPUKkrX/K0uWnfFaJGS1QPRtZsOPtr3NsW0uyh6NNCOkU3Yz+bXbT3I8G3xE5EXLXtCXbbqwCO9zPQYPRTZ5vIDXD7U+w7rFDEoUUf7ibHIR4y6bLVPXrz8JVZEql13trxwue/uDivd3fkWRbS6/IA2bID4uk0UpF1N8qLlbBlXs4Ee7HLTfV1j54APvODnSfOWBqtKVvjgLKzF5YdEk5ewRkGlK0i33Eofffc7HT56jD7/6U+qH3Cx7SBLNntH5YIPvODnyfIXZYRVDPqgHtLs5ABHD3YzLuespb7t79FY34DjMwrVrcTuwlT55YMPvOBnRrJ4VXTdNnYug5ucHLBjEpt30701A3Ts+HEa73u6dT3FNWwflY86eMHPk+Yu+i6pzUpRrW7SNDg5JHR4KapmM5Wv2E8Tfcb1HoqqHMHU+uWDD7zg54mz5/2BSnizi9T1Dg4QQXLToGNCkb6tb1NU+QAlGr1++eADrzhn/u8Q2YZhQVlZ5+CAOtqfbhmaUCS1ezNFVm2imDbPmPng5wmz+gwh+oHDce0eUtQ6OGDIyR0uUhUsoO3vfDmmgOezH0mZN59x7MBi++WDL1g/eEiU3avlidO671bkLfwbw5XV2P8Pzo0ydy4t2/0eu33xYSOMOD8hTf4CrBtGMSoXfPLchX+J0ruSePw3LZeK0juPJbYzrhkH0io7B3k164hiGvawhOKMLkrQLyVpZg8rHFW7E2uHOL888IBPlNZ1FPzstSJM694fWr6RwpvcJK60+0HCILTBzZLFNdtAzJaohze60T8qBzyh5ZuOg5e7uwQppofEmf2++DYvmySqGBuKaicF1blQjhuHdvCIMvp8whTTfZzI7RldpwtSzL+F1+wkdZ2TBOW2gIF88PBTzD/gpeREAMEbxnJcaJHNHrpzji0gQCS6hdkEeYt9DF/2qPcEC8RM28Hwmr3sdNyht00byAut2k3gufWNtgtOEOFGUwcXWNDbdNbpgBGxEvKkOQsxivJx33iow0Vw5S6SVTrpVq11ysA2Rp7gTfPfktc6zhtXBBC+adRLshf6sG2RfHPZ5EAc4sVZ83yCN00Fk/4kggu40ZTvIEm5g24qtU4KjBrx/BTTH8ifVASAG7gKrnWxJDcU7x8X6Ecczhm3o6YicvsLXWfh3Ch1W0k8x0nXF+0fFxgt4phz8QvypiwCCFKMqXCnqXExjq10beH+UUA7+nG6mdG/Pu0f3LgFcGrl2s0kNNjpmoJ9o4B29CMO8dMT4Q5ox8uitF6fqsrJOr8qnwNbRzv6hSnG5wP+64C7h9lp30hKNtKdWjtdkbuPA19nJ7Tz3zR/ibgARbhb4AlhavcBebmTHcFl2fvYEnW0ox9xMxKBS8btJ+KiEbq9zA4RthQXDhPa0T9TEe69gWupwc6uBUphquXgf+/FrIjweHQS4/pduMe5ERUMHUd9xv8ZR98CxkS4F2n3EUrUZ10EYNw7BWm9x1GiPssi3GgiGRDKWRYZfXlON+dfNbM+GgIwYdwAAAAASUVORK5CYII=",
  iconSize: [25, 41],
  iconAnchor: [12.5, 41],
  popupAnchor: [0, -41]
});

class App extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.onGetTrails(
      this.props.maxDist,
      this.props.minStars,
      this.props.maxRes
    );
  };
  handleChange = event => this.props.onMaxDistChanged(event.target.value);
  handleResChange = event => this.props.onMaxResultsChanged(event.target.value);
  handleStarChange = event => this.props.onMinStarsChanged(event.target.value);

  render() {
    const position = [this.props.lat, this.props.lng];
    const { trails } = this.props;
    return (
      <div>
        <ul className="sidebar">
          <form onSubmit={this.handleSubmit}>
            <label>
              maxDist
              <input type="text" name="maxDist" onChange={this.handleChange} />
            </label>
            <label>
              maxRes
              <input
                type="text"
                name="maxRes"
                onChange={this.handleResChange}
              />
            </label>
            <label>
              stars
              <input type="text" name="star" onChange={this.handleStarChange} />
            </label>
            <input type="submit" value="Submit" />
          </form>
          {trails.map(item => (
            <li key={item.id} className="polaroid">
              <img src={item.imgMedium} alt="park" />
              <h2
                onClick={() => {
                  this.mapItem(item);
                }}
              >
                {item.name}
              </h2>
              <input id={item.id} className="toggle" type="checkbox" />
              <label htmlFor={item.id} className="lbl-toggle">
                More Info
              </label>
              <div className="collapsible-content">
                <div className="content-inner">
                  <p>{item.summary}</p>
                </div>
                <button
                  disabled={this.props.disabled.indexOf(item.id) !== -1}
                  onClick={() => {
                    this.disableButton(item);
                  }}
                >
                  Add to Wishlist
                </button>
              </div>
            </li>
          ))}
        </ul>
        <Map
          style={{ height: "800px", marginLeft: "475px" }}
          className="map"
          center={position}
          zoom={this.props.zoom}
          maxZoom={18}
          minZoom={3}
          ref="map"
        >
          <MapboxLayer
            accessToken={MAPBOX_ACCESS_TOKEN}
            mapStyle="mapbox://styles/mapbox/outdoors-v9"
          />
          {trails.map(item => (
            <Marker
              position={[item.latitude, item.longitude]}
              icon={myIcon}
              key={item.id}
            >
              >
              <Popup autoPan={false}>
                <em>{item.name}</em> {item.conditionDetails}
              </Popup>
            </Marker>
          ))}
        </Map>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    lat: state.lat,
    lng: state.lng,
    zoom: state.zoom,
    loading: state.loading,
    trails: state.trails,
    todos: state.todos,
    disabled: state.disabled,
    maxDist: state.maxDist,
    minStars: state.minStars,
    maxRes: state.maxRes
  };
}

function mapDisatchToProps(dispatch) {
  return {
    onMaxDistChanged(maxDist) {
      dispatch(actions.maxDistChanged(maxDist));
    },
    onMinStarsChanged(minStars) {
      dispatch(actions.minStarsChanged(minStars));
    },
    onMaxResultsChanged(maxRes) {
      dispatch(actions.maxResultsChanged(maxRes));
    },
    onSetLoading(loading) {
      dispatch(actions.setLoading(loading));
    },
    onGetTrails(maxDist, minStars, maxRes) {
      dispatch(actions.getTrails(maxDist, minStars, maxRes));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDisatchToProps
)(App);
