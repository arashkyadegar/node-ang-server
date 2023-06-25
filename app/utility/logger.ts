const { format, createLogger, transports } = require("winston");
const { combine, timestamp, label, printf } = format;
const CATEGORY = "custom format";

const winston = require("winston");

//Using the printf format.
const customFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
  });
  
  const logger = createLogger({

    level: "error",
    format: combine(label({ label: CATEGORY }), timestamp(), customFormat),
    transports: [
        //new transports:
        new transports.File({
          filename: "logs/example.log",
        }),
      ],
  });

module.exports = logger;