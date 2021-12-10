import { init, EventType } from "@datadog/ui-extensions-sdk";
import "./../index.css";
import React from "react";
import ReactDOM from "react-dom";

import "./widget.css";
import "typeface-roboto";
import { useEffect, useState } from "react";


const client = init();

function Widget() {
  const [hemisphere, setHemisphere] = useState("New York");
  const [tf, setTF] = useState(0);
  const [season, setSeason] = useState('loading…');
  const [broadcastClickCount, setBroadcastClickCount] = useState(0);

  useEffect(() => {
    client.getContext().then((c) => {
      setHemisphere(c.widget?.definition.options?.hemisphere);
    });

    client.events.on(
      EventType.DASHBOARD_CUSTOM_WIDGET_OPTIONS_CHANGE,
      ({ hemisphere }) => {
        if (typeof hemisphere !== "string") {
          return;
        }
        setHemisphere(hemisphere);
      }
    );

    client.events.on(
      'dashboard_timeframe_change',
      (newoptions) => {
        setTF(newoptions.end);
      }
    );

      // client.events.onCustom("modal_button_click", setBroadcastClickCount);
    client.getContext().then((c) => {
      setTF(c?.dashboard?.timeframe?.end || (+new Date()));
    });
  }, []);

  // const urlidToSeason = new Map([['seasons/vernal-equinox', '']])

  React.useEffect(() => {
    if (false || tf === 0) { return; }
    const year = new Date(tf).getFullYear();
    const params = `country=us&year=${year}`;
    fetch(`http://localhost:5000/seasons?${params}`)
      .then(resp => resp.json())
      .then(data => {

        console.log('response data', data);

        console.log(data)

        return

        const nextHoliday = data.holidays.find((holiday: any) => {
          // @ts-ignore
          const hDate = new Date(holiday.date.iso);
          console.log(hDate, new Date(tf));
          console.log(hDate.valueOf(), tf);
          return hDate.valueOf() >= tf;
        });

        const isNorthern = hemisphere !== 'southern';
        let season = isNorthern ? 'Winter' : 'Summer';
        if (nextHoliday.urlid === 'seasons/vernal-equinox') {
          season = isNorthern ? 'Winter' : 'Summer';
        }
        if (nextHoliday.urlid === 'seasons/june-solstice') {
          season = isNorthern ? 'Spring' : 'Fall';
        }
        if (nextHoliday.urlid === 'seasons/autumnal-equniox') {
          season = isNorthern ? 'Summer' : 'Winter';
        }
        if (nextHoliday.urlid === 'seasons/december-solstice') {
          season = isNorthern ? 'Fall' : 'Spring';
        }

        setSeason(season)
      });
  }, [tf, hemisphere]);

  const seasonToBG = {
    'Spring': 'url("https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.fxNs3XpnmNlF1vd3ktw-EgHaEo%26pid%3DApi&f=1")',
    'Summer': 'url("https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fgetwallpapers.com%2Fwallpaper%2Ffull%2F1%2Ff%2F0%2F927447-free-download-summer-theme-wallpaper-1920x1200.jpg&f=1&nofb=1")',
    'Fall': 'url("https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi0.wp.com%2Fgetwallpapers.com%2Fwallpaper%2Ffull%2Fd%2F8%2Ff%2F1172599-early-fall-desktop-wallpapers-1920x1200-notebook.jpg&f=1&nofb=1")',
    'Winter': 'url("https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Feskipaper.com%2Fimages%2Fwinter-backgrounds-11.jpg&f=1&nofb=1")',
    'loading…': 'url("https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.fxNs3XpnmNlF1vd3ktw-EgHaEo%26pid%3DApi&f=1")',
  }

  const flexCenter = {
    'display': 'flex',
    'alignItems': 'center',
    'justifyContent': 'center',
    'backgroundSize': 'cover'
  };
  return (
    <section style={
      { width: '100%', height: '100%', 'backgroundImage': seasonToBG[season], ...flexCenter}
    }>
      <h1>{season}</h1>
    </section>
  );
}

export default function render() {
  ReactDOM.render(
    <React.StrictMode>{<Widget />}</React.StrictMode>,
    document.getElementById("root")
  );
}
