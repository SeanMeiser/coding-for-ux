const steps = [
  { id: "start-screen" },
  { id: "question-screen" },
  { id: "activity-screen" },
  { id: "reflection-screen" },
  { id: "question2-screen" },
  { id: "activity2-screen" },
  { id: "reflection2-screen" },
  { id: "complete-screen" },
  { id: "question3-screen" },
  { id: "activity3-screen" },
  { id: "reflection3-screen" },
  { id: "question4-screen" },
  { id: "activity4-screen" },
  { id: "reflection4-screen" },
  { id: "midday-complete-screen" },
  { id: "question5-screen" },
  { id: "activity5-screen" },
  { id: "reflection5-screen" },
  { id: "day-complete-screen" },
  { id: "recap-screen" }
];

let currentStep = 0;
let timerInterval;
const answers = {};

// Show only the given screen
function showStep(i) {
  currentStep = i;
  steps.forEach((s, idx) => {
    document.getElementById(s.id).style.display = idx === i ? "flex" : "none";
  });
  loadVideo && loadVideo(i);
}

function nextStep()    { showStep(Math.min(currentStep + 1, steps.length - 1)); }
function goBack()      { showStep(Math.max(currentStep - 1, 0)); }
function skipStep()    { nextStep(); }


// Q1 handlers
function selectActivity(name, minutes) {
  answers.activity1 = { name, minutes };
  startActivity(name, minutes);
}
function startActivity(name, minutes) {
  showStep(2);
  document.getElementById("activity-title").textContent = `${name} - ${minutes} min`;
  startTimer(minutes * 60);
  const v = document.getElementById("activity-video");
  v.src = `videos/${name.toLowerCase()}.mp4`;
  v.load();
}
function startTimer(sec) {
  const d = document.getElementById("timer-display");
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    const m = Math.floor(sec / 60), s = sec % 60;
    d.textContent = `${m}:${s < 10 ? '0' : ''}${s}`;
    if (sec-- <= 0) clearInterval(timerInterval);
  }, 1000);
}
function finishActivity() { clearInterval(timerInterval); nextStep(); }
function submitReflection() { answers.reflection1 = document.getElementById("reflectionInput").value; nextStep(); }

// Q2 handlers
function selectMindActivity(type) {
  answers.mindActivity = { type };
  document.getElementById("activity2-title").textContent = type;
  showStep(5);
  const v2 = document.getElementById("activity2-video");
  v2.src = `videos/${type}.mp4`;
  v2.load();
}
function submitMindActivity() { answers.mindActivity.input = document.getElementById("mindActivityInput").value; nextStep(); }
function finishFlow() { answers.reflection2 = document.getElementById("reflection2Input").value; nextStep(); }

// Q3 handlers
function selectPrepFuture(type) {
  answers.prepFuture = type;
  document.getElementById("activity3-title").textContent = type;
  showStep(9);
  const v3 = document.getElementById("activity3-video");
  v3.src = `videos/${type}.mp4`;
  v3.load();
}
function finishPrepFuture() { nextStep(); }
function submitReflection3() { answers.reflection3 = document.getElementById("reflection3Input").value; nextStep(); }

// Q4 handlers
function selectEnergyAct(type) {
  answers.energyAct = type;
  document.getElementById("activity4-title").textContent = type;
  showStep(12);
  const v4 = document.getElementById("activity4-video");
  v4.src = `videos/${type}.mp4`;
  v4.load();
}
function finishEnergyAct() { nextStep(); }
function finishMidday() { answers.reflection4 = document.getElementById("reflection4Input").value; nextStep(); }

// Q5: Evening Wind-Down
function selectRelaxation(type) {
  answers.relaxation = type;
  document.getElementById("activity5-title").textContent = type;
  showStep(16);
}
function finishRelaxation()  { nextStep(); }       // → reflection5-screen
function submitReflection5() {
  answers.reflection5 = document.getElementById("reflection5Input").value;
  nextStep();                                     // → day-complete-screen
}

// Recap helper
function showRecap() {
  const c = document.getElementById("recap-content");
  c.innerHTML = [
    `Movement: ${answers.activity1.name} (${answers.activity1.minutes} min)`,
    `After movement: ${answers.reflection1}`,
    `Mind activity: ${answers.mindActivity.type} – ${answers.mindActivity.input}`,
    `After mind: ${answers.reflection2}`,
    `Prep future: ${answers.prepFuture}`,
    `After prep: ${answers.reflection3}`,
    `Energy act: ${answers.energyAct}`,
    `After energy: ${answers.reflection4}`,
    `Relaxation: ${answers.relaxation}`,
    `After relaxation: ${answers.reflection5}`
  ].map(line => `<p>${line}</p>`).join('');
}

// Initialize and hook recap
document.addEventListener("DOMContentLoaded", () => {
  showStep(0);
  const origNext = nextStep;
  nextStep = () => {
    origNext();
    if (steps[currentStep].id === "recap-screen") showRecap();
  };
});
  
  // Load video backgrounds for screens other than dynamic activity screens
  function loadVideo(idx) {
    const map = {
      0:  "start.mp4",
      1:  "start.mp4",
      2:  null,
      3:  "reflect.mp4",
      4:  "start.mp4",
      5:  null,
      6:  "reflect.mp4",
      7:  null,
      8:  "start.mp4",
      9:  null,
      10: "reflect.mp4",
      11: "start.mp4",
      12: null,
      13: "reflect.mp4",
      14: null,                    // midday-complete-screen
      15: "evening_q5.mp4",      // question5-screen
      16: `${answers.relaxation}.mp4`,
      17: "reflect.mp4",         // reflection5-screen
      18: null,                    // day-complete-screen
      19: null                     // recap-screen
    };
  
    const ids = {
      0:  "start-video",
      1:  "question-video",
      2:  "activity-video",
      3:  "reflection-video",
      4:  "question2-video",
      5:  "activity2-video",
      6:  "reflection2-video",
      8:  "question3-video",
      9:  "activity3-video",
      10: "reflection3-video",
      11: "question4-video",
      12: "activity4-video",
      13: "reflection4-video",
      15: "question5-video",
      16: "activity5-video",
      17: "reflection5-video"
    };
  
    const vidEl = ids[idx] && document.getElementById(ids[idx]);
    const file  = map[idx];
    if (vidEl && file) {
      vidEl.src = `videos/${file}`;
      vidEl.load();
    }
  }

// recap helper
function showRecap() {
  const c = document.getElementById("recap-content");
  c.innerHTML = [
    `Movement: ${answers.activity1.name} (${answers.activity1.minutes} min)`,
    `After movement: ${answers.reflection1}`,
    `Mind activity: ${answers.mindActivity.type} – ${answers.mindActivity.input}`,
    `After mind activity: ${answers.reflection2}`,
    `Prep future: ${answers.prepFuture}`,
    `After prep: ${answers.reflection3}`,
    `Energy act: ${answers.energyAct}`,
    `After energy: ${answers.reflection4}`,
    `Relaxation: ${answers.relaxation}`,
    `After relaxation: ${answers.reflection5}`
  ].map(line => `<p>${line}</p>`).join('');
}

// initialize and hook into recap display
document.addEventListener("DOMContentLoaded", () => {
  showStep(0);
  const origNext = nextStep;
  nextStep = () => {
    origNext();
    if (steps[currentStep].id === "recap-screen") {
      showRecap();
    }
  };
});