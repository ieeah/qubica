const log = (level: "info" | "debug" | "error", msg: string) => console[level](`[${level.toUpperCase()}]: ${msg} at ${new Date().toLocaleTimeString()}`)

const dummyLogger = {
  info: (msg: string) => log("info", msg),
  debug: (msg: string) => log("debug", msg),
  error: (msg: string) => log("error", msg),
}

export default dummyLogger;