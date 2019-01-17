'use strict';

let questionIndex = 0;
let score = 0;

let quizLength = qData.length; //If more questions are added or removed
let questionCount = 0;

$(function numQuestions() {
    $('.js-quiz-length').text(quizLength);
})

function startQuiz() {
    $('.js-start-button').on('click', function() {
        $('.initiate-quiz').css('display', 'none');
        renderQuestion();
    });
}

function generateQuestion() {
    return `<fieldset class="quiz">
        <legend>${qData[questionIndex].question}</legend>
            <p>
                <input type="radio" name="option" id="ans_1" value="${qData[questionIndex].choices[0]}" required>
                <label for="ans_1">${qData[questionIndex].choices[0]}</label>
            </p>
            <p>
                <input type="radio" name="option" id="ans_2" value="${qData[questionIndex].choices[1]}">
                <label for="ans_2">${qData[questionIndex].choices[1]}</label>
            </p>
            <p>
                <input type="radio" name="option" id="ans_3" value="${qData[questionIndex].choices[2]}">
                <label for="ans_3">${qData[questionIndex].choices[2]}</label>
            </p>
            <p>
                <input type="radio" name="option" id="ans_4" value="${qData[questionIndex].choices[3]}">
                <label for="ans_4">${qData[questionIndex].choices[3]}</label>
            </p>
            <button class="check-answer js-check-answer">Next</button>
    </fieldset>`;
}

function questionNumCount() {
    $('.js-question-num').text(++questionCount);
}

function renderQuestion() {
    $('.quiz-container').append(generateQuestion());
    questionNumCount();
}

function removeQuizView() {
    $('fieldset').remove();
}

function feedback(feedback) {
    $('main').append(feedback);
}

function correctFeedback() {
    return `<div class="ans-feedback js-ans-feedback">
    <p>Correct</p>
    <img ${qData[questionIndex].img}>
    <button type=button class="next-quest js-next-quest">Continue</button>
  </div>`
}

function wrongFeedback(){
    return `<div class="ans-feedback js-ans-feedback">
    <p>Actually the correct answer is ${qData[questionIndex].answer}.</p>
    <img ${qData[questionIndex].img}>
    <button type=button class="next-quest js-next-quest">Continue</button>
  </div>`
}

function updateScore() {
    ++score;
    $('.js-score').text(score);
}

function revealAnswer() {
    //when user clicks next, opens up feedback
    $('.quiz-container').on('submit', function(event) {
        event.preventDefault();
        let userAnswer = $('input:checked').val();
        let answer = qData[questionIndex].answer;
        //if correct
        if (userAnswer === answer) {
            updateScore()
            removeQuizView();
            feedback(correctFeedback());
        } else { 
        //if wrong
            removeQuizView();
            feedback(wrongFeedback());
        }
    })
}

function advanceIndex() {
    ++questionIndex;
}

function removeFeedback() {
    $('.js-ans-feedback').remove();
}

function nextQuestion() {
    //when user clicks continue to next question
    $('main').on('click', '.js-next-quest', function(event) {
        if (questionCount < quizLength) {
            //increases questionIndex count by 1
            advanceIndex();
            renderQuestion();
            //closes the feedback
            removeFeedback();
        } else {
            removeFeedback();
            resultsView();
        }
    })
}

function resultsView() {
    $('main').append(result());
}

function result() {
    return `<div class="results">
    <p>Hopefully you learned something new. Many nationalities meet on the field and create history in the name of football.</p>
    <p><span class="js-score">${score}</span> out of <span class="js-quiz-length">${quizLength}</span> correct.</p>
    <img class="win" src="https://www.emugifs.net/wp-content/uploads/2018/07/France-vs-Croatia-4-2-FIFA-World-Cup-Russia-2018-Final-Victories.gif" alt="France celebrates world cup win">
    <button class="play-again" type=button>Play Again</button>
    </div>`;
}

function removeResult() {
    $('.results').remove();
}

function playAgain() {
    $('main').on('click', '.play-again', function() {
        removeResult();
        questionIndex = 0;
        questionCount = 0;
        score = 0;
        $('.js-score').text(score);
        renderQuestion();
    })
}

function quizApp() {
    startQuiz();
    revealAnswer();
    nextQuestion();
    playAgain();
}

$(quizApp);
