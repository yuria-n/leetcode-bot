import * as dotenv from "dotenv";
import axios from "axios";

dotenv.config();
const url = process.env.SLACK_WEBHOOK_URL;

try {
  (async () => {
    const text = "hello leetcode bot!";
    console.log(text);

    const response = await axios({
      method: "post",
      url,
      data: {
        text
      }
    });
    console.log(response);
  })();
} catch (err) {
  throw err;
}
