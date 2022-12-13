import express from "express";
import path from "path";
import { SerialPort, ReadlineParser } from "serialport";

const serial = new SerialPort({
  path: "COM5",
  baudRate: 9600,
});

const parser = new ReadlineParser();
serial.pipe(parser);

const data_array: any = [];

parser.on("data", (data) => {
  try {
    data = JSON.parse(data);
    data_array.push(data);
  } catch (error) {
    console.log(data);
  }
});

const app = express();
const port = 3000;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

const client_location = path.resolve(__dirname, "../dist/client");

app.get("/", (req, res) => {
  res.sendFile(path.join(client_location, "/index.html"));
});

app.get("/client.js", (req, res) => {
  res.sendFile(path.join(client_location, "/client.js"));
});

app.get("/data", (req, res) => {
  if (data_array.length > 0) {
    res.json(data_array.shift());
  } else {
    res.json(null);
  }
});

app.listen(port, () => {
  console.log("running");
});
