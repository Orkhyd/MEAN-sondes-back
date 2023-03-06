import express from "express";
import {
  getAllRecordings,
  checkUserExistence,
  createRecording,
  createUser,
  getRecordingsFromSensor,
} from "./database.js";

const app = express();
app.use(express.json());

app.get("/recordings", async (req, res) => {
  const recordings = await getAllRecordings();
  res.send(recordings);
});

app.get("/recordings/:id", async (req, res) => {
  const id = req.params.id;
  const recordings = await getRecordingsFromSensor(id);
  res.send(recordings);
});

app.post("/recordings", async (req, res) => {
  const { macAddress, hygrometry, temperature } = req.body;
  const recording = await createRecording(hygrometry, temperature, macAddress);
  res.send(recording);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
