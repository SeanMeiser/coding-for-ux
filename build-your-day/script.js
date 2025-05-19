// starter question info
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
  
// store answer + update flags 
let currentQuestion = null;
let userFlags = {};
let userAnswers = [];

// switches visible screen
function goTo(screenId) {
  // Log which screen we're trying to show
  console.log('Going to screen:', screenId);

  // finds all element with class 'screen' and removes 'active' from them
  document.querySelectorAll('.screen').forEach(s => {
    console.log('Removing active from:', s.id);
    s.classList.remove('active');
  });

  // Find the specific screen we want to show by its ID
  const targetScreen = document.getElementById(screenId);
  
  console.log('Adding active to:', screenId);
  
  // adding the active class to make this visible!!!!!
  targetScreen.classList.add('active');
}

function renderQuestion(question) {
  console.log('Rendering question:', question);
  
  // stores the current question in our variable
  currentQuestion = question;

  const title = document.getElementById('question-title');
  const answers = document.getElementById('answer-options');

  //Set the question text in the title element
  title.textContent = question.question;
  
  //supposed to clear previous selected options
  answers.innerHTML = '';

  //for each option in the question
  question.options.forEach(option => {
    // create button element
    const btn = document.createElement('button');
    btn.className = 'nes-btn';
    // Set the button text to the option text
    btn.textContent = option.text;
    btn.onclick = () => select(option);
    // add the selection to the answers container
    answers.appendChild(btn);
  });

  goTo('question-screen');
}

function select(option) {
  //saves answer
  userAnswers.push({ id: currentQuestion.id, text: option.text });

  //merge flags
  if (option.set) {
    Object.assign(userFlags, option.set);
  }

  //go next question
  if (option.next === 'result') {
    goTo('results-screen');
    displayResults();
  } else {
    const nextQuestion = questionData.find(q => q.id === option.next);
    renderQuestion(nextQuestion);
  }
}

function displayResults() {
  const resultsText = document.getElementById('results-text');
  // Customize this however you want:
  resultsText.textContent = `You chose to ${userFlags.moved ? 'move' : 'rest'}, and felt ${userFlags.mentallyPrepared ? 'mentally prepared' : 'neutral'}.`;
}

// Add event listeners when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('start-button').addEventListener('click', () => {
    console.log('Start button clicked');
    const firstQuestion = questionData[0];
    console.log('First question:', firstQuestion);
    renderQuestion(firstQuestion);
    console.log('Question rendered');
  });
});