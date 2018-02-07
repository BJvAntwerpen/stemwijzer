var stemwijzerModule = (function() {
	var statementNum = -1;
	var answers = [];
	var title = document.getElementById('Title');
	var statement = document.getElementById('statement');

	/*var callFunction = function(action, arguments = [], context = window) {
		var args = Array.prototype.slice.call(arguments);
		var nameSpaces = action.split('.');
		var func = nameSpaces.pop();
		for(var i = 0; i < nameSpaces.length; i++) {
			context = context[nameSpaces[i]];
		}
		return context[func].apply(context, args);
	};*/

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
		if (statementNum === 29) {
			btns = document.getElementsByTagName('button');
			for (var i = 0; i < btns.length; i++) {
				btns[i].style.display = 'none';
			}
			title.style.display = 'none';
			statement.innerHTML = 'je bent klaar';
		} else {
			statementNum++;
			changeStatement();
		}
	};

	var back = function() {
		answers.pop();
		statementNum--;
		if (statementNum > -1) {
			changeStatement();
		} else {
			btns = document.getElementsByTagName('button');
			for (var i = 0; i < btns.length; i++) {
				if (btns[i].id == 'start') {
					btns[i].style.display = 'inline';
				} else {
					btns[i].style.display = 'none';
				}
			}
			title.style.display = 'none';
			statement.style.display = 'none';
		}
	};

	var start = function() {
		var btns = document.getElementsByTagName('button');
		for (var i = 0; i < btns.length; i++) {
			if (btns[i].id == 'start') {
				btns[i].style.display = 'none';
			} else {
				btns[i].style.display = 'inline';
			}
		}
		title.style.display = 'inline';
		statement.style.display = 'inline';
		changeStatement();
	};

	var init = (function() {
		document.getElementById('start').onclick = function(){start();};
		document.getElementById('pro').onclick = function(){answered('pro');};
		document.getElementById('neither').onclick = function(){answered('neither');};
		document.getElementById('con').onclick = function(){answered('con');};
		document.getElementById('skip').onclick = function(){answered('skip');};
		document.getElementById('back').onclick = function(){back();};
	})();
})();