//kill <form> that distrupts the splash screen. no Idea why this works, but it does
var formdiv = document.getElementsByClassName("cotreegrid curriculaSupport");
var tblCopy = document.getElementById("tgt"); 
  //change the buttons vorklinik and klinik to work with on clicking button 
  //console.log(tblCopy.innerHTML);
if(isset(formdiv[0])) { formdiv[0].outerHTML = tblCopy.outerHTML; } // erase Form through override with formless copy
//Constants and global variables
//course-grades global variable, because Omer doens't really understand how AJAX works :( unsures all visible courses load their evaluation at once
var course_grades = ["N/A","N/A","N/A","N/A","N/A"];
const WEBHOST_PATH = "https://www.wpbgutachter.xyz/"; 
var user = ""; //trying to make the user name stick. doens't work
//text variables
var txt_keine_bilder = "Leider haben wir noch keinen Notenspiegel. Hast du einen? Dann schick uns den per E-Mail unter wpbgutacher@gmail.com";
var txt_keine_kommentare = "Noch keine Kommentare, schreib einen dazu!";
//list of courses. hardcoded, change to course_query.php?

var course_names = ["Anästhesie \"Anästhesiologische Intensivmedizin\"",
"Anästhesie \"Schmerztherapie\"",
"Arbeits-und Sozialmedizin \"Lungenfunktionsuntersuchungen - klinische Aspekte\"",
"Augenheilkunde  \"Vom Bild zur Diagnose: Bedeutung der Bildgebung in der Augenheilkunde\"",
"Bildgebende Verfahren \"Einführung in die MR-Diagnostik von Erkrankungen des Bewegungsapparates und der Wirbelsäule\"",
"Bildgebende Verfahren \"Neuroradiologie\"",
"Bildgebende Verfahren \"Radiologische Ambulanz\"",
"Bildgebende Verfahren \"Sonokurs\"",
"Bildgebende Verfahren \"Strahlenexposition und Strahlenschutz in der radiologischen Diagnostik\"",
"Bildgebende Verfahren \"Röntgen-Thorax\"",
"Chirurgie \"Molekulare Aspekte in der Chirurgischen Onkologie\"",
"Chirurgie \"Morbide Adipositas\"",
"Chirurgie \"Tipps und Tricks in der Unfallchirurgie\"",
"Doktorandenkurs",
"Einführung in die plastische Chirurgie",
"Geriatrie",
"Geschichte und Ethik der Medizin \"Ärztliche Entscheidungsfindung und Handlungsethik\"",
"Geschichte und Ethik der Medizin - Gendermedizin",
"Geschichte, Theorie und Ethik der Medizin (Lektüreseminar)",
"Geschichte, Theorie und Ethik der Medizin (Medical English - computerunterstütztes Lernen)",
"Geschichte, Theorie und Ethik der Medizin (Wie findet man medizinische Literatur?) (Schlüsselqualifikationskurs)",
"Gesundheitsökonomie \"Angewandte Klinische Forschung für Studierende und Promovierende\"",
"\"Grundlagen der medizinischen Statistik\" SCHLÜSSELQUALIFIKATIONSKURS",
"Gynäkologie",
"Gynäkologie - Zentrum Familiärer Brust-und Eierstockkrebs",
"Hals-Nasen-Ohrenheilkunde",
"\"Handchirurgie\"",
"Humangenetik \"Molekulargenetische Diagnostik und Humangenetische Beratung\"",
"Infektiologie - Herleiten statt Pauken",
"Innere Medizin \"Bronchoskopie, Lungenfunktion\"",
"Innere Medizin \"Critical Reading\"",
"Innere Medizin \"Diagnostik und Therapie solider Tumoren\"",
"Innere Medizin \"Eine interaktive Vorlesung\"",
"Innere Medizin \"EKG-Kurs\"",
"Innere Medizin \"Hämodynamik verstehen: vom Bluthochdruck bis zum kardiogenen Schock\"",
"Innere medizin \"Herzkatheter, Echo, EKG\"",
"Innere Medizin \"Internistische Fallbesprechung \"",
"Innere Medizin \"Internistische Intensiv- und Notfallmedizin\"",
"Innere Medizin \"Kardiopulmonale Hämodynamik und Pathophysiologie (inkl.Herzkathetersimulator)\"",
"Innere Medizin \"Keine Experimente? - Toolbox für Doktoranden im Labor\"",
"Innere Medizin \"Laborpraktikum:Molekulare Therapien zur Behandlung von malignen Lymphomen \"",
"Innere Medizin \"Nephrologie Intensivkurs\"",
"Innere Medizin \"Sonografie, Endoskopie\"",
"Innere Medizin \"Sportmedizin\"",
"Innere Medizin \"Start in ein wissenschaftliches Projekt in der Kardiologie\"",
"Innere Medizin \"Start in ein wissenschaftliches Projekt in der Onkologie\"",

"\"Therapie Innerer Krankheiten\"",
"Innere Medizin \"Tumorgenetik und molekulare Immunologie\"",
"Innere Medizin \"Vom Symptom zur Diagnose - Internistische Differentialdiagnosen gemeinsam entwickeln\"",
"Innere Medizin \"Weltraumphysiologie\"",
"Innere Medizin \"Zytomorphologische Diagnostik in der Hämatologie \"",
"Kinder- und Jugendpsychiatrie \"Kinder- und Jugendpsychiatrie\"",
"Kinder- und Jugendpsychiatrie \"KJP\"",
"Medizinhistorische Exkursion Paris (asugebucht!)",
"Mikrobiologie",
"Nähkurs",
"Neurochirurgie",
"Neuropathologie",
"Notfallmedizin",
"Pädiatrie \"Pädiatrie in der Praxis\"",
"Pädiatrie \"Pädiatrische Onkologie\"",
"Pädiatrie \"Spezielle Pädiatrie\"",
"Pathologie \"Allgemeine Pathologie\"",
"Pathologie \"Gynäkologische Zytologie",
"Pathologie \"Molekularbiologische Ansätze in der Diagnostik\"",
"Pharmakologie",
"Pharmakologie - Verordnungsgespräch",
"Psychiatrie \"Besonderheiten psychischer Erkrankungen im höheren Lebensalter\"",
"Psychiatrie \"Klinisch-psychiatrisches Fallseminar\"",
"Psychiatrie \"Therapeutische Strategien bei psychischen Erkrankungen\"",
"Psychosomatik \"Bindungstheoretische Aspekte der Arzt-Patient-Beziehung\"",
"Psychosomatik \"Diagnosemitteilung und Gesprächsführung mit onkologischen Patienten\"",
"HIV und sexuell übetragbare Infektionen sprechen",
"Psychosomatik \"„Niemand kann mir helfen“ – der Umgang mit schwierigen Patienten, mit denen viele Ärzte nichts zu tun haben möchten Psychoanalytisches Verstehen und Lösungsmöglichkeite",
"Psychosomatik \"Planung, Umsetzung und Publikation\"",
"Psychosomatik:Einführung in die Sexualmedizin - eine psychosomatische Perspektive",
"Publizieren in der Medizin",
"Rechtsmedizin \"ärztliches Berufsrecht\"",
"Schulter- und Ellenbogenchirurgie",
"\"Statistische Auswertung mit SPSS\" SCHLÜSSELQUALIFIKATIONSKURS",
"Translationale Pädiatrie am Beispiel der Pneumologie",
"Urologie \"Andrologie und Grundlagenforschung\"",
"Urologie \"Urologie in Speyer\"",
"Workshop Handchirurgie in Orthopädie und Unfallchirurgie",
"\"Medizinische Informatik\" SCHLÜSSELQUALIFIKATIONSKURS",
"Untersuchungskurs Orthopädie/Unfallchirurgie in Mechernich", 
"EKG Blockkurs",	
"Geschichte und Ethik der Medizin \"Ethik &amp; Onkologie: Präzisionsmedizin und Behandlungsethik\"",
"Kieferchirurgie",
"\"Bootcamp Neurologie\"",
"Bildgebende Verfahren \"Sono-Kurs\"",
"Gesundheitsökonomie \"Angewandte Klinische Forschung für Studierende und Promovierende\" (Schlüsselqualifikationskurs)",
"Bildgebende Verfahren \"Thorax-Röntgendiagnostik\""
];
var course_ids = ["a135251","a135248","a135254",
"a135258","a141909","a136525","a136530","a136531","a136529","a151677","a135316",
"a135323","a135321","a136274","a135315","a135374","a135346","a152371","a135341",
"a135343","a135342","a135356","a136273","a135334","a135333","a135381","a135318",
"a135386","a135411","a135419","a148968","a135418","a135425","a135430","a173952",
"a135417","a142567","a135429","a135427","a135424","a135421","a135426","a135420",
"a135410","a135423","a135432","a196009","a135415","a135422","a153551","a135416",
"a148971","a148972","a137391","a136261","a134810","a136283","a136313","a135250",
"a136247","a136248","a136246","a136314","a136318","a136315","a136586","a136342",
"a136360","a136358","a136359","a136369","a136370","a136372","a136371","a136368",
"a153157","a135018","a136534","a135319","a136275","a173375","a196754","a136538",
"a136306","a161002","a196744","a185903","a161031","a160579","a196735","a160926","a160923","a163226"
];
var course_list = {};
for(i=0; i<course_names.length; i++){
	//course_names[i] = htmlEscape(course_names[i]);
	course_list[course_names[i]] = course_ids[i];  
}
//Test zone
	console.log("Plugin online");


//end Test Zone		

document.addEventListener("keypress", function main() {
	var rootTbl = document.getElementsByTagName('table'); //the only table that is being searched with the code now is 5. the main "cotable"
	var tbl = rootTbl[5].getElementsByTagName('table'); //all course table that have already been opened
	for(var j =0; j<tbl.length; j++){
		if(tbl[j].getAttribute("id")>="coTable" ){ 
			var category = tbl[j].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute("class"); //div containing the blue flag
			var thead = tbl[j].getElementsByTagName('thead');
			var tbodies = tbl[j].getElementsByTagName('tbody');
			var headrows = thead[thead.length-1].getElementsByTagName('tr');
			var headcolumns = headrows[0].getElementsByTagName('th');
			var rows = tbodies[tbodies.length-1].getElementsByTagName('tr');  
			var rownum = rows.length;
			//build_wpb_table() 
			//kn32057 is Klinik WPB //kn31461 is vorklinik WPB
			/*~var.indexOf is a JS trick to make the number a TRUE/FALSE value*/

			if(~category.indexOf("kn32057") || ~category.indexOf("kn31461")){ 
				wpb_klinik_button = document.getElementById("kn32057-toggle"); //"klinik button" 
				if(isset(wpb_klinik_button)){	
					//set title bar
					if(isset(headrows) && headcolumns.length <= 5 && rows[0].getElementsByTagName('td').length > 1){ //headcolumns.length <= 5 //headcolumns.length <= 5 columns is nativly 5, more than 5 implies the injected columns are present , columns>1 when the folder has courses listed 
						//for some reason insertcell doesn't work with higher than 5(6,7,8,9) so I create the cells in reversed order.
						var newtitle7 = headrows[0].insertCell(5);
						newtitle7.outerHTML = "<th>Semesterbegleitend</th>";
						var newtitle6 = headrows[0].insertCell(5);
						newtitle6.outerHTML = "<th>Stimmen</th>";
						var newtitle5 = headrows[0].insertCell(5);
						newtitle5.outerHTML = "<th>Organisation</th>";
						var newtitle4 = headrows[0].insertCell(5);
						newtitle4.outerHTML = "<th>Klinische Relevanz</th>";
						var newtitle3 = headrows[0].insertCell(5);
						newtitle3.outerHTML = "<th>Auftreten</th>";
						var newtitle2 = headrows[0].insertCell(5);
						newtitle2.outerHTML = "<th>Didaktik</th>";
						var newtitle = headrows[0].insertCell(5);
						newtitle.outerHTML = "<th>Gesamtnote</th>";
						var newtitleKommentare = headrows[0].insertCell(5);
						newtitleKommentare.outerHTML = "<th>Kommentare</th>"; 
					}
					//inject splash-button and grades
					for(var i=0; i<rownum; i++){
						var columns = rows[i].getElementsByTagName('td');
						//columns.length <= 5 columns is nativly 5, more than 5 implies the injected columns are present
						if(columns.length <= 5 && rows[i].getAttribute("class")!=="cNoEntry"){
							var ays = rows[i].getElementsByTagName("a");
							//var KursID = ays[1].getAttribute("id"); //zweite <a href=...> beinhaltet immer das Kurs "id"
							var KursID = get_course_id(ays[1].innerHTML, course_list);
							var newcellSemesterbegleitend = rows[i].insertCell(5);
							var newcellStimmen = rows[i].insertCell(5);
							var newcellOrganisation = rows[i].insertCell(5);
							var newcellKlinischeRelevanz = rows[i].insertCell(5);
							var newcellAuftreten = rows[i].insertCell(5);
							var newcellDidaktik = rows[i].insertCell(5);
							var newcellGesamt = rows[i].insertCell(5);
							var newcellKommentare = rows[i].insertCell(5);
							//sometimes there are duplicate courses so this if is not smart enough
							//if(!(document.getElementById("splash_button_"+KursID))){
								//AJAX fetch grades if it doesn't exist yet
								var xhttp;
								xhttp = new XMLHttpRequest();
								//.open(,,false) = synchroneus. critical for the timing of the script! 
								xhttp.open("GET", WEBHOST_PATH+"grade_query.php?course="+KursID, false);
								xhttp.onreadystatechange = function() {
									if (this.readyState == 4 && this.status == 200) {
												var query_content = this.responseText;
												//query_content ist a string of the source code
												var course_grades = query_content.split("#");
												if (query_content === "Es gibt momentan ein Problem mit dem Server. Versuch es später erneut." || query_content.trim() === "" || course_grades[0] == 0.00){			
													course_grades = ["N/A","N/A","N/A","N/A","N/A"];
												}						
												//array of course_grades =  [Gesamtnote, Auftreten, Didaktik, Klinische Relevanz, Organisation, stimmen, Semesterbegleitend]
												newcellSemesterbegleitend.innerHTML = course_grades[6];
												newcellStimmen.innerHTML = course_grades[5];
												newcellOrganisation.innerHTML = course_grades[4];																
												newcellKlinischeRelevanz.innerHTML = course_grades[3];														
												newcellAuftreten.innerHTML = course_grades[2];		
												newcellDidaktik.innerHTML = course_grades[1];	
												newcellGesamt.innerHTML = course_grades[0];	
														
												splash_button = document.createElement("BUTTON");
												var btn_text = document.createTextNode("Kommentare");
												splash_button.appendChild(btn_text);
												splash_button.setAttribute("id", "splash_button_"+KursID);
												newcellKommentare.appendChild(splash_button);
												splash_button.addEventListener("click", form_style_splash_page, true);									
											
									}
								}
								xhttp.send();
							//}
						}
					}
				}
			}
			//build_Pruefung_table 
			//kn31382 is vorkl.FB //kn31342 is vorkl.KF //kn31454 is Physikum // kn31978 is klin.FB //kn31844 is klin.QB // 
			/*~var.indexOf is a JS trick to make the number a TRUE/FALSE value*/
			else if (~category.indexOf("kn31382") || ~category.indexOf("kn31342") || ~category.indexOf("kn31454") || ~category.indexOf("kn31978") || ~category.indexOf("kn31844")){
				//set title bar
				if(isset(headrows) && headcolumns.length <= 5 && rows[0].getElementsByTagName('td').length > 1/*&& get_exam_subject(ays[1]), this would inject the buttons only to subjects where I have pre-existing images*/ ){ //headcolumns.length <= 5 columns is nativly 5, more than 5 implies the injected columns are present , columns>1 when the folder has courses listed 
					var newtitle = headrows[0].insertCell(5);
					newtitle.outerHTML = "<th>Notenspiegel</th>";
					//var newtitleKommentare = headrows[0].insertCell(5);
					//newtitleKommentare.outerHTML = "<th>Kommentare</th>"; 
				}
				for(var i=0; i<rownum; i++){
					var columns = rows[i].getElementsByTagName('td');
					//columns.length <= 5 columns is nativly 5, more than 5 implies the injected columns are present 
					if(columns.length <= 5 && rows[i].getAttribute("class")!=="cNoEntry"){ 
						var ays = rows[i].getElementsByTagName("a");
						var KursID = ays[1].getAttribute("id"); //the second <a href=...> from the <td> contains in it's outerHTML the relevant Kurs "id"
						if (1/*get_exam_subject(ays[1]), this would inject the buttons only to subjects where I have pre-existing images*/){ 
							var newcellNotenspiegel = rows[i].insertCell(5);
							//var newcellKommentare = rows[i].insertCell(5);
							splash_button2 = document.createElement("BUTTON");
							var btn_text2 = document.createTextNode("Notenspiegel");
							splash_button2.appendChild(btn_text2);
							if(get_exam_subject(ays[1])){ splash_button2.setAttribute("exam_subject", get_exam_subject(ays[1]));} 
							//splash_button2.setAttribute("id",KursID);
							newcellNotenspiegel.appendChild(splash_button2);
							splash_button2.addEventListener("click", splash_histogram, true);
							//splash_button = document.createElement("BUTTON");
							//var btn_text = document.createTextNode("Kommentare");
							//splash_button.appendChild(btn_text);
							//splash_button.setAttribute("id",KursID);
							//newcellKommentare.appendChild(splash_button);
							//splash_button.addEventListener("click", form_style_splash_page, true);
						}
					}
				
				}
			}
		}
	}
},false);
		
	function isset(object){
		return (typeof object !=='undefined');
	}

//search the name of the course in my database list and get the value (id) back.
	function get_course_id(klips_course_name, course_name_array) {
		//hard coded an exception because there is a "gyn" and "gyn - bla bla"
		//if(klips_course_name.endsWith("Gynäkologie - Zentrum Familiärer Brust-und Eierstockkrebs")) return "a135333";
		for (key in course_name_array) {
			// ~var.indexOf is a JS trick to make the number a TRUE/FALSE value. too unspecific because of above //if (~klips_course_name.indexOf(key)) return course_name_array[key];
			
			if (klips_course_name.endsWith(key)) return course_name_array[key];
		}
		return 0;
	}

	
	//currently unused. to do: integrate the two fetches and build_ function?
	function fetch_image_directory(exam_subject){
		var xhttp;
		xhttp = new XMLHttpRequest();
		xhttp.open("GET", WEBHOST_PATH+"image_dir.php?exam_subject="+exam_subject, false); //false is important! makes the script wait until the grades are retrieved
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				var query_content = this.responseText;
				//query_content ist a string of the source code
				var image_list = query_content.split(",");
				if (query_content === "Database query failed." && query_content.trim() === ""){			
					image_list = [txt_keine_bilder];
				}
				return(image_list);
			}
		}
		xhttp.send();
	}

	//
	function splash_histogram(){
		exam_subject = this.getAttribute("exam_subject");
		var splash_background = document.createElement("div");
		splash_background.setAttribute("class", "pageDisabled");
		var splash_content = document.createElement("div");
		splash_content.setAttribute("class", "splash");
		var btn = document.createElement("Button");
		btn.setAttribute("class", "btn");
		var content = document.createTextNode("Schließen");
		btn.appendChild(content);
		splash_content.appendChild(btn);
		document.body.appendChild(splash_background);
		document.body.appendChild(splash_content);
		btn.addEventListener("click", function(){ 
			splash_background.style.display = "none";
			splash_content.style.display = "none";
		}, false);
		var comments_table = document.createElement("table");
		//todo:  insert text on image (CSS, add to each iteration container div to contain image+text)
		//AJAX based on SQL "image" table - works, but requires update of SQL in accordance to the image being uploaded to server
		var xhr2 = new XMLHttpRequest();
		xhr2.open("GET", WEBHOST_PATH+"image_query.php?exam_subject="+exam_subject, false);
		xhr2.onreadystatechange = function(){
			if (xhr2.readyState == 4 && xhr2.status == 200) { 
				var query_content = this.responseText;
				//query_content ist a object/array (not string!!!) of the source code
				var image_set = query_content.split(",");
				
				if (query_content === "Database query failed." || query_content.trim() === ""){			
					comments_table.innerHTML = txt_keine_bilder;
					splash_content.appendChild(comments_table);
					console.log("query_content failed: empty or Database query failed", query_content);//
				} else {
					for(i=0; i < image_set.length-1; i++){
						image_set[i] = image_set[i].replace("png", "PNG");
						var grade_histogram = document.createElement("img");
						var image_title = document.createElement("tr");
						//negative doesn't work :(
						var image_text = document.createTextNode(get_image_name(image_set[i]));
						console.log("image_text",image_text);//
						image_title.appendChild(image_text);
						grade_histogram.setAttribute("src", WEBHOST_PATH+"images/"+exam_subject+"/"+image_set[i]);
						grade_histogram.setAttribute("class", "grades_histogram");
						comments_table.appendChild(image_title);
						comments_table.appendChild(grade_histogram);
						splash_content.appendChild(comments_table);
					}
				}
			}
		}
		xhr2.send();
		
		//alternative version of AJAX
		//DOENST WORK BECAUSE OF FLIPPING THE WORDS ANATOMIE AND PHYSIKUM? TRY AGAIN
		//AJAX get list of images in the local host directory - DOESN'T WORK BECAUSE OF ISSUE WITH THE REMOTE PHP PAGE
		//Warning: scandir(WEBHOST_PATHimages/Physikum_Anatomie/): failed to open dir: not implemented in C:\wamp64\www\Klips_CRUD\Klips_Evaluation\public\image_dir.php on line <i>8</i>
		/*var xhttp;
		xhr = new XMLHttpRequest();
		xhr.open("GET", WEBHOST_PATH+"image_dir.php?exam_subject="+"Physikum_Anatomie");//exam_subject, false); //false is important! makes the script wait until the grades are retrieved
		xhr.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				//query_content is a string of the php page's source code
				var query_content = this.responseText;
				if (query_content === "Database query failed." && query_content.trim() === ""){			
					image_list = ["Leider haben wir keine Notenspiegeln. Wenn du einen hast, schick uns eine E-Mail!"];
				} 
				else {
				var image_list = query_content.split(",");
				console.log("before image AJAX", image_list);
				//AJAX get individual images
					for(i=0; i< image_list ; i++){
						var grade_histogram = document.createElement("img");
						var xhr2 = new XMLHttpRequest();
						xhr2.open("GET", WEBHOST_PATH+"images/"+"Physikum_Anatomie"+"Wintersemester_2015_16.png", false); //+exam_subject+"/"+image_list[i]);
						xhr2.onreadystatechange = function(){
							if (xhr2.readyState == 4 && xhr2.status == 200) { 
								grade_histogram.setAttribute("src", WEBHOST_PATH+"images/"+"Physikum_Anatomie"+"Wintersemester_2015_16.png");//+exam_subject+"/"+image_list[i]);
								grade_histogram.setAttribute("class", "grades_histogram");
								comments_table.appendChild(grade_histogram);
								splash_content.appendChild(comments_table);
							}
							console.log("during image AJAX", image_list);
						}
						xhr2.send();
						console.log("after image AJAX", image_list);
					}
				}
			}
		}
		xhr.send();
		*/
	}

	function get_image_name(str){
		str = str.trim();
		var name = str.substr(0,14);
		name += " ";
		name += str.substr(15,4);
		if(str.length > 24) { 
			name += "/";
			name += str.substr(20,2); 
		}
		return name;
	}

	//Hard coded the exam subjects. need to think of a way to overcome this. but the structure of  Klips is getting in the way
	//maybe google spreadsheet+SQL with the substring
	function get_exam_subject(KursID_HTMLobject){
		var str = KursID_HTMLobject.innerHTML;
		if (str.includes("Makroskopische/Mikroskopische Anatomie - schriftl. Äquivalenzprüfung")) { return "Physikum_Anatomie"}
		if (str.includes("Biochemie/Molekularbiologie - schriftl. Äquivalenzprüfung")) { return "Physikum_Biochemie"}
		if (str.includes("FMP - Physiologie/Physik - schriftl. Äquivalenzprüfung")) { return "Physikum_Physiologie"}
		if (str.includes("Med. Psychologie/Med. Soziologie - schriftl. Äquivalenzprüfung")) { return "Physikum_PsychSoz"}
		return 0;
	}
	
//works with new window 
	function form_style_splash_page(){
		var KursID = this.id.replace("splash_button_", ""); //changes KursID back to aXXXXXX
		//if the splash page was already generated change control it's visibility. If not, generate the splash page
		if(KursID && document.getElementById("splash_"+KursID)){
			var splash_background = document.getElementById("splash_backgroud_"+KursID);
			var splash_content = document.getElementById("splash_"+KursID);
			var opened_splash_button = document.getElementById("splash_button_"+KursID);
			opened_splash_button.addEventListener("click", function(){
				splash_background.style.display = "initial";
				splash_content.style.display = "initial";
			},true);
		} else {
			var splash_background = document.createElement("div");
			splash_background.setAttribute("class", "pageDisabled");
			splash_background.setAttribute("id", "splash_backgroud_"+KursID);
			var splash_content = document.createElement("div");
			splash_content.setAttribute("class", "splash");
			splash_content.setAttribute("id", "splash_"+KursID);		
			document.body.appendChild(splash_background);
			document.body.appendChild(splash_content);
			//Schließen Button
			var btn = document.createElement("Button");
			btn.setAttribute("class", "btn");
			var content = document.createTextNode("Schließen");
			btn.appendChild(content);
			splash_content.appendChild(btn);
			btn.addEventListener("click", function(){ 
				splash_background.style.display = "none";
				splash_content.style.display = "none";
			}, false);		

			var comments_div = document.createElement("div");
			comments_div.setAttribute("class", "comments_div");
			comments_div.setAttribute("id", "comments_div_"+KursID);
			//retrieve submition form and existing comments
			fetch_splash_content(KursID, comments_div, splash_content, true);
		}			
	}
	
//fetch grades 
	function fetch_splash_content(KursID, comments_div, splash_content, new_splash){
		var xhttp;
			xhttp = new XMLHttpRequest();
			xhttp.open("GET", WEBHOST_PATH+"index.php?course="+KursID, true);
			xhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
					var page_content = this.responseText;
					//page_content ist a string of the source code. find the comment table <table class=comments_table>...</table>
					var comments_table_location = page_content.indexOf("<form");
					var end_of_table_location = page_content.indexOf("</table>", comments_table_location);
					var cut_page_content = page_content.slice(comments_table_location, end_of_table_location+8);
					//klips does stupid stuff with forms, so switch the form to a div and make a custom button
					cut_page_content = cut_page_content.replace("form action=\"create_comment.php\" method=\"post\" class=\"new_comment_form\" id=\"comment_form\"" , "div class=\"new_comment_form\" id=\"comment_form_"+KursID+"\"");
					cut_page_content = cut_page_content.replace("/form" , "/div");
					// styling, getting rid of <br / >, but for some reason not working cut_page_content = cut_page_content.replace("<br /><input type=\"checkbox\" id=\"grade_bar_checkbox" , "<input  type=\"checkbox\" id=\"grade_bar_checkbox");						
					//make the form unique for the viewed course
					cut_page_content = cut_page_content.replace("id=\"user_name", "id=\"user_name_"+KursID);
					cut_page_content = cut_page_content.replace("id=\"Fachsemester", "id=\"Fachsemester_"+KursID);
					cut_page_content = cut_page_content.replace("id=\"WPBsemester", "id=\"WPBsemester_"+KursID);
					cut_page_content = cut_page_content.replace("comment_field_checkbox" , "comment_field_checkbox_"+KursID);
					cut_page_content = cut_page_content.replace("comment_text", "comment_text_"+KursID);
					cut_page_content = cut_page_content.replace("grade_bar_checkbox", "grade_bar_checkbox_"+KursID);
					cut_page_content = cut_page_content.replace("Didaktik_Note", "Didaktik_Note_"+KursID);
					cut_page_content = cut_page_content.replace("Auftreten_Note", "Auftreten_Note_"+KursID);
					cut_page_content = cut_page_content.replace("Klinische_Relevanz_Note", "Klinische_Relevanz_Note_"+KursID);
					cut_page_content = cut_page_content.replace("Organisation_Note", "Organisation_Note_"+KursID);				
					
					if (page_content !== "Database query failed." && page_content.trim() !== ""){
						comments_div.innerHTML = cut_page_content;
						
					} else {			
						comments_div.innerHTML = txt_keine_kommentare;
					}
					splash_content.appendChild(comments_div);
					if(new_splash) {
						create_submit_btn(KursID);
						var missbrauch_btns = comments_div.getElementsByClassName("missbrauch_button");
						for(i=0; i<missbrauch_btns.length ; i++){
							//huh why did I put this line? //missbrauch_btns[i].comment_id = missbrauch_btns[i].id.replace("missbrauch_button_","");
							missbrauch_btns[i].KursID = KursID;
							//console.log(missbrauch_btns[i]);
							missbrauch_btns[i].addEventListener("click", reportAbuse, true);
						}
					}
						
				}
			}
			xhttp.send();

	}

//submit_comment.js = insert new comment/grades

function create_submit_btn(KursID){
var submit_btn = document.createElement('button');
submit_btn.setAttribute('id', "submit_form_"+KursID);
submit_btn_text = document.createTextNode("Kommentar hinzufügen");
submit_btn.appendChild(submit_btn_text);
var comment_form = document.getElementById("comment_form_"+KursID);
comment_form.appendChild(submit_btn);
submit_btn.addEventListener("click", function control_form(){
		var username = document.getElementById("user_name_"+KursID).value;
		var fachsemester = document.getElementById("Fachsemester_"+KursID).value;
		var wpbsemester = document.getElementById("WPBsemester_"+KursID).value;
		var text_checked = document.getElementById("comment_field_checkbox_"+KursID);
		var comment_text = document.getElementById("comment_text_"+KursID).value;
		var grade_checked = document.getElementById("grade_bar_checkbox_"+KursID);
		var did_grade = document.getElementById("Didaktik_Note_"+KursID);
		var auf_grade = document.getElementById("Auftreten_Note_"+KursID);
		var kr_grade = document.getElementById("Klinische_Relevanz_Note_"+KursID);
		var o_grade = document.getElementById("Organisation_Note_"+KursID);
		var grade1 = parseFloat(did_grade.options[did_grade.selectedIndex].value);
		var grade2 = parseFloat(auf_grade.options[auf_grade.selectedIndex].value);
		var grade3 = parseFloat(kr_grade.options[kr_grade.selectedIndex].value);
		var grade4 = parseFloat(o_grade.options[o_grade.selectedIndex].value);
		if (text_checked.checked){
			if(comment_text !== ""){
				if (grade_checked.checked){
					if(grade1 && grade2 && grade3 && grade4){
						submit_comment(KursID, username, fachsemester, wpbsemester, comment_text, grade1, grade2, grade3, grade4);
					} else {
						window.alert("Bitte bei allen Kriterien eine Note vergeben oder das Häckchen beim Kontrollkästchen entfernen!");
						return false;
					}
				} else {
						submit_comment(KursID, username, fachsemester, wpbsemester, comment_text, grade1, grade2, grade3, grade4);
				}
			} else {
				window.alert("Bitte einen Kommentar schreiben, oder das Häckchen beim Kontrollkästchen entfernen!");
				return false;
			}
		} else if (grade_checked.checked){
			if(grade1 && grade2 && grade3 && grade4){
				if (text_checked.checked){
					if(comment_text !== ""){
						submit_comment(KursID, username, fachsemester, wpbsemester, comment_text, grade1, grade2, grade3, grade4);
					} else {
						window.alert("Bitte einen Kommentar schreiben, oder das Häckchen beim Kontrollkästchen entfernen!");
						return false;
					}
				} else {
					submit_comment(KursID, username, fachsemester, wpbsemester, comment_text, grade1, grade2, grade3, grade4);
				}
			} else {
				window.alert("Bitte bei allen Kriterien eine Note vergeben oder das Häckchen beim Kontrollkästchen entfernen!");
				return false;
			}
		}
		else{
			window.alert("Bitte einen Kommentar schreiben und/oder Noten vergeben!");
			return false;
		}
	}, false);
}
	
function submit_comment(KursID, user_name, Fachsemester, WPBsemester, content, Didaktik_Note, Auftreten_Note, Klinische_Relevanz_Note, Organisation_Note){
		var xhttp = new XMLHttpRequest();
		xhttp.open("POST", WEBHOST_PATH+"create_comment.php", true);
		xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		var parameters = "submit=1" + "&source=Plugin" + "&id=" + KursID + "&user_name=" + user_name + "&Fachsemester=" + Fachsemester + "&WPBsemester=" + WPBsemester + "&content=" + content + "&Didaktik_Note=" +  Didaktik_Note + "&Auftreten_Note=" + Auftreten_Note + "&Klinische_Relevanz_Note=" + Klinische_Relevanz_Note + "&Organisation_Note=" + Organisation_Note;
			//these headers give "refused to send because unsafe" error. appearently they arn't needed anyway
			//xhttp.setRequestHeader("Content-length", parameters.length);
			//xhttp.setRequestHeader("Connection", "close");
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				window.alert("Danke dir!");
				var comments_div = document.getElementById("comments_div_"+KursID);
				var splash_content = document.getElementById("splash_"+KursID);
				//reload splash page. move to exertnal function to recycle code (make create_submit_btn dependent)
				fetch_splash_content(KursID, comments_div, splash_content, false);
			}
		}
		xhttp.send(parameters);
}

function reportAbuse() {
	var KursID = this.KursID;
	var comment_id = this.comment_id;
	var txt;
    var r = confirm("Möchtest du diese Nachricht melden?");
    if (r == true) {
		var xhttp;
		xhttp = new XMLHttpRequest();
		//http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhttp.open("GET", WEBHOST_PATH+"create_report.php?course="+KursID +"&comment_id="+comment_id +"&source=Missbrauch"+"&submit=1", true);
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				
			}
		}
		xhttp.send();
    } 
}

function htmlEscape(str) {
    return str
        .replace(/&/g, '&amp;')
		.replace(/´/g, '&#180;')
        //.replace(/"/g, '&quot;')
        //.replace(/'/g, '&#39;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
		.replace(/ä/g, '&auml;')
		.replace(/Ä/g, '&Auml;')
		.replace(/ö/g, '&ouml;')
		.replace(/Ö/g, '&Ouml;')
		.replace(/ü/g, '&uuml;')
		.replace(/Ü/g, '&Uuml;');
}