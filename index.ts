import { getData, pickQuestion, formatText, postQuestion } from './utils';

const DIFFICULTIES = ['Easy', 'Medium', 'Hard'];

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
