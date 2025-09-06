const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all") // response
    .then((res) => res.json()) // response of json
    .then((data) => displayLesson(data.data));
};

const lessonWords = (id) => {
  // console.log(id);
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayLessonWord(data.data));
};

const displayLessonWord = (words) => {
  // console.log(words)
  const wordContainer = document.getElementById("words-container");
  wordContainer.innerHTML = "";

  if (words.length === 0) {
    wordContainer.innerHTML = `
    <div class="text-center col-span-full space-y-3">
      <img src="./assets/alert-error.png" alt="alert-error" class="mx-auto">
      <p class="font-bangla text-[#79716B]">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
      <h1 class="font-bangla font-medium text-[34px] text-[#292524]">নেক্সট Lesson এ যান</h1>
    </div> 
    `;
  }

  for (let word of words) {
    // console.log(word)
    const wordCard = document.createElement("div");
    wordCard.innerHTML = `
    <div class="bg-white text-center p-12 space-y-6 rounded-lg h-full">
      <h2 class="text-[32px] font-bold">${word.word}</h2>
      <p class="text-[20px] font-medium">Meaning /Pronounciation</p>
      <h4 class="text-[32px] font-medium text-[#18181B] font-bangla">${word.meaning} / ${word.pronunciation}</h4>
      <div class="flex justify-between">
        <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-info"></i></button>
        <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
      </div>
    </div>
    `;
    wordContainer.append(wordCard);
  }
};

const displayLesson = (lessons) => {
  //   console.log(lessons);
  // 1. Get element and create empty element
  const levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML = "";
  // 2. Get every lessons
  lessons.forEach((lesson) => {
    // 3. Create Element
    const lessonBtn = document.createElement("div");
    lessonBtn.innerHTML = `
        <button onclick="lessonWords(${lesson.level_no})" class="btn btn-outline btn-primary">
        <i class="fa-solid fa-book-open"></i>
        Lesson - ${lesson.level_no}
        </button>
    `;
    // 4. append
    levelContainer.append(lessonBtn);
  });
};

loadLessons();
