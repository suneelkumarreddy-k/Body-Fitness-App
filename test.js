try {
	function reProgram() {

		if (typeof(Storage) !== "undefined") {

			if (localStorage.length > 1) {

				//alert(localStorage.getItem("rpm"));
				const fdte = new Date();
				let day = fdte;
				let arObj = [];
				let tdy = false;
				for (i = 0; i < localStorage.length; i++) {
					let key = localStorage.key(i);
					const dte = new Date(key);
					if ((dte.constructor.toString().indexOf("Date") > -1)) {
						//alert(key);


						if (dte < day) {
							let jsnObj = JSON.parse(localStorage.getItem(key));
							arObj.push(jsnObj); //alert(jsnObj.workout);
						}

						if (dte.toLocaleDateString() === day.toLocaleDateString()) {
							tdy = true; //alert(tdy);
						}
					}
				}

				if (!tdy) {
					//alert(arObj.length);
					arObj = arObj.sort(function(a, b) {
						var dateA = new Date(a.date).getTime();
						var dateB = new Date(b.date).getTime();
						return dateA < dateB ? 1 : -1; // ? -1 : 1 for ascending/increasing order
					});
					let flObj = [];
					let pdy = new Date(arObj[0].date).getDate();
					//alert("pdy " + arObj.length);
					for (i = 0; i < arObj.length; i++) {
						let dy = new Date(arObj[i].date).getDate();
						//alert(dy);
						if (dy == pdy) {
							flObj.push(arObj[i]);
							//alert(arObj[i]);
						}
					}
					//alert(flObj.length);
					flObj = flObj.sort(function(a, b) {
						var dateA = new Date(a.date).getTime();
						var dateB = new Date(b.date).getTime();
						return dateA < dateB ? -1 : 1; // ? -1 : 1 for ascending/increasing order
					});

					document.getElementById("rps").value = flObj[0].reps;
					document.getElementById("sts").value = flObj[0].sets;
					document.getElementById("spn").value = flObj[0].span;
					document.getElementById("rst").value = flObj[0].rest;
					document.getElementById("wt").value = flObj[0].workout;
				}
			}
		}
	}

	function routine() {
		let dyRe = document.getElementById("chkRe");
		if (dyRe.checked) {
			localStorage.rpm = "true";
		} else {
			localStorage.rpm = "false";
		}
	}

	function random() {
		let wtRe = document.getElementById("chkRm");
		if (wtRe.checked) {
			localStorage.wre = "true";
		} else {
			localStorage.wre = "false";
		}
	}

	function ldPgm() {
		let dyRe = document.getElementById("chkRe");
		let wtRe = document.getElementById("chkRm");
		if (localStorage.getItem("rpm") == "true") {
			dyRe.checked = true;
			reProgram();
		} else {
			dyRe.checked = false;
		}
		if (localStorage.getItem("wre") == "true") {
			wtRe.checked = true;
		} else {
			wtRe.checked = false;
		}
	}

	function pump() {
		if (Number(document.getElementById("rps").value) >= 1 && Number(document.getElementById("sts").value) >= 1 && Number(document.getElementById("spn").value) >= 1) {
			let inpt = (function ask() {
				var n = prompt('Number from -100 to 100:');
				return n.trim() == "" || isNaN(n.trim()) || +n > 100 || +n < -100 ? ask() : n;
			}());
			if (Number(inpt) >= 1) {

				let repS = Number(document.getElementById("rps").value) * Number(inpt) / 100;
				repS += Number(document.getElementById("rps").value);
				document.getElementById("rps").value = Math.round(repS);
				let setS = Number(document.getElementById("sts").value) * Number(inpt) / 100;
				setS += Number(document.getElementById("sts").value);
				document.getElementById("sts").value = Math.round(setS);
				let spaN = Number(document.getElementById("spn").value) * Number(inpt) / 100;
				spaN += Number(document.getElementById("spn").value);
				document.getElementById("spn").value = Math.round(spaN);
				alert(inpt + "% Volume Pumped");
			} else if (Number(inpt) <= -1) {

				let repS = Number(document.getElementById("rps").value);
				repS = repS + (Number(document.getElementById("rps").value) * Number(inpt) / 100);
				document.getElementById("rps").value = Math.round(repS);
				let setS = Number(document.getElementById("sts").value);
				setS = setS + Number(document.getElementById("sts").value) * Number(inpt) / 100;
				document.getElementById("sts").value = Math.round(setS);
				let spaN = Number(document.getElementById("spn").value);
				spaN = spaN + Number(document.getElementById("spn").value) * Number(inpt) / 100;
				document.getElementById("spn").value = Math.round(spaN);
				alert(inpt + "% Volume Dumped");
			}
		}
	}

	function rstLog() {
		if (typeof(Storage) !== "undefined") {
			if (localStorage.length > 0) {
				let cMsg = "Clear the Log ?";
				if (confirm(cMsg)) {
					localStorage.clear();
					logRead();
				}
			}
		} else {
			alert("Outdated Browser");
		}
	}

	function delTbl() {
		var table = document.getElementById("logTbl");
		var rowCount = table.rows.length;
		for (var i = rowCount - 1; i > 0; i--) {
			table.deleteRow(i);
		}
		return table;
	}

	function logRead() {
		//alert(localStorage.length);
		if (typeof(Storage) !== "undefined") {
			if (localStorage.length > 0) {
				// Code for localStorage/sessionStorage.
				var table = delTbl();
				//const fdte = new Date();
				let day = new Date();
				let arObj = [];
				for (i = 0; i < localStorage.length; i++) {
					let key = localStorage.key(i);
					const dte = new Date(key);
					if ((dte.constructor.toString().indexOf("Date") > -1)) {


						day.setDate(day.getDate() - 6);

						if (dte >= day) {

							let jsnObj = JSON.parse(localStorage.getItem(key));
							arObj.push(jsnObj);

						}
					}
				}
				arObj = arObj.sort(function(a, b) {
					var dateA = new Date(a.date).getTime();
					var dateB = new Date(b.date).getTime();
					return dateA < dateB ? 1 : -1; // ? -1 : 1 for ascending/increasing order
				});

				for (i = 0; i < arObj.length; i++) {

					var row = table.insertRow(i + 1);
					var cell1 = row.insertCell(0);
					var cell2 = row.insertCell(1);
					cell1.innerText = "Workout = " + arObj[i].workout;
					cell1.innerText += " ¦¦ Reps (n) Sets (n) Span (s) Rest (s) =";
					cell1.innerText += " " + arObj[i].reps + " " + arObj[i].sets + " " + arObj[i].span + " " + arObj[i].rest;
					cell1.innerText += " ¦¦ Date = " + arObj[i].date;
					cell2.innerText = arObj[i].date;

					function singleClick(obj) {
						if (!btnRst.disabled) {
							if (confirm("Add?")) {
								let nCell = obj.nextElementSibling;
								let wDta = JSON.parse(localStorage.getItem(nCell.innerText));
								document.getElementById("wt").value = wDta.workout;
								document.getElementById("rps").value = wDta.reps;
								document.getElementById("sts").value = wDta.sets;
								document.getElementById("spn").value = wDta.span;
								document.getElementById("rst").value = wDta.rest;
								alert("Workout Planned");
								let elt = document.getElementById("btnSma");
								secOps(elt);
								//elt.scrollIntoView();
								//navigator.vibrate(200);
							}
						}
					}

					function doubleClick(obj) {
						if (!btnRst.disabled) {
							let nCell = obj.nextElementSibling;
							if (confirm("Remove?")) {
								localStorage.removeItem(nCell.innerText);
								logRead();
							}
						}
					}

					var clickCount = 0;

					cell1.addEventListener('click', function() {
						let ele = this;
						clickCount++;
						if (clickCount === 1) {
							singleClickTimer = setTimeout(function() {
								clickCount = 0;
								singleClick(ele);
							}, 400);
						} else if (clickCount === 2) {
							clearTimeout(singleClickTimer);
							clickCount = 0;
							doubleClick(ele);
						}
					}, false);
					cell2.style.display = 'none';
				}
			} else {
				delTbl();
			}
		} else {
			alert("Outdated Browser");
		}
	}
	logRead();

	function logEntry() {
		if (typeof(Storage) !== "undefined") {
			// Code for localStorage/sessionStorage.

			let dte = new Date();
			// JSON object
			const data = {
				"workout": document.getElementById("wrt").innerText,
				"reps": document.getElementById("reps").innerText,
				"sets": document.getElementById("sets").innerText,
				"span": document.getElementById("span").innerText,
				"rest": document.getElementById("rest").innerText,
				"date": String(dte)
			};
			let jsn = JSON.stringify(data);

			localStorage.setItem(dte, jsn);
			//alert(jsn);
		} else {
			alert("Outdated Browser");
		}
	}



	function share() {
		if (navigator.share) {
			let lnk = "?pattern=";
			let reps = document.getElementById("reps").innerText;
			let sets = document.getElementById("sets").innerText;
			let span = document.getElementById("span").innerText;
			let rest = document.getElementById("rest").innerText;
			lnk += reps + "-" + sets + "-" + span + "-" + rest;
			let wrk = document.getElementById("wrt").innerText;
			wrk = wrk.trim();
			wrk = wrk.split(' ').join('-');
			lnk += "&workout=" + wrk;
			navigator.share({
				title: 'Body Fitness Program App',
				url: lnk
			});
		}
	}

	function urlPrg() {
		const wlhf = window.location.href;
		if (wlhf.includes('?pattern=') && wlhf.includes('&workout=')) {
			var inptPn = window.location.href.match(/\?pattern=(.*)&/);
			var inptWt = window.location.href.match(/\&workout=(.*)/);
			//alert(Array.isArray(inptWt) + " len: " + inptWt.length + " 0: "+inptWt[0] + " 1: " +inptWt[1]);
			inptPn = inptPn[1];
			inptPn = inptPn.split('-');
			document.getElementById("rps").value = inptPn[0];
			document.getElementById("sts").value = inptPn[1];
			document.getElementById("spn").value = inptPn[2];
			document.getElementById("rst").value = inptPn[3];
			inptWt = inptWt[1];
			inptWt = inptWt.split('-').join(' ');

			//document.getElementById("wp").value = inptPn.length > 0 ?  inptPn : "";
			document.getElementById("wt").value = inptWt.length > 0 ? inptWt : "";
			//p(document.getElementById("wp")); 
			//pgm();
		} else {
			ldPgm();
		}
	}
	urlPrg();

	function grtMsg() {
		var myDate = new Date();
		var hrs = myDate.getHours();

		var greet;

		if (hrs < 12)
			greet = 'Good Morning';
		else if (hrs >= 12 && hrs < 17)
			greet = 'Good Afternoon';
		else if (hrs >= 17 && hrs <= 24)
			greet = 'Good Evening';

		if (window.speechSynthesis) {
			window.speechSynthesis.speak(new SpeechSynthesisUtterance(greet));
			alert(greet);
		} else
			alert(greet);
	}
	grtMsg();
	// Randomize workout sets
	function rndWrt() {

		var wte = document.getElementById("wt").value;
		let wv = wte.split(",");
		let sg = "";
		let i = 0;
		while (wv[i]) {
			if (Number.isInteger(Number(wv[i]))) {
				sg += "#";
			} else {
				sg += wv[i] + " ";
			}
			i++;
		}
		sg = sg.split("#");
		sg.pop();
		sg = Array.isArray(sg) && (sg.length > 0) ? sg.sort(() => Math.random() - 0.5) : wte;
		if (Array.isArray(sg)) {
			i = 0;
			let rz = [];
			while (sg[i]) {
				rz.push(String(sg[i]).trim());
				rz.push(i + 1);
				i++;
			}
			//alert("Array: " + Array.isArray(rz) + " len: "+rz.length+" data: "+rz);
			document.getElementById("wt").value = rz;
		}

	}

	/*function p(obj) {
		if(obj.id == "wp" && obj.value != "") {
			let wp = document.getElementById("wp").value;
			wp = wp.trim();
			const rsr = wp.split(" ");
			document.getElementById("rps").value = rsr[0];
			document.getElementById("sts").value = rsr[1];
			document.getElementById("spn").value = rsr[2];
			document.getElementById("rst").value = rsr[3];
		} else if(obj.id == "wt") {
			document.getElementById("wp").value = document.getElementById("rps").value + " " + document.getElementById("sts").value + " " + document.getElementById("spn").value + " " + document.getElementById("rst").value;
		}
	}*/

	function f(obj) {
		if (obj.id == "wp" && obj.value == "") {
			window.speechSynthesis.speak(new SpeechSynthesisUtterance('Enter Workout Pattern'));
		} else if (obj.id == "wt" && obj.value == "") {
			window.speechSynthesis.speak(new SpeechSynthesisUtterance('Enter Workout'));
		}
	}


	function secOps(obj) {
		if (obj.id === "btnPrm") {
			let secSa = document.getElementById("schema");
			let secTr = document.getElementById("tracker");
			let secLg = document.getElementById("log");

			secSa.style.display = "none";
			secLg.style.display = "none";
			secTr.style.display = "block";
			secTr.scrollIntoView();
		} else if (obj.id === "btnSma") {
			let secSa = document.getElementById("schema");
			let secTr = document.getElementById("tracker");
			let secLg = document.getElementById("log");
			secLg.style.display = "none";
			secTr.style.display = "none";
			secSa.style.display = "block";
			secSa.scrollIntoView();
		} else {
			let secSa = document.getElementById("schema");
			let secTr = document.getElementById("tracker");
			let secLg = document.getElementById("log");

			secTr.style.display = "none";
			secSa.style.display = "none";
			secLg.style.display = "block";
			secLg.scrollIntoView();
		}
	}

	function pgm() {
		//alert();
		let wtRe = document.getElementById("chkRm");
		if (localStorage.getItem("wre") == "true") {
			wtRe.checked = true;
			rndWrt();
		} else {
			wtRe.checked = false;
		}
		var start = performance.now();
		//let wp = document.getElementById("wp").value;
		var wt = document.getElementById("wt").value;
		wt = wt.split(',').filter(s => String(s).trim());
		//wp = wp.trim();

		document.getElementById("wrt").innerText = wt;
		document.getElementById("reps").innerText = document.getElementById("rps").value;
		document.getElementById("sets").innerText = document.getElementById("sts").value;
		document.getElementById("span").innerText = document.getElementById("spn").value;
		document.getElementById("rest").innerText = document.getElementById("rst").value;
		var end = performance.now();
		let wd = Number(document.getElementById("sts").value) * (Number(document.getElementById("spn").value) + Number(document.getElementById("rst").value));
		document.getElementById("wd").innerText = wd;
		document.getElementById("rem").innerText = 0;
		document.getElementById("per").innerText = " 0%";
		document.getElementById("exe").innerText = "😎";
		document.getElementById("wtrt").value = document.getElementById("wtsn").value = document.getElementById("wsn").innerText = document.getElementById("wkr").innerText = document.getElementById("ws").value = 0;
		var wpn = end - start;
		window.speechSynthesis.cancel();
		window.speechSynthesis.speak(new SpeechSynthesisUtterance('Programmed'));
		alert("Programmed");
		//var elmnt = document.getElementById("exe");
		//elmnt.scrollIntoView();
		secOps(document.getElementById("btnPrm"));
	}
	//document.getElementById("spWt").disabled = true;
	let wrktSpn;

	function start() {
		//alert("Started");
		let reps = document.getElementById("reps").innerText;
		let sets = document.getElementById("sets").innerText;
		let span = document.getElementById("span").innerText;
		let rest = document.getElementById("rest").innerText;
		let wrkTotal = sets * (Number(span) + Number(rest));
		if (wrkTotal >= 4) {
			window.speechSynthesis.cancel();
			document.getElementById("spWt").disabled = false;
			document.getElementById("btnSma").disabled = true;
			document.getElementById("btnLog").disabled = true;
			document.getElementById("stWt").disabled = true;
			
			document.getElementById("shre").disabled = true;
			let wrkTtl = 0;
			let spnCnt = 0;
			let rstCnt = 0;
			document.getElementById("wtsn").max = span;
			document.getElementById("wtrt").max = rest;
			document.getElementById("ws").max = wrkTotal;
			document.getElementById("wtrt").value = document.getElementById("wtsn").value = 0;
			wrktSpn = setInterval(strtSpn, 1000);
			let spnCt = 0;
			let setCnt = 0;
			var wte = String(document.getElementById("wrt").innerText).split(",").filter(e => String(e).trim());
			let wv = wte;
			let sg = "";
			let i = 0;
			while (wv[i]) {
				if (Number.isInteger(Number(wv[i]))) {
					sg += "#";
				} else {
					sg += wv[i] + " ";
				}
				i++;
			}
			sg = sg.split("#");
			sg.pop();
			sg = Array.isArray(sg) && (sg.length > 0) ? sg : wte;
			let mge = Array.isArray(sg) ? ("Do " + sg[0]) : ("Do " + sg);
			mge += reps > 0 ? (" " + reps + " Reps") : "";
			//alert(Array.isArray(sg) +" len: "+sg.length + " data: " + sg);
			window.speechSynthesis.speak(new SpeechSynthesisUtterance(mge));
			document.getElementById("exe").innerText = (Array.isArray(sg) ? sg[0] : sg) + ", " + (setCnt + 1);

			function strtSpn() {
				if (wrkTtl == wrkTotal) {
					stpTkr();
					logEntry();
					logRead();
					window.speechSynthesis.speak(new SpeechSynthesisUtterance('Workout Completed'));

				} else {
					wrkTtl++;

					if (spnCnt == span && spnCt <= span * sets && rest > 0) {
						rstCnt++;
						document.getElementById("wtrt").value = document.getElementById("wkr").innerText = rstCnt;
						if (rest - rstCnt <= 3 && rest - rstCnt >= 1 && setCnt != sets) {

							window.speechSynthesis.speak(new SpeechSynthesisUtterance(String(rstCnt - rest).replace('-', '')));
						}
						if (rstCnt == rest && wrkTtl != wrkTotal) {
							spnCnt = 0; //setCnt++;
							//document.getElementById("wtrt").value = 0;
							//const set = wv.slice(wv.indexOf(setCnt),wv.indexOf(setCnt+1));
							//alert(sg[setCnt]);
							let mse = (Array.isArray(sg) && (sg.length > 1)) ? sg[setCnt] : (Array.isArray(sg) && (sg.length <= 1)) ? sg[0] : wte;
							mse = mse == undefined ? "" : mse;
							mse += reps > 0 ? (" " + reps + " Reps") : "";
							window.speechSynthesis.speak(new SpeechSynthesisUtterance(mse));
							document.getElementById("exe").innerText = ((Array.isArray(sg) && (sg.length > 1)) ? sg[setCnt] : (Array.isArray(sg) && (sg.length <= 1)) ? sg[0] : wte) + ", " + (setCnt + 1);
						}

					} else if (span * sets > 0) {
						spnCnt++;
						document.getElementById("wtsn").value = document.getElementById("wsn").innerText = spnCnt;
						spnCt++;
						if (spnCnt == span && wrkTtl != wrkTotal) {
							setCnt++;
							rstCnt = 0;
							//document.getElementById("wtsn").value = 0;
							//let rstMsg = rest > 0 ? "Rest" : "No rest";
							if (rest > 0) {
								let msge = rest + " seconds rest";
								window.speechSynthesis.speak(new SpeechSynthesisUtterance(msge));
								document.getElementById("exe").innerText = msge;
							} else if (rest * sets <= 0) {
								spnCnt = 0;
								// document.getElementById("wtsn").value = spnCnt+1;
								let mse = (Array.isArray(sg) && (sg.length > 1)) ? sg[setCnt] : (Array.isArray(sg) && (sg.length <= 1)) ? sg[0] : wte;
								mse = mse == undefined ? "" : mse;
								mse += reps > 0 ? (" " + reps + " Reps") : "";
								window.speechSynthesis.speak(new SpeechSynthesisUtterance(mse));
								document.getElementById("exe").innerText = ((Array.isArray(sg) && (sg.length > 1)) ? sg[setCnt] : (Array.isArray(sg) && (sg.length <= 1)) ? sg[0] : wte) + ", " + (setCnt + 1);
							}
						}

					}
					document.getElementById("rem").innerText = wrkTotal - wrkTtl;
					document.getElementById("ws").value = wrkTtl; // meter
					document.getElementById("per").innerText = " " + Math.round((wrkTtl / wrkTotal) * 100) + "%";
				}
			} //function strtSpn()
		} else {
			navigator.vibrate(200);
			var elmnt = document.getElementById("sa");
			elmnt.scrollIntoView();
		}
	}

	function stop() {
		if (!document.getElementById("spWt").disabled) {
			//alert("stop");
			stpTkr();
			window.speechSynthesis.speak(new SpeechSynthesisUtterance('Workout Stopped'));
		}
	}

	function stpTkr() {
		clearInterval(wrktSpn);
		
		document.getElementById("spWt").disabled = true;
		document.getElementById("stWt").disabled = false;
		document.getElementById("btnLog").disabled = false;
		document.getElementById("btnSma").disabled = false;
		
		document.getElementById("shre").disabled = false;
	}
} catch (err) {
	alert(err.message);
}
/*function plySpn() {
  var x = document.createElement("AUDIO");
if (x.canPlayType("audio/mpeg")) { 
x.setAttribute("src","horse.mp3");
  } else {
    x.setAttribute("src","horse.ogg");
  }
  x.play();
}*/
