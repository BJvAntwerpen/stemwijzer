var stemwijzerModule = (function() {
	var statementNum = -1;
	var answers = [];
	var totalCounted = {};
	var bestParties = [];
	var checkedBox = [];
	var title = document.getElementById('Title');
	var statement = document.getElementById('statement');
	var form = document.getElementById('formContainer');
	var contentForm = document.getElementById('weight');
	var inputLength = document.getElementsByTagName('input');

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
		console.log(statementNum);
		if (statementNum === (subjects.length -1)) {
			statementNum++;
			document.getElementById('answerContainer').style.display = 'none';
			title.innerHTML = 'Je bent klaar';
			statement.innerHTML = 'welke vragen moeten meer gewicht hebben?:<br>';
			if ((document.getElementsByTagName('input')).length == 0) {
				genInputs();
			}
			form.style.display = 'inline';
		} else {
			statementNum++;
			changeStatement();
		}
	};

	var countAnswers = function() {
		statementNum++;
		form.style.display = 'none';
		totalCounted = {};
		bestParties = [];
		for (var i = 0; i < inputLength.length; i++) {
			if (inputLength[i].checked) {
				checkedBox[i] = true;
			} else {
				checkedBox[i] = false;
			}
		}
		Questions:
		for (i = 0; i < subjects.length; i++) {//question
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
					if (checkedBox[i] == true) {
						totalCounted[party] += 2;
					} else {
						totalCounted[party] += 1;
					}
				}
			}
		}

		statement.innerHTML = 'Dit zijn de beste matches:<br>'
		for (i = 0; i < 3; i++) {
			var tmpArray = [];
			for (var name in totalCounted) {	
				tmpArray.push(totalCounted[name]);
			}
			var max = Math.max(...tmpArray);
			console.log(max);
			bestParties = [];
			statement.style.display = 'inline';
			statement.innerHTML += '' + (i+1) + '. ';
			for (name in totalCounted) {	
				if (totalCounted[name] == max) {
					bestParties.push(name);
					totalCounted[name] = ((i+1)*-1);
				}
			}
			statement.innerHTML += bestParties.join(', ');
			calcPercent(max);
		}
	};

	var calcPercent = function(count) {
		var percent = 0;
		var maxd = subjects.length;
		var inputLength = document.getElementsByTagName('input');
		for (var i = 0; i < inputLength.length; i++) {
			if (inputLength[i].checked == true) {
				maxd += 1;
			}
		}
		percent = (count/maxd*100).toFixed(1);
		statement.innerHTML += ': ' + percent + '%<br>';
		console.log(percent);
	};

	var clearClass = function() {
		document.getElementById('pro').className = '';
		document.getElementById('contra').className = '';
		document.getElementById('skip').className = '';
		document.getElementById('ambivalent').className = '';
	};

	var genInputs = function() {
		for (var i = 0; i < subjects.length; i++) {
			contentForm.innerHTML += '<label>'+ subjects[i].title +'</label><input type="checkbox" name="extraWeight" value="q'+(i+1)+'"><br>';
		}
	};

	var back = function() {
		var last = answers[statementNum-1];
		clearClass();
		if (statementNum > 0 && statementNum < subjects.length) {
			statementNum--;
			document.getElementById(last).className = 'lastAnswer';
			changeStatement();
		} else if (statementNum === subjects.length) {
			statementNum--;
			document.getElementById('answerContainer').style.display = 'inline';
			form.style.display = 'none';
			document.getElementById(last).className = 'lastAnswer';
			changeStatement();
		} else if (statementNum == 0) {
			document.getElementById('start').style.display = 'inline';
			document.getElementById('answerContainer').style.display = 'none';
			document.getElementById('back').style.display = 'none';
			title.style.display = 'none';
			statement.style.display = 'none';
		} else if (statementNum > subjects.length) {
			statementNum--;
			statement.style.display = 'none';
			form.style.display = 'inline';
			for (var i = 0; i < checkedBox.length; i++) {
				inputLength[i].checked = checkedBox[i];
			}
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
		document.getElementById('next').onclick = function(){countAnswers();};
	})();
})();