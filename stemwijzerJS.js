var stemwijzerModule = (function() {
	var stellingNum = 0;

	/*var callFunction = function(action, arguments = [], context = window) {
		var args = Array.prototype.slice.call(arguments);
		var nameSpaces = action.split('.');
		var func = nameSpaces.pop();
		for(var i = 0; i < nameSpaces.length; i++) {
			context = context[nameSpaces[i]];
		}
		return context[func].apply(context, args);
	};*/

	var start = function() {
		btns = document.getElementsByTagName('button');
		for (var i = 0; i < btns.length; i++) {
			if (btns[i].id == 'start') {
				btns[i].style.display = 'none';
			} else {
				btns[i].style.display = 'inline';
			}
		}
		document.getElementById('Title').style.display = 'inline';
		document.getElementById('statement').style.display = 'inline';
	};

	var init = (function() {
		document.getElementById('start').onclick = function(){start();};
	})();

	return {
		//callFunction:callFunction
	};
})();