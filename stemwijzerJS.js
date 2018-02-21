var stemwijzerModule = (function() {
	var statementNum = -1;//statement
	var answers = [];//your answers
	var totalCounted = {};//partyName:score
	var bestParties = [];//best parties
	var checkedBox = [];//options checked
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

	var countFinal = function() {
		statementNum++;
		statement.style.display = 'inline';
		form.style.display = 'none';
		totalCounted = countAnswers();
		bestParties = [];
		for (var i = 0; i < inputLength.length; i++) {
			if (inputLength[i].checked == true && !(inputLength[i].id == 'mainParty' || inputLength[i].id == 'secParty' || inputLength[i].id == 'normalParty')) {
				checkedBox[i] = true;
			} else if (inputLength[i].checked == true && (inputLength[i].id == 'mainParty' || inputLength[i].id == 'secParty' || inputLength[i].id == 'normalParty')) {
				checkedBox[i] = 'true';
				if (inputLength[i].id == 'mainParty') {
					var checkedParty = 'mainParty';//grote partijen
				} else if (inputLength[i].id == 'secParty') {
					var checkedParty = 'secParty';//seculiere partijen
				} else if (inputLength[i].id == 'normalParty') {
					var checkedParty = 'normalParty';//alles
				}
			} else {
				checkedBox[i] = false;
			}
		}

		statement.innerHTML = 'Dit zijn de beste matches:<br>'
		for (i = 0; i < 3; i++) {
			var tmpArray = [];
			var counter = {};
			for (var name in totalCounted) {
				if (checkedParty == 'normalParty') {
					tmpArray.push(totalCounted[name]);
					counter[name] = totalCounted[name];
				} else if (checkedParty == 'mainParty') {
					for (var j = 0; j < parties.length; j++) {
						if (name == parties[j].name) {
							if (parties[j].secular == false) {
								tmpArray.push(totalCounted[name]);
								counter[name] = totalCounted[name];
							}
						}
					}
				} else if (checkedParty == 'secParty') {
					for (var j = 0; j < parties.length; j++) {
						if (name == parties[j].name) {
							if (parties[j].secular == true) {
								tmpArray.push(totalCounted[name]);
								counter[name] = totalCounted[name];
							}
						}
					}
				}
			}
			var max = Math.max(...tmpArray);
			if (max < 0) {
				continue;
			}
			bestParties = [];
			statement.innerHTML += '' + (i+1) + '. ';
			for (name in counter) {	
				if (counter[name] == max) {
					bestParties.push(name);
					totalCounted[name] = ((i+1)*-1);
					counter[name] = ((i+1)*-1);
				}
			}
			statement.innerHTML += bestParties.join(', ');
			calcPercent(max);
		}
	};

	var countAnswers = function() {
		totalCounted = {};
		Questions:
		for (i = 0; i < subjects.length; i++) {//question
			for (var j = 0; j < subjects[i].parties.length; j++) {//loop through parties
				var partyName = subjects[i].parties[j].name;// party name
				var opinion = subjects[i].parties[j].position;// party position
				if (answers[i] == 'skip') {
					continue Questions;
				}
				if (totalCounted[partyName] === undefined) {
					totalCounted[partyName] = 0;
				}
				if (answers[i] === opinion) {
					if (checkedBox[i] === true) {
						totalCounted[partyName] += 2;
					} else {
						totalCounted[partyName] += 1;
					}
				}
			}
		}
		return totalCounted;
	};

	var calcPercent = function(count) {
		var percent = 0;
		var maxd = subjects.length;
		var inputLength = document.getElementsByTagName('input');
		for (var i = 0; i < inputLength.length; i++) {
			if (inputLength[i].checked == true && !(inputLength[i].id == 'mainParty' || inputLength[i].id == 'secParty')) {
				maxd += 1;
			}
		}
		percent = (count/maxd*100).toFixed(1);
		statement.innerHTML += ': ' + percent + '%<br>';
	};

	var clearClass = function() {
		document.getElementById('pro').className = '';
		document.getElementById('contra').className = '';
		document.getElementById('skip').className = '';
		document.getElementById('ambivalent').className = '';
	};

	var genInputs = function() {
		for (var i = 0; i < subjects.length; i++) {
			contentForm.innerHTML += '<label>'+ subjects[i].title +'</label><input type="checkbox" name="extraWeight"><br>';
		}
		contentForm.innerHTML += '<label>Standaard?</label><input type="radio" name="party" id="normalParty" checked><br>';
		contentForm.innerHTML += '<label>Grote partijen?</label><input type="radio" name="party" id="mainParty"><br>';
		contentForm.innerHTML += '<label>Seculiere partijen?</label><input type="radio" name="party" id="secParty"><br>';
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
		document.getElementById('next').onclick = function(){countFinal();};
	})();
})();