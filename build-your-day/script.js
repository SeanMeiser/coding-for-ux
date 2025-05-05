import { createMachine, interpret } from 'https://cdn.skypack.dev/xstate';

const quizMachine = createMachine({
  id: 'quiz',
  initial: 'intro',
  states: {
    intro: { on: { START: 'questions' } },
    questions: { on: { SUBMIT: 'results' } },
    results: { type: 'final' }
  }
});

const service = interpret(quizMachine).onTransition(state => {
  console.log('Now in state:', state.value);
});

service.start();

document.getElementById('start-btn').addEventListener('click', () => {
  service.send('START');
});

document.getElementById('submit-btn').addEventListener('click', () => {
  service.send('SUBMIT');
});
