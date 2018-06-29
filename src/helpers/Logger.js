const ConsoleDev = {
  log: console.log,
  warn: console.warn,
  error: console.error,
}

const ConsoleProd = {
  log: () => null,
  warn: () => null,
  error: () => null,
}

const getConsole = () => {
  switch (process.env.NODE_ENV) {
    case "development":
      return ConsoleDev
    case "production":
    default:
      return ConsoleProd
  }
}

export const Logger = getConsole()
