import pino from 'pino'
import PinoPretty from 'pino-pretty'

export default class Logger {
  private prettyConfig (message: string) {
    return PinoPretty({
      ignore: 'hostname,pid',
      messageFormat: `${message}`
    })
  }

  info (message: string): void {
    pino(this.prettyConfig(message)).info(message)
  }

  warn (message: string): void {
    pino(this.prettyConfig(message)).warn(message)
  }

  error (message: string): void {
    pino(this.prettyConfig(message)).error(message)
  }

  fatal (message: string): void {
    pino(this.prettyConfig(message)).fatal(message)
  }
}