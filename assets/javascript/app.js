    

triviaObj ={


	masterQuestions : [{
        question: "________ has reached living walking god status",
        answers:["Jay Z", "Tupac", "Will Ferrell", "Will Smith"],
        correctAnswer: "Will Ferrell",
        visual:"assets/images/kanye_blink.gif",
    },{
        question:"________  pillows are actually hard to sleep on",
        answers:["Fur", "Sheepskin", "Leather", "Wool"],
        correctAnswer: "Fur",
        visual:"assets/images/kanye_whoops.gif",
    },{
        question:"________ is my favorite brand.",
        answers:["Coca Cola", "Samsung", "Apple", "McDonalds"],
        correctAnswer:"McDonalds",
        visual:"assets/images/kanye_illuminati.gif",
    },{
        question:"Sometimes I get emotional over ________",
        answers:["Flower Arrangements", "Tacos", "Fonts", "Kanye"],
        correctAnswer:"Fonts",
        visual:"assets/images/kanye_fish.gif",
    },{
        question:"I ain't even gon lie, I love ________ so much right now",
        possibleAnswers:["Kim", "Me", "My Mom", "Chipotle"],
        correctAnswer:"me",
        visual:"assets/images/kanye_love.gif",
    },{
        question:"You may be talented, but you're not ________",
        answers:["Tupac", "Kanye West", "Obama", "Mozart"],
        correctAnswer:"Kanye West",
        visual:"assets/images/kanye_hiding.gif",
    },{
        question:"I'm ready to get out of my own way. Ego is so over done, it's like ________",
        answers:["Steak", "Hoodies", "Donald Trump", "Pop Music"],
        correctAnswer:"Hoodies",
        visual:"assets/images/kanye_dancing.gif",
    },{
        question:"Who's seen the play ________? I've seen it 4 times. Other than loving the music, acting and costumes, it's my story!",
      	answers:["Phantom of the Opera", "Hamilton", "Wicked", "Cats"],
        correctAnswer:"Wicked",
        visual:"assets/images/kanye_hype.gif",
    },{
        question:"I think ________ was designed specifically with me in mind just my humble opinion hahhhahaaahaaa humble",
        answers:["Facebook", "Reddit", "Twitter", "Tumblr"],
        correctAnswer:"Twitter",
        visual:"assets/images/kanye_prez.gif",
    },{
        question:"I ordered the ________ medium instead of medium well I didn't want to ruin the magic",
        answers:["Steak", "Cake", "Salmon", "Bacon"],
        correctAnswer:"Salmon",
        visual:"assets/images/kanye_yeezy.gif",
    }],

    // Variables
    guessesCorrect: 0,
    guessesIncorrect: 0,
    unansweredGuesses: 0,
    currentQuestion: [],
    currentGuess: "",
    userGuess: "",
    timerCount: 14,
    masterIndex: "",

   
    // Loads the page and the timer
    pageLoad: {
        run: function() {
            counter = setInterval(this.decrement, 1000);
        },
  
        decrement: function() {

            $('#timer').html('<h2>' + 'Time Remaining: ' + triviaObj.timerCount + '</h2>');
            triviaObj.timerCount--;

            if (triviaObj.timerCount === -1) {
                triviaObj.emptyDivs();
                triviaObj.timesUp();
                triviaObj.unansweredGuesses++;
                triviaObj.spliceArray();
                // is the timeout function to automatically switch the page
                triviaObj.pageTimeout.timeout();
            }

        },
        // Stops the timer
        stop: function() {
            clearInterval(counter);
        }
    },

    // Timeout function
    pageTimeout: {

        timeout: function() {
            setTimeout(this.fiveSeconds, 1000 * 7);
        },
        fiveSeconds: function() {
            triviaObj.emptyDivs();
            triviaObj.currentQuestion = [];
           

            // Game over
            if (triviaObj.masterQuestions.length == 0) {
                triviaObj.summaryPage();
                triviaObj.pageLoad.stop();

            } else {

                triviaObj.questionLoad();
            }
        }
    },

    timerReset: function() {
        var timerCount = 0;
        return timerCount;
        $('#timer').html('<h2>' + 'Time Remaining: ' + triviaObj.timerCount + '</h2>');
    },

    questionLoad: function() {
        this.timerCount = 14;
        // Show the number in the #show-number tag.
        $('#timer').html('<h2>' + 'Time Remaining: ' + 15 + '</h2>');
        this.pageLoad.run();
        // Pushes the random question to the current question array
        this.currentQuestion.push(this.randomPick());

        $('#question').html('<h2>' + triviaObj.currentQuestion[0].question + '<h2>');

        // Setting the variable of current answers equal to the answers section with the current question array
        var currentAnswers = this.currentQuestion[0].answers

        // stores get element in variable parent 
        var parent = document.getElementById('answers');

        //  a for each function that runs for every answer in the array
        currentAnswers.forEach(function(answer, index, array) {

            var div = document.createElement('div');  
            div.setAttribute('class', 'col-sm-12 col-md-6 col-lg-6 guess center-block');
            var text = document.createTextNode(answer);
            div.appendChild(text);
            parent.appendChild(div);

        });
    },
    // Randomly picks the next question
    randomPick: function() {
        
        this.masterIndex = Math.floor(Math.random() * this.masterQuestions.length);
        var initialPick = this.masterQuestions[this.masterIndex];

        return initialPick;


    },

    // Removes current question from array
    spliceArray: function() {
        triviaObj.masterQuestions.splice(this.masterIndex, 1);     
    },

    // Function to empty currently populated divs with questions and answers
    emptyDivs: function() {
        $('#question').empty();
        $('#answers').empty();
        $('#picture').empty();
        $('#correctAnswer').empty();
        $('#timer').empty();


    },

    // The time up function
    timesUp: function() {
        $('#timer').attr('style', 'font-size: 40px;').html('Times UP!');
        $('#correctAnswer').html('The Correct Answer Is: ' + '<span>' + triviaObj.currentQuestion[0].correctAnswer + '</span>');

        triviaObj.displayAssets();
        triviaObj.pageLoad.stop();
 

    },
// Correct Guess function
    correctGuess: function() {
        $('#question').attr('style', 'font-size: 40px;').html('Correct!');
        triviaObj.displayAssets();

    },

// Incorrect guess function

    incorrectGuess: function() {
        $('#timer').attr('style', 'font-size: 40px;').html('Wrong!');
        $('#correctAnswer').html('The Correct Answer Is: ' + '<span>' + triviaObj.currentQuestion[0].correctAnswer + '</span>');
        triviaObj.displayAssets();

    },

// Create displayAssets function
    displayAssets: function() {
      
        var img = $('<img>');
        img.attr('src', triviaObj.currentQuestion[0].visual);
        img.attr('class', 'img-rounded m-x-auto d-block pictureframe');
        img.attr('alt', 'Image');
        $('#picture').html(img);
    },

    summaryPage: function() {

            $('#question').html('<h2>' + 'Thank you for playing. Here is your game summary: ' + '</h2>');

            // display correct guesses
            $('#answers').html("<p>" + "Correct Guesses: " + triviaObj.guessesCorrect + "</p>");

            // display incorrect guesses
            $('#answers').append("<p>" + "Incorrect Guesses: " + triviaObj.guessesIncorrect + "</p>");

            // display unanswered guesses
            $('#answers').append("<p>" + "Unanswered Guesses: " + triviaObj.unansweredGuesses + "</p>");

        }
   
}

// Game start


	$(document).ready(function() {
	    
	    var b = $('<button>');
	    b.addClass('start btn-warning btn-lg text-center startButton');
	    b.html('START!');

	    $('#start').append(b);


	    //Question loads

	    $('#start').on('click', function(event) {
	        $(this).hide();
	        triviaObj.questionLoad();

	    });

	    // User guesses 

	    $(document.body).on('click', '.guess', function(event) {
	        var click = $(this).text();

	        triviaObj.pageLoad.stop();

	        // Correct guess
	        if (click == triviaObj.currentQuestion[0].correctAnswer) {
	            triviaObj.emptyDivs();
	            triviaObj.correctGuess();
	            triviaObj.guessesCorrect++;
	            triviaObj.spliceArray();
	            // Time Out
	            triviaObj.pageTimeout.timeout();
	        }


	        // incorrect guess
	        else if (click != triviaObj.currentQuestion[0].correctAnswer) {
	            triviaObj.emptyDivs();
	            triviaObj.incorrectGuess();
	            triviaObj.guessesIncorrect++;
	            triviaObj.spliceArray();
	            // Time Out
	            triviaObj.pageTimeout.timeout();

	        }
	    });

});
