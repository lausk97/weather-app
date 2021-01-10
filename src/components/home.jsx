import React, { Component, Fragment } from "react";
import styles from "./home.module.scss";

const api = {
  key: "d1bcb72f411fa814cfb4cfc31ec0f534",
  base: "https://api.openweathermap.org/data/2.5/",
};

class Home extends Component {
  state = {
    search: "",
    weather: "",
  };

  searchResult = (e) => {
    if (e.key === "Enter") {
      fetch(
        `${api.base}weather?q=${this.state.search}&units=metric&appid=${api.key}`
      )
        .then((res) => res.json())
        .then((result) => {
          this.setState({ weather: result, search: "" });
          console.log(this.state.weather);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  handleSearchBox = (e) => {
    console.log(e.target.value);
    this.setState({ search: e.target.value });
  };

  render() {
    const { search, weather } = this.state;

    return (
      <Fragment>
        <div
          className={`${styles.screen} ${
            typeof weather.main !== "undefined"
              ? weather.main.temp <= 0
                ? styles.cold
                : weather.main.temp < 25
                ? styles.chill
                : styles.warm
              : styles.chill
          }`}
        >
          <div className={styles.searchBox}>
            <input
              type="text"
              className={`form-control ${styles.searchBar}`}
              placeholder="Input city name here.."
              value={search}
              onChange={(e) => this.handleSearchBox(e)}
              onKeyPress={this.searchResult}
            />
          </div>

          {typeof weather.main !== "undefined" ? (
            <Fragment>
              <div className={styles.locationBox}>
                <div className={styles.location}>
                  {weather.name}, {weather.sys.country}
                </div>
                <div className={styles.date}>{new Date().toDateString()}</div>
              </div>
              <div className={styles.weatherBox}>
                <div className={styles.temp}>
                  {Math.round(weather.main.temp)}°C
                </div>
                <div
                  className={`${styles.weather} ${
                    weather.weather[0].main === "Sunny" ? styles.sunny : ""
                  } ${
                    weather.weather[0].main === "Clouds" ||
                    weather.weather[0].main === "Rain"
                      ? styles.rain
                      : ""
                  }`}
                >
                  {weather.weather[0].main}
                </div>
              </div>
            </Fragment>
          ) : (
            ""
          )}
        </div>
      </Fragment>
    );
  }
}

export default Home;
