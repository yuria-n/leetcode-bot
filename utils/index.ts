import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

const LEETCODE_BASE_URL = 'https://leetcode.com/';

export async function getData() {
  const url = `${LEETCODE_BASE_URL}api/problems/all/`;
  const { data } = await axios(url);

  return data.stat_status_pairs.filter(
    ({ difficulty, paid_only }) => difficulty.level === 1 && !paid_only,
  );
}

export function pickQuestion(data: any) {
  const i = Math.floor(Math.random() * data.length);
  return data[i];
}

export function formatText(
  num: number,
  title: string,
  dir: string,
  difficulty: string,
): string {
  const link = `${LEETCODE_BASE_URL}problems/${dir}/`;
  return `${num}. ${title} - ${difficulty}\n${link}`;
}

export async function postQuestion(text: string) {
  const url = process.env.SLACK_WEBHOOK_URL;
  const { status, config } = await axios({
    method: 'post',
    url,
    data: { text },
  });
  console.info(status, config.data);
}
