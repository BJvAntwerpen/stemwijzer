var stemwijzerModule = (function() {
	var statementNum = -1;
	var answers = [];
	var totalCounted = {};
	var bestParties = [];
	var title = document.getElementById('Title');
	var statement = document.getElementById('statement');
	var btns = document.getElementsByTagName('button');

	var changeStatement = function() {
		if (statementNum === -1) {
			statementNum = 0;
			title.innerHTML = '' + (statementNum+1) + '. ' + subjects[statementNum].title;
			statement.innerHTML = subjects[statementNum].statement;
		} else {
			title.innerHTML = '' + (statementNum+1) + '. ' + subjects[statementNum].title;
			statement.innerHTML = subjects[statementNum].statement;
		}
	};

	var answered = function(answer) {
		answers[statementNum] = answer;
		console.log(answers);
		if (statementNum === (subjects.length -1)) {
			statementNum++;
			document.getElementById('answerContainer').style.display = 'none';
			title.innerHTML = 'Je bent klaar';
			statement.innerHTML = '';
			countAnswers();
		} else {
			statementNum++;
			changeStatement();
		}
	};

	var countAnswers = function() {
		totalCounted = {};
		bestParties = [];
		Questions:
		for (var i = 0; i < subjects.length; i++) {
			for (var j = 0; j < subjects[i].parties.length; j++) {
				var party = subjects[i].parties[j].name;
				var opinion = subjects[i].parties[j].position;
				if (answers[i] == 'skip') {
					continue Questions;
				}
				if (totalCounted[party] === undefined) {
					totalCounted[party] = 0;
				}
				if (answers[i] === opinion) {
					totalCounted[party] += 1;
				}
			}
		}
		
		for (i = 0; i < 3; i++) {
			var tmpArray = [];
			for (var name in totalCounted) {	
				tmpArray.push(totalCounted[name]);
			}
			var max = Math.max(...tmpArray);
			console.log(max);
			var tmpArray2 = [];
			for (name in totalCounted) {	
				if (totalCounted[name] == max) {
					tmpArray2.push(name);
					totalCounted[name] = ((i+1)*-1);
				}
			}
			bestParties.push(tmpArray2);
		}
		console.log(totalCounted);
		console.log(bestParties);
	};

	var clearClass = function() {
		document.getElementById('pro').className = '';
		document.getElementById('contra').className = '';
		document.getElementById('skip').className = '';
		document.getElementById('ambivalent').className = '';
	};

	var back = function() {
		var last = answers.pop();
		clearClass();
		if (statementNum > 0 && statementNum < subjects.length) {
			statementNum--;
			document.getElementById(last).className = 'lastAnswer';
			changeStatement();
		} else if (statementNum === subjects.length) {
			statementNum--;
			document.getElementById('answerContainer').style.display = 'inline';
			document.getElementById(last).className = 'lastAnswer';
			changeStatement();
		} else {
			document.getElementById('start').style.display = 'inline';
			document.getElementById('answerContainer').style.display = 'none';
			document.getElementById('back').style.display = 'none';
			title.style.display = 'none';
			statement.style.display = 'none';
		}
	};

	var start = function() {
		document.getElementById('answerContainer').style.display = 'inline';
		document.getElementById('back').style.display = 'inline';
		document.getElementById('start').style.display = 'none';
		title.style.display = 'inline';
		statement.style.display = 'inline';
		changeStatement();
	};

	var init = (function() {
		document.getElementById('start').onclick = function(){start();};
		document.getElementById('pro').onclick = function(){answered('pro');};
		document.getElementById('ambivalent').onclick = function(){answered('ambivalent');};
		document.getElementById('contra').onclick = function(){answered('contra');};
		document.getElementById('skip').onclick = function(){answered('skip');};
		document.getElementById('back').onclick = function(){back();};
	})();
})();