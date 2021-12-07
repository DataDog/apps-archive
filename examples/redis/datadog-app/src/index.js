const init = async () => {
    switch (window.location.pathname) {
        case '/keys-list': {
            const widget = await import('./widgets/KeysList')
            return widget.default()
        }
        case '/key-search': {
            const widget = await import('./widgets/KeySearch')
            return widget.default()
        }
        case '/key-info': {
            const sidePanel = await import ('./sidePanels/KeyInfo')
            return sidePanel.default()
        }
        case '/key-delete': {
            const modal = await import('./modals/DeleteKey')
            return modal.default()
        }
        case '/search-key': {
            const modal = await import('./modals/SearchKey')
            return modal.default()
        }
        default: {
            const controller = await import('./controller')
            return controller.default()
        }
    }
}

init()
export {}

