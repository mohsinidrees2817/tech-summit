export const quizz = [
  {
    question: "What country has the highest life expectancy?",
    answer: "Hong Kong",
  },
  {
    question: "Where would you be if you were standing on the Spanish Steps?",
    answer: "Rome",
  },
  {
    question:
      "Which language has the more native speakers: English or Spanish?",
    answer: "Spanish",
  },
  {
    question: "What is the most common surname in the United States?",
    answer: "Smith",
  },
  {
    question: "What disease commonly spread on pirate ships?",
    answer: "Scurvy",
  },
  {
    question: "Who was the Ancient Greek God of the Sun?",
    answer: "Apollo",
  },
  {
    question:
      "What was the name of the crime boss who was head of the feared Chicago Outfit?",
    answer: "Al Capone",
  },
  {
    question: "What year was the United Nations established?",
    answer: "1945",
  },
  {
    question: "Who has won the most total Academy Awards?",
    answer: "Walt Disney",
  },
  {
    question: "What artist has the most streams on Spotify?",
    answer: "Drake",
  },
  {
    question: "How many minutes are in a full week?",
    answer: "10,080",
  },
  {
    question: "What car manufacturer had the highest revenue in 2020?",
    answer: "Volkswagen",
  },
  {
    question: "How many elements are in the periodic table?",
    answer: "118",
  },
  {
    question: "What company was originally called 'Cadabra'?",
    answer: "Amazon",
  },
  {
    question: "How many faces does a Dodecahedron have?",
    answer: "12",
  },
  {
    question:
      "Queen guitarist Brian May is also an expert in what scientific field?",
    answer: "Astrophysics",
  },
  {
    question: "Aureolin is a shade of what color?",
    answer: "Yellow",
  },
  {
    question: "How many ghosts chase Pac-Man at the start of each game?",
    answer: "4",
  },
  {
    question: "What Renaissance artist is buried in Rome's Pantheon?",
    answer: "Raphael",
  },
  {
    question: "What shoe brand makes the 'Mexico 66'?",
    answer: "Onitsuka Tiger",
  },
  {
    question: "What game studio makes the Red Dead Redemption series?",
    answer: "Rockstar Games",
  },
  {
    question: "Who was the last Tsar of Russia?",
    answer: "Nicholas II",
  },
  {
    question:
      "What character have both Robert Downey Jr. and Benedict Cumberbatch played?",
    answer: "Sherlock Holmes",
  },
  {
    question: "What country drinks the most coffee per capita?",
    answer: "Finland",
  },
  {
    question: "Which planet in the Milky Way is the hottest?",
    answer: "Venus",
  },
  {
    question: "What is the 4th letter of the Greek alphabet?",
    answer: "Delta",
  },
  {
    question: "What sports car company manufactures the 911?",
    answer: "Porsche",
  },
  {
    question: "What city is known as 'The Eternal City'?",
    answer: "Rome",
  },
  {
    question:
      "Roald Amundsen was the first man to reach the South Pole, but where was he from?",
    answer: "Norway",
  },
];

export function getRandomQuizz() {
  const randomQuizz = [];
  const quizzCopy = [...quizz];
  for (let i = 0; i < 15; i++) {
    const randomIndex = Math.floor(Math.random() * quizzCopy.length);
    randomQuizz.push(quizzCopy[randomIndex]);
    quizzCopy.splice(randomIndex, 1);
  }
  return randomQuizz;
}

export function quizmarks(answer) {
  let score = 0;
  for (let i = 0; i < answer.length; i++) {
    if (answer[i].answer === quizz[i].answer) {
      score++;
    }
  }
  return score;
}

export function userActivity(id, quizindex) {}

const Quiz = () => {
  return <>sdfsdfsdfdsfdsf</>;
};
export default Quiz;
