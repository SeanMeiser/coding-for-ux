import { createMachine, interpret } from 'https://cdn.skypack.dev/xstate';

//defines states
const quizMachine = createMachine({
  id: 'quiz',
  initial: 'intro',
  states: {
    intro: { on: { START: 'morning' } },
    morning: { on: { SUBMIT: 'afternoon' } },
    afternoon: { on: { SUBMIT: 'evening' } },
    evening: { on: { SUBMIT: 'results' } },
    results: { type: 'final' }
  }
});

//define userFlags object here next


//logs state changes in console
const service = interpret(quizMachine).onTransition(state => {
  console.log('Now in state:', state.value);
});

service.start();

//event listeners for start and submit
document.getElementById('start-button').addEventListener('click', () => {
  service.send('START');
});

document.getElementById('submit-button').addEventListener('click', () => {
  service.send('SUBMIT');
});

//starter question info (check if all morning)
const questionData = [
    {
      id: 'q1',
      question: 'Do you want to start your day active?',
      options: [
        { text: 'Yes', next: 'q2' },
        { text: 'No', next: 'q3', set: { moved: false } }
      ]
    },
    {
      id: 'q2',
      question: 'What kind of movement?',
      options: [
        { text: 'Light stretch or yoga (5–15 min)', next: 'q3', set: { moved: true } },
        { text: 'Walk or run (15–45 min)', next: 'q3', set: { moved: true } },
        { text: 'Full workout (30–60 min)', next: 'q3', set: { moved: true } }
      ]
    },
    {
      id: 'q3',
      question: 'Do you want a mental kick-start?',
      options: [
        { text: 'Yes', next: 'q4', set: {} },
        { text: 'No', next: 'q6', set: {} }
      ]
    },
    {
      id: 'q4',
      question: 'How would you like to start your mind?',
      options: [
        { text: 'Calm', next: 'q6', set: { mentallyPrepared: true } },
        { text: 'Focused', next: 'q6', set: { mentallyPrepared: true } },
        { text: 'Inspired', next: 'q6', set: { mentallyPrepared: true } }
      ]
    },
    {
      id: 'q6',
      question: 'Want to prep anything before heading into your day?',
      options: [
        { text: 'Yes', next: 'result', set: { physicallyPrepped: true } },
        { text: 'No', next: 'result', set: { physicallyPrepped: false } }
      ]
    }
  ];
  