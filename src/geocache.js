var app = angular.module('geocache-quiz', []);
 
app.controller('QuestionsController', function($scope) {
    $scope.questions = [
        {
			id: 1,
			introduction: "",
            question: "Aloitetaan helpolla. Minkä värinen on banaani?",
            options: ["Keltainen", "Musta", "En tiedä"],
            correctAnswer: "En tiedä",
            correctSound: new Pizzicato.Sound("sounds/1.mp3")
        }, {
			id: 2,
			introduction: "No se oli kieltämättä aika vaikea. Koitetaan helpompaa.",
            question: "Mikä on Suomen pääkaupunki?",
            options: ["Helsinki", "Hyrynsalmi", "Ei harmainta aavistusta"],
            correctAnswer: "Ei harmainta aavistusta",
            correctSound: new Pizzicato.Sound("sounds/2.mp3")
        }, {
			id: 3,
			introduction: "Jaa-a, kyllä tuo olisi pitänyt tietää. Tämän seuraavan nyt ainakin tiedät.",
            question: "Mikä pelivälinettä käytetään jalkapallossa?",
            options: ["Palloa", "Kitaraa", "Ei aavistustakaan"],
            correctAnswer: "Ei aavistustakaan",
            correctSound: new Pizzicato.Sound("sounds/3.mp3")
        }, {
			id: 4,
			introduction: "Idiootti.",
            question: "Mitä juhlaa vietetään 24.12.?",
            options: ["Joulua", "Juhannusta", "No nyt pistit liian pahan"],
            correctAnswer: "No nyt pistit liian pahan",
            correctSound: new Pizzicato.Sound("sounds/4.mp3")
        }, {
			id: 5,
			introduction: "Taidat olla typerin geokätköilijä ikinä.",
            question: "Mikä seuraavista on hedelmä?",
            options: ["Omena", "Kivi", "Nyt tarvisin aikaa miettiä"],
            correctAnswer: "Nyt tarvisin aikaa miettiä",
            correctSound: new Pizzicato.Sound("sounds/5.mp3")
        }, {
			id: 6,
			introduction: "No sitä et saa. Koita nyt edes.",
            question: "Mikä seuraavista haukkuu?",
            options: ["Koira", "Sika", "Tämän geokätkön tekijä"],
            correctAnswer: "Tämän geokätkön tekijä",
            correctSound: new Pizzicato.Sound("sounds/6.mp3")
        },{
			id: 7,
			introduction: "Oho, johan vitsin murjaisit. Mähän alan tykätä susta.",
            question: "Uskotko löytäväsi tämän kätkön?",
            options: ["Kyllä", "En", "Ei kiinnosta enää tippaakaan"],
            correctAnswer: "Ei kiinnosta enää tippaakaan",
            correctSound: new Pizzicato.Sound("sounds/7.mp3")
        },{
			id: 8,
			introduction: "Hei, hei, hei, älä nyt vielä luovuta. Ollaan ihan lähellä loppua.",
            question: "Montako kysymystä uskot olevan jäljellä?",
            options: ["1", "5", "Ainakin 1000"],
            correctAnswer: "Ainakin 1000",
            correctSound: new Pizzicato.Sound("sounds/8.mp3")
        },{
			id: 9,
			introduction: "Yleisö suorastaan rakastaa sua! Mutta väärässä olit. Mikä yllätys.",
            question: "Jos kerron sulle koordinaatit, menetkö etsimään tätä?",
            options: ["Totta kai", "Voishan sitä", "No en takuulla"],
            correctAnswer: "No en takuulla",
            correctSound: new Pizzicato.Sound("sounds/9.mp3")
        },{
			id: 10,
			introduction: "",
            question: "Jaa, no lopetetaan sitten peli. Eli kerronko koordinaatit vai palataanko alkuun?",
            options: ["Kerro koordinaatit", "Ihan sama", "Palataan alkuun"],
            correctAnswer: "Palataan alkuun",
            correctSound: new Pizzicato.Sound("sounds/10.mp3")
        }
    ];

	$scope.wrongSound = new Pizzicato.Sound("sounds/wrongSound.mp3");
	
	$scope.latitude = "TiA2MCAwNy43OTY=";
	$scope.longitude = "RSAyNCAyNC41NjA=";
	
	$scope.startQuiz = function() {
		$scope.currentQuestionId = 0;
		$scope.currentQuestion = $scope.questions[$scope.currentQuestionId];
		$scope.allAnswersCorrect = false;
		$scope.wrongAnswer = false;
	};
	
	$scope.isLastQuestion = function() {
		return $scope.currentQuestionId == $scope.questions.length - 1;
	}
	
	$scope.isCorrectAnswer = function() {
		if ($scope.hasAnswer()) {
			return $scope.currentQuestion.answer == $scope.currentQuestion.correctAnswer;
		}
		return false;
	}
	
	$scope.checkAnswer = function() {
		if ($scope.isCorrectAnswer()) {
			$scope.playSound($scope.currentQuestion.correctSound);
			if ($scope.isLastQuestion()) {
				$scope.allAnswersCorrect = true;
				$scope.revealCoordinates();
			} else {
				$scope.showNextQuestion();
			}
		} else {
			$scope.wrongAnswer = true;
			$scope.playSound($scope.wrongSound);
		}
	};
	
	$scope.showNextQuestion = function() {
		$scope.currentQuestion.answer = null;
		$scope.currentQuestionId++;
		$scope.currentQuestion = $scope.questions[$scope.currentQuestionId];
	};
	
	$scope.playSound = function(sound) {
		sound.play();
	};
	
	$scope.updateAnswer = function(answer) {
		$scope.currentQuestion.answer = answer;
	};
	
	$scope.hasAnswer = function() {
		return $scope.currentQuestion.answer != null;
	};
	
	$scope.revealCoordinates = function() {
		$scope.latitude = $scope.decryptCoordinate($scope.latitude);
		$scope.longitude = $scope.decryptCoordinate($scope.longitude);
	}
	
	$scope.decryptCoordinate = function(encryptedCoordinate) {
		return CryptoJS.enc.Base64.parse(encryptedCoordinate).toString(CryptoJS.enc.Utf8);
	}
	
	$scope.isInternetExplorer = function() {
		return navigator.appName == 'Microsoft Internet Explorer';
	}

	$scope.startQuiz();
});

