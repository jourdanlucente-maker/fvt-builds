// A separate namespace per edition replaces the isolation of the expired preview origins.
// Save payloads and export/import formats remain exactly the game's own formats.
export function createStorage(edition) {
  const prefix = 'fvt-pages:' + edition + ':';
  const keys = () => Object.keys(globalThis.localStorage).filter(k => k.startsWith(prefix));
  return Object.freeze({
    getItem: key => globalThis.localStorage.getItem(prefix + key),
    setItem: (key, value) => globalThis.localStorage.setItem(prefix + key, value),
    removeItem: key => globalThis.localStorage.removeItem(prefix + key),
    clear: () => keys().forEach(key => globalThis.localStorage.removeItem(key)),
    key: index => keys()[index]?.slice(prefix.length) ?? null,
    get length() { return keys().length; }
  });
}

export function createIndexedDB(edition) {
  const prefix = 'fvt-pages:' + edition + ':';
  let db;try { db=globalThis.indexedDB; } catch { return undefined; }
  if(!db)return undefined;
  return Object.freeze({
    open: (name, ...args) => db.open(prefix + name, ...args),
    deleteDatabase: name => db.deleteDatabase(prefix + name),
    cmp: (a,b) => db.cmp(a,b),
    databases: async () => (await db.databases()).filter(d=>d.name.startsWith(prefix)).map(d=>({...d,name:d.name.slice(prefix.length)}))
  });
}

// Static hosting has no score validation or generative-cinema server.
// Fail these requests explicitly; retain the existing offline gameplay path.
export function createFetch(language) {
  return (input, options) => {
    const url = new URL(typeof input === 'string' || input instanceof URL ? input : input.url, location.href);
    if (url.origin === location.origin && url.pathname.startsWith('/api/')) {
      return Promise.reject(new Error(language === 'fr'
        ? 'Le classement en ligne et le cinéma ne sont pas disponibles sur ce lien. Ta partie et tes records personnels restent enregistrés dans ce navigateur.'
        : 'La clasificación en línea y el cine no están disponibles en este enlace. Tu partida y tus récords personales se guardan en este navegador.'));
    }
    return globalThis.fetch(input, options);
  };
}
