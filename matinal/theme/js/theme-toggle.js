window.RevealThemeToggle = {
  id: "theme-toggle",

  init(deck) {
    const STORAGE_KEY = "liksi-theme";
    const dark = document.querySelector('link[href$="liksi.css"]');
    if (!dark) return;

    const light = dark.cloneNode();
    light.href = dark.href.replace(/liksi\.css$/, "liksi-light.css");
    dark.after(light);

    const readStored = () => {
      try {
        return localStorage.getItem(STORAGE_KEY);
      } catch (e) {
        return null;
      }
    };

    let current;
    const apply = (theme, persist) => {
      current = theme === "light" ? "light" : "dark";
      dark.media = current === "dark" ? "all" : "not all";
      light.media = current === "light" ? "all" : "not all";
      if (!persist) return;
      try {
        localStorage.setItem(STORAGE_KEY, current);
      } catch (e) {}
    };

    const param = new URLSearchParams(location.search).get("theme");
    apply(param || readStored(), Boolean(param));

    deck.addKeyBinding({ keyCode: 84, key: "T", description: "Basculer thème clair / sombre" }, () =>
      apply(current === "light" ? "dark" : "light", true),
    );

    window.addEventListener("storage", (e) => {
      if (e.key === STORAGE_KEY) apply(e.newValue, false);
    });
  },
};
