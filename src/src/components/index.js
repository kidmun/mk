const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const router = express.Router();
router.post("/api/system/access-token", async (req, res) => {
  const response = await fetch(
    "http://192.168.43.30:5000/api/system/access-token",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    }
  );

  const retval = await response.json();
  console.log(retval)

  return res.json(retval);
});
router.get("/api/system/users", async (req, res) => {
  const { access_token } = req.query;
  const response = await fetch(
    "http://192.168.43.30:5000/api/system/users?access_token=" + access_token
  );

  const retval = await response.json();

  return res.json(retval);
});
app.use(router);

app.listen(3001, () => {
  console.log("Listening on port 3001");
});
