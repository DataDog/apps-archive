import { init, EventType } from "@datadog/ui-extensions-sdk";
import "./../index.css";
import React from "react";
import ReactDOM from "react-dom";

import "./widget.css";
import "typeface-roboto";
import { useEffect, useState } from "react";

const locations = ["usa/new-york", "australia/lord-howe-island", "netherlands/amsterdam", "norway/oslo", "mozambique/maputo"]

const epochToDate = (epoch) => {
  const date = new Date(epoch);
  let month = date.getMonth() + 1;
  let day = date.getDate();

  if (month < 10) {
    month = '0' + month;
  }
  if (day < 10) {
    day = '0' + day;
  }

  return `${date.getFullYear()}-${month}-${day}`;
};

const client = init();

function Widget() {
  const [city, setCity] = useState("usa/new-york");
  const [tf, setTF] = useState(0);
  const [sunset, setSunset] = useState('loading…');
  const [broadcastClickCount, setBroadcastClickCount] = useState(0);

  useEffect(() => {
    client.getContext().then((c) => {
      setCity(c.widget?.definition.options?.city);
    });

    client.events.on(
      EventType.DASHBOARD_CUSTOM_WIDGET_OPTIONS_CHANGE,
      ({ city }) => {
        if (typeof city !== "string") {
          return;
        }
        setCity(city);
      }
    );

    client.events.on(
      'dashboard_timeframe_change',
      (newoptions) => {
        setTF(newoptions.end);
      }
    );

    client.getContext().then((c) => {
      setTF(c?.dashboard?.timeframe?.end || (+new Date()));
    });
  }, []);

  React.useEffect(() => {
    if (false || tf === 0) { return; }
    const params = `place=${city}&start=${epochToDate(tf)}`;
    fetch(`http://localhost:5000/astro_sun?${params}`)
      .then(resp => resp.json())
      .then(data => {
        console.log('response data', data);
        const sunsetData = data.locations[0].astronomy.objects[0].days[0].events.filter(e => e.type === 'set')[0];
        console.log('sunset', sunsetData);
        const { hour, min, sec } = sunsetData;
        const sunsetEmoji = hour < 18 ? '\uD83D\uDE16' : '\uD83D\uDE00';
        const sunsetString = `${hour}:${min < 10 ? ('0' + min) : min} ${sunsetEmoji}`
        setSunset(sunsetString);
      });
  }, [epochToDate(tf), city]);
  const flexCenter = {
    'display': 'flex',
    'alignItems': 'center',
    'justifyContent': 'center'
  };
  return (
    <section style={{height: '100%', ...flexCenter}}>
      {/*<p>{"Sunset on " + (new Date(tf)).toDateString()}</p>*/}
      <h1>{sunset}</h1>
    </section>
  );
};

export default function render() {
  ReactDOM.render(
    <React.StrictMode>{<Widget />}</React.StrictMode>,
    document.getElementById("root")
  );
}
