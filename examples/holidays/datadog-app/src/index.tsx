const init = async () => {
  switch (window.location.pathname) {
    case "/widget": {
      let widget = await import("./widget");
      return widget.default();
    }
    case "/widget_sunset": {
      let widget = await import("./widget_sunset");
      return widget.default();
    }
    case "/panel": {
      let sidepanel = await import("./side-panel");
      return sidepanel.default();
    }
    case "/modal": {
      let modal = await import("./modal");
      return modal.default();
    }
    default: {
      let controller = await import("./controller");
      return controller.default();
    }
  }
};

init();
export {};
