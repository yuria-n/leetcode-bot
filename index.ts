import * as dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();
const url = process.env.SLACK_WEBHOOK_URL;

(async () => {
  const title = '860. Lemonade Change';
  const difficulty = 'Easy';
  const link = 'https://leetcode.com/problems/lemonade-change/';
  const text = `${title} - ${difficulty}\n${link}`;

  const response = await axios({
    method: 'post',
    url,
    data: {
      text,
    },
  });
  console.log(response.status, response.config.data);
})();
