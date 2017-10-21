var app = angular.module('content', []);
 
app.controller('QuestionsController', function($scope) {
    var questions = [
        {
			id: 1,
			introduction: "",
            question: "Aloitetaan helpolla. Minkä värinen on banaani?",
            options: ["Keltainen", "Musta", "En tiedä"],
            correctAnswer: "En tiedä"
        }, {
			id: 2,
			introduction: "No se oli kieltämättä aika vaikea. Koitetaan helpompaa.",
            question: "Mikä on Suomen pääkaupunki?",
            options: ["Helsinki", "Hyrynsalmi", "Ei harmainta aavistusta"],
            correctAnswer: "Ei harmainta aavistusta"
        }, {
			id: 3,
			introduction: "Jaa-a, kyllä tuo olisi pitänyt tietää. Tämän seuraavan nyt ainakin tiedät.",
            question: "Mikä pelivälinettä käytetään jalkapallossa?",
            options: ["Palloa", "Kitaraa", "Ei aavistustakaan"],
            correctAnswer: "Ei aavistustakaan"
        }, {
			id: 4,
			introduction: "Idiootti.",
            question: "Mitä juhlaa vietetään 24.12.?",
            options: ["Joulua", "Juhannusta", "No nyt pistit liian pahan"],
            correctAnswer: "No nyt pistit liian pahan"
        }, {
			id: 5,
			introduction: "Taidat olla typerin geokätköilijä ikinä.",
            question: "Mikä seuraavista on hedelmä?",
            options: ["Omena", "Kivi", "Nyt tarvisin aikaa miettiä"],
            correctAnswer: "Nyt tarvisin aikaa miettiä"
        }, {
			id: 6,
			introduction: "No sitä et saa. Koita nyt edes.",
            question: "Mikä seuraavista haukkuu?",
            options: ["Koira", "Sika", "Tämän geokätkön tekijä"],
            correctAnswer: "Tämän geokätkön tekijä"
        },{
			id: 7,
			introduction: "Oho, johan vitsin murjaisit. Mähän alan tykätä susta.",
            question: "Uskotko löytäväsi tämän kätkön?",
            options: ["Kyllä", "En", "Ei kiinnosta enää tippaakaan"],
            correctAnswer: "Ei kiinnosta enää tippaakaan"
        },{
			id: 8,
			introduction: "Hei, hei, hei, älä nyt vielä luovuta. Ollaan ihan lähellä loppua.",
            question: "Montako kysymystä uskot olevan jäljellä?",
            options: ["1", "5", "Ainakin 1000"],
            correctAnswer: "Ainakin 1000"
        },{
			id: 9,
			introduction: "Yleisö suorastaan rakastaa sua! Mutta väärässä olit. Mikä yllätys.",
            question: "Jos kerron sulle koordinaatit, menetkö etsimään tätä?",
            options: ["Totta kai", "Voishan sitä", "No en takuulla"],
            correctAnswer: "No en takuulla"
        },{
			id: 10,
			introduction: "",
            question: "Jaa, no lopetetaan sitten peli. Eli kerronko koordinaatit vai palataanko alkuun?",
            options: ["Kerro koordinaatit", "Ihan sama", "Palataan alkuun"],
            correctAnswer: "Palataan alkuun"
        }
    ];
     
    $scope.questions = questions;
	
	$scope.wrongSoundFileName = "wrongSound";
	
	$scope.latitude = "60°07\′25\"";
	$scope.longitude = "24°26\′18\″";
	
	$scope.startQuiz = function () {
		$scope.currentQuestionId = 0;
		$scope.currentQuestion = $scope.questions[$scope.currentQuestionId];
		$scope.allAnswersCorrect = false;
		$scope.wrongAnswer = false;
	};
	
	$scope.lastQuestion = function () {
		return $scope.questions.length - 1;
	}
	
	$scope.checkAnswer = function (answer) {
		if ($scope.currentQuestion.answer == $scope.currentQuestion.correctAnswer) {
			if ($scope.currentQuestionId == $scope.lastQuestion()) {
				$scope.allAnswersCorrect = true;
			} else {
				var fileName = $scope.currentQuestion.id;
				var volume = $scope.currentQuestion.id * $scope.correctSoundMultiplier;
				$scope.playSound(fileName);
				$scope.showNextQuestion();
			}
		} else {
			$scope.wrongAnswer = true;
			$scope.playSound($scope.wrongSoundFileName);
		}
	};
	
	$scope.showNextQuestion = function () {
		$scope.currentQuestion.answer = null;
		$scope.currentQuestionId++;
		$scope.currentQuestion = $scope.questions[$scope.currentQuestionId];
	};
	
	$scope.playSound = function (fileName) {
		var sound = "sounds/" + fileName + ".wav";
		var feedBackSound = new Pizzicato.Sound(sound, function() {
		    feedBackSound.play();
		});
	};
	
	$scope.updateAnswer = function(answer) {
		$scope.currentQuestion.answer = answer;
	};
	
	$scope.hasAnswer = function() {
		return $scope.currentQuestion.answer != null;
	};
	
	$scope.startQuiz();
});

