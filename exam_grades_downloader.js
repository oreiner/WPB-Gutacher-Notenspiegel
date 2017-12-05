

document.addEventListener('DOMContentLoaded', function() {

	var grade_downloader_btn = document.getElementById("grade_downloader_btn");
	var mail_btn = document.getElementById("mail_btn");
	var website_btn = document.getElementById("website_btn");

	console.log(grade_downloader_btn, mail_btn, website_btn);

	grade_downloader_btn.addEventListener("click", download_exam_grades, true);
	mail_btn.addEventListener("click", send_mail, true);
	website_btn.addEventListener("click", go_to_site, true);

}, false);

//.executeScript -> this technique is needed to access the webpage from the popup, instead of accessing the popup html itself




function download_exam_grades(){
	
	var someVar = {text: 'exam', foo: 1, bar: false};
	chrome.tabs.executeScript({
		code: '(' + function() {
			const WEBHOST_PATH = "https://www.wpbgutachter.xyz/"; 
			var frames_array = document.body.getElementsByTagName("frame");
			var exams_page = frames_array.detail.contentDocument;
			//the relevent frame is named "detail" -> and is also an object property "detail"
			var title = exams_page.getElementsByTagName('h1')[0].innerHTML;
			if(title == "Prüfungsergebnisse"){
				window.alert("Das Plugin lädt jetzt die Ergebnisse runter. Das kann ein bisschen dauern.\nBitte \"OK\" klicken und etwas Geduld haben, es erscheint eine weitere Meldung!");
				var exams_table = exams_page.getElementsByClassName("list")[2];
				var exams_table_links = exams_table.getElementsByTagName('a');
				var FMP = {}
				var FMP_count = 0;
				for(var i=0; i<exams_table_links.length; i+=3){ //every third link in the table is the actuall link 
					var exam_string = exams_table_links[i].innerText; 
					if(exam_string.startsWith("FMP")) { 
						FMP[FMP_count] = {name:"", url:"", semester:"", type:"", grades:""}; 
						FMP[FMP_count].name = exams_table_links[i].innerText.replace("FMP - ","")   .replace(" - Prüfung",""); 
						FMP[FMP_count].url = exams_table_links[i].href;
						FMP[FMP_count].semester = exams_table_links[i].parentNode.previousElementSibling.innerHTML;
						FMP_count++; 
						}
				}
				for(var i=0; i<FMP_count; i++){	
					var xhttp;
					xhttp = new XMLHttpRequest();
					 
					xhttp.open("GET", FMP[i].url, false);
					xhttp.onreadystatechange = function() {
						if (this.readyState == 4 && this.status == 200) {
									var query_content = this.responseText;
									//snip snip snip. query_content is a string of the html of the popup page so find the location of the next link (stats) in it
									var stats_link_index = query_content.indexOf("Details zu der statistischen Auswertung der Pr&uuml;fungsergebnisse");
									var stats_link = query_content.slice(stats_link_index-145,stats_link_index-81);
									var stats_link = stats_link.replace(/&amp;/g,"&");
									//console.log(stats_link_index +"  "+stats_link);
									
									//now go to statistics page and harvest grades
									var xhttp2;
									xhttp2 = new XMLHttpRequest();
									xhttp2.open("GET", "https://klips2.uni-koeln.de/co/"+stats_link, false);
									xhttp2.onreadystatechange = function() {
										if (this.readyState == 4 && this.status == 200) {
											var stats_content = this.responseText;
											//check if FB or QB. ~.indexOf is a trick. when not found than -1 turns to null
											if(~stats_content.indexOf(" K. ,  1.0 1 Punkt")){
												var grade_index = [" K. ,  4.0 4 Punkte", " K. ,  3.0 3 Punkte", " K. ,  2.0 2 Punkte",  " K. ,  1.0 1 Punkt", " K. ,   .0 0 Punkte", " K. ,  .0 X Nicht erschienen"];
												FMP[i].type = "Querschnittsblock";
											} else {
												var grade_index = [" K. ,  1.0 sehr gut", " K. ,  2.0 gut", " K. ,  3.0 befriedigend", " K. ,  4.0 ausreichend", " K. ,  5.0 nicht ausreichend", " K. ,  5.0 X Nicht erschienen"];
												FMP[i].type = "Fachblock";
											}
											var grades = [];
											for(var j=0; j<grade_index.length; j++){ 
												grade_index[j] = stats_content.indexOf(grade_index[j]);
												grades[j] = stats_content.slice(grade_index[j]-4,grade_index[j]);
												grades[j] = grades[j].replace("=\"","");
												grades[j] = parseInt(grades[j].replace(",",""));
												if (isNaN(grades[j]) || !isset(grades[j]) || grades[j]=="") grades[j]=0;	
												//console.log((grades[j]));
											}
											if((/[^0]/).exec(grades.join(""))) {FMP[i].grades = grades;} //only saves grades if they arn't all zeros (filter out KFs and such)
											if(FMP[i].name.trim().endsWith("wissenschaftliches Projekt")) { FMP[i].grades = "";} //filter out WissPros bei changing grades to undefined, then they wont send
											/////////
											console.log("sending to site");
											//console.log(FMP[i]);
											var fach = FMP[i].name;
											var semester = FMP[i].semester;
											var typ = FMP[i].type;
											var sehr_gut_4_punkte = FMP[i].grades[0];
											var gut_3_punkte = FMP[i].grades[1];
											var befriedigend_2_punkte = FMP[i].grades[2];
											var ausreichend_1_punkt = FMP[i].grades[3];
											var nicht_ausreichend_0_punkte = FMP[i].grades[4];
											if(isset(FMP[i].grades[5])){ 
												var nicht_erschienen = FMP[i].grades[5]; 
											} else{
												var nicht_erschienen = 0;
											}
											if(typ == "Querschnittsblock"){
												var durchschnitt = ((sehr_gut_4_punkte*4+gut_3_punkte*3+befriedigend_2_punkte*2+ausreichend_1_punkt*1+nicht_ausreichend_0_punkte*0)/(sehr_gut_4_punkte+gut_3_punkte+befriedigend_2_punkte+ausreichend_1_punkt+nicht_ausreichend_0_punkte)).toFixed(2);
											} else if(typ == "Fachblock"){
												var durchschnitt = ((sehr_gut_4_punkte*1+gut_3_punkte*2+befriedigend_2_punkte*3+ausreichend_1_punkt*4+nicht_ausreichend_0_punkte*5)/(sehr_gut_4_punkte+gut_3_punkte+befriedigend_2_punkte+ausreichend_1_punkt+nicht_ausreichend_0_punkte)).toFixed(2);
											}
											var params = "submit=1"
												+"&Fach="+fach
												+"&Semester="+semester
												+"&Typ="+typ 
												+"&sehr_gut_4_punkte="+sehr_gut_4_punkte 
												+"&gut_3_punkte="+gut_3_punkte 
												+"&befriedigend_2_punkte="+befriedigend_2_punkte 
												+"&ausreichend_1_punkt="+ausreichend_1_punkt 
												+"&nicht_ausreichend_0_punkte="+nicht_ausreichend_0_punkte 
												+"&nicht_erschienen="+nicht_erschienen
												+"&durchschnitt="+durchschnitt;
												//console.log(params);
											var xhttp3;
											xhttp3 = new XMLHttpRequest();
											xhttp3.open("Post", WEBHOST_PATH+"plugin_submission.php", false);
											xhttp3.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
											xhttp3.onreadystatechange = function() {
												if (this.readyState == 4 && this.status == 200) {
													query_content = this.responseText;
													console.log(query_content);
												}
											}
											xhttp3.send(params);
											////////
											
										}
									}
									xhttp2.send();
						
									
						}
					}
					xhttp.send();
					
				}
				console.log(FMP);
				window.alert("Danke für deine Mitarbeit!\nAlle relevanten Notenspiegel wurden versendet und sollten jetzt auf wpbgutachter.xyz einsehbar sein.");
			} else {
				window.alert("Falsche Seite! Geh auf \"Prüfungsergebnisse\"");
				
			}
			
			return {success: true};
		

		
		function isset(object){
			return (typeof object !=='undefined');
		}	
			
		//was not defined inside so I copy pasted.... moved to inside of main function, add code
		function submit_to_site(exam_array){
			console.log("sending to site");
		
		}
	
	
		} + ')(' + JSON.stringify(someVar) + ');'
	}, function(results) {
		console.log(results[0]);
	});
	submit_to_site(FMP[0]);
}
	



	function send_mail(){
	window.open('mailto:wpbgutachter@gmail.com?subject=WPBgutachter-Plugin');
}

	function go_to_site(){
	window.open('http://www.wpbgutachter.xyz/plugin.php');
}


