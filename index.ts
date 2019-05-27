import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

const LEETCODE_BASE_URL = 'https://leetcode.com/';
const { SLACK_WEBHOOK_URL } = process.env;

const DIFFICULTIES = ['Easy', 'Medium', 'Hard'];

// Main function
(async () => {
  const data = await getData();
  const { difficulty: d, stat } = pickQuestion(data);
  const text = formatText(
    stat.frontend_question_id,
    stat.question__title,
    stat.question__title_slug,
    DIFFICULTIES[d.level - 1],
  );
  postQuestion(text);
})();

// Get all non-paid question data
export async function getData() {
  const url = `${LEETCODE_BASE_URL}api/problems/all/`;
  const { data } = await axios({
    method: 'get',
    url,
  });

  return data.stat_status_pairs.filter(
    ({ difficulty, paid_only }) => difficulty.level === 1 && !paid_only,
  );
}

// Pick a qestion to post
export function pickQuestion(data) {
  const i = Math.floor(Math.random() * data.length);
  return data[i];
}

// Format message
export function formatText(
  num: number,
  title: string,
  dir: string,
  difficulty: string,
): string {
  const link = `${LEETCODE_BASE_URL}problems/${dir}/`;
  return `${num}. ${title} - ${difficulty}\n${link}`;
}

// Post the generated message to Slack
export async function postQuestion(text: string) {
  const { status, config } = await axios({
    method: 'post',
    url: SLACK_WEBHOOK_URL,
    data: { text },
  });
  console.info(status, config.data);
}
