// 1 - Firt grad the start button and assign it 
// to a variable called starButton in order
// to be manipulated in your JS code
const startButton = document.getElementById('start-btn');
// 2 - Now add the event you want when someone click on the
// start button in order to call the startGame function
startButton.addEventListener('click', startGame);

const questionContainerElement = document.getElementById('question-container');

const nextButton = document.getElementById('next-btn');

// 12 - questions and answers elements
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');

// Will hold value of our questions index to know at what position we are.
// 8 - Now we will first use the shuffledQuestions to sort the currentQuestionIndex.
// in startGame function.
let shuffledQuestions, currentQuestionIndex;

// 37 - Now let's make our next button works
nextButton.addEventListener('click', () => {
	// 38 - First take our currentQuestionIndex and add 1 to it
	// in other that it goes to the next question.
	currentQuestionIndex++;
	// 39 - And now just call setNextQuestion function and make sure 
	// that check our shuffledQuestions.lenght to see if we have enough 
	// questions, and it is greater than our nextQuestion lenght.
	setNextQuestion();
})


// This is the function that starts the game.
function startGame() {
	// console.log('star was clicked!!!');
	// 3 - First lets hide the startButton after
	// someone clicks on it to reveal the questions irst
	startButton.classList.add('hide');
	// 4 - for that let's grab the id question-container.
	// add the the classList with the remove functio 
	// and remove the hide class added to reveal the questions.

	// 9 - Make the shuffledQuestions = the questions arrays
	// and sort regarding if positve or negative
	shuffledQuestions = questions.sort(() => Math.random() - .5);
	// 10 - Set the currentIndexQuestion to zero because we start from zero
	currentQuestionIndex = 0;

	questionContainerElement.classList.remove('hide');
	// 5 - Now the first thing our game is supposed to do
	// is to set the next question by calling the class setNextQuestion.
	// 6 - for that we need to create a list of questions that will be asked
	// in an array in our JS project first.
	setNextQuestion()
	// 7 - We don not always want our questions in the exact order
	// we want then to be shuffle and random, and for that let's create
	// two variables on top called shuffledQuestions and currentQuestionIndex.
}

// This is the function that sets the next question
function setNextQuestion() {
	// 22 - Now let's create a function called resetState() that will reset and clear out
	// the question every time we set a new question.
	resetState();

	// 11 - Now in setNextQuestion, we want that first question
	// and we want to show it to the user. For that let'screate
	// a function called showQuestion that will take 2 arguments
	// shuffledQuestions, and currentQuestionIndex that will be called here.
	showQuestion(shuffledQuestions[currentQuestionIndex]);
}

// 23 - function that resetState of the question and clears out everything
// our form, body, ect to its default state everytime we set a new thing.
function resetState() {
	// 41- Now it is time to also reset the green and red class on the body.
	clearStatusClass(document.body);

	// 24 - First thing is to hide our nextButton
	nextButton.classList.add('hide');
	// 25 - we want to loop trough all of our children for answer button
	while(answerButtonsElement.firstChild) {
		// 27 - first select the nextButton and give it a value of nextButton
		// with the document.getElementById('next-button')
		answerButtonsElement.removeChild(answerButtonsElement.firstChild);
	}

}

// 12 - To use the showQuestion function, we need to grab to variables
// id=question that will have the value questionElement, and id=answer
// that will have the value answerButtonsElement
function showQuestion(question) {
	// 13 - Make use of const questionElement and answerButtonsElement now.
	questionElement.innerText = question.question;
	// 14 - Now we need to populate our different answers and for that 
	// we need to loop through our question answers to get a single answer.
	question.answers.forEach(answer => {
		// 16 - for each single answer we need to create a button for each one of them
		// with the Js document.createElement function.
		const button  = document.createElement('button');
		// 17 - After creating the button, we need to set its innerText
		// equal to the answer.text
		button.innerText = answer.text;
		// 18 - We also have to make sure that we add the button.classList to
		// the button so that 
		button.classList.add('btn');
		// 19 - Now let's check if our answer are correct
		if (answer.correct) {
			button.dataset.correct = answer.correct;
		}
		// 20 - Add an eventListener on the btn so that when it is 
		// clicked we only select the correct answer.
		button.addEventListener('click', selectAnswer);
		// 21 - after calling selectAnswer func we append the answer
		// to the button we just created.
		answerButtonsElement.appendChild(button); 
	});
}

// This is the function that selects the answer
function selectAnswer(e) {
	// 28 - we need to figure out what to do when the user select an answer
	// 29 - First we need to select wich button was selected by creating a variable
	// that define wich button was selected called selectedButton with its e.taget.
	const selectedButton = e.target;
	// 30 - Now we want to check if the targeted button is correct by creating 
	// a variable correct and assigning a vlue to it that will be = to it's dataset
	const correct = selectedButton.dataset.correct;
	// 31 - Now set the status bar of our body to by created a function called
	// setStatusClass in order to change the body from green to red depending on answer.
	setStatusClass(document.body, correct);
	// 32 - We also need to loop trough all our button and set a the class green or red 
	// for them as well depending of the answer.
	Array.from(answerButtonsElement.children).forEach(button => {
		setStatusClass(button, button.dataset.correct);
	});
	// 40 - check if don't run out of question. If shuffledQuestions.length is 
	// greater than our currentQuestionIndex.
	// if that's the case show the next question with the nextButton.
	if(shuffledQuestions.length > currentQuestionIndex + 1) {

		// 36 - Now let just call and remove the next button
	     nextButton.classList.remove('hide');
	} else {
		//  Otherwise show the start button and chage the inside text to Restart
		// with the innerText 'restat'.
		startButton.innerText = 'Restart';
		// and then we want to show this button to the users.
		startButton.classList.remove('hide');
	}
}

// function that set statusClass on body and button to turn red or green
// depending or right and wrong answer
// with 2 arguments. The element and whether or not it is correct.
function setStatusClass(element, correct) {
	// 33 - First clear any default status on body and button
	clearStatusClass(element);
	// 34 - Now let's check if status if correct to add the right class tot it.
	if(correct) {
		element.classList.add('correct');
	} else {
		element.classList.add('wrong');
	}
}

// 35 - function that will clear the setStatusClass and bring element to 
// default status on body and button element and remove them.
function clearStatusClass(element) {
	element.classList.remove('correct');
	element.classList.remove('wrong');
}

const questions = [
	{
		question: 'What is 2 + 2?',
		answers: [
			{ text: '4', correct: true },
			{ text: '10', correct: false },
			{ text: '2', correct: false },
			{ text: '22', correct: false },
		]
	},
	{
		question: 'Is web development fun?',
		answers: [
			{ text: 'kinda', correct: false },
			{ text: 'Yes, indeed!!!', correct: true },
			{ text: 'Um! no really!!!', correct: false },
			{ text: 'IDknow', correct: false }
		]
	},
	{
		question: 'What is 4 * 2?',
		answers: [
			{ text: '5', correct: false },
			{ text: '6', correct: false },
			{ text: '8', correct: true },
			{ text: '20', correct: false }
		]
	},
	{
		question: 'Who is the best Youtuber?',
		answers: [
			{ text: 'Web Dev Simplified', correct: true },
			{ text: 'Traversy Media', correct: true },
			{ text: 'fun fun Function', correct: true },
			{ text: 'Dev Ed', correct: true }
		]
	}

]























