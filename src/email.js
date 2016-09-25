//just a hack, multi line title wasn't working
smart_email_textarea = document.querySelector("#txtarea_body_smart");
smart_email_textarea.title = smart_email_textarea.title.replace(/\\n/g, '\n');

//prevent form submission
document.querySelector("#simple-form").addEventListener("submit", function(){return false;});
document.querySelector("#smart-form").addEventListener("submit", function(){return false;});

//Event handler to handle simple/smart mode select

var changeMode = function(){
	var simpleCheckbox = document.querySelector("#radio-simple");
	var smartCheckbox = document.querySelector("#radio-smart");
	var simpleDiv = document.querySelector(".simple");
	var smartDiv = document.querySelector(".smart");	
	
	if(simpleCheckbox.checked){
		smartDiv.style.display = "none";
		simpleDiv.style.display = "block";
	}else{
		smartDiv.style.display = "block";
		simpleDiv.style.display = "none";
	}
}

var simpleCheckbox = document.querySelector("#radio-simple");
var smartCheckbox = document.querySelector("#radio-smart");
simpleCheckbox.addEventListener("click", changeMode);
smartCheckbox.addEventListener("click", changeMode);

//simple email generator
var generateEmail = function(){
		//console.log("clicked");
		var single_linebrk = document.querySelector("#txt_single_linebreak").value;
		var double_linebrk = document.querySelector("#txt_double_linebreak").value;
		var to = document.querySelector("#txt_to").value;
		var from = document.querySelector("#txt_from").value;
		var cc = document.querySelector("#txt_cc").value;
		var bcc = document.querySelector("#txt_bcc").value;
		var attachment = document.querySelector("#txt_attachment").value;
		var subject = document.querySelector("#txt_subject").value;
		var body = document.querySelector("#txtarea_body").value;
		
		var generated_textarea = document.querySelector("#txtarea_generated");
		
		var generated = "";
		generated  = "string to = \"" + to + "\" ; \n";
		generated += "string from = \"" + from + "\" ; \n";
		generated += "string cc = \"" + cc + "\" ; \n";
		generated += "string bcc = \"" + bcc + "\" ; \n";
		generated += 'string attachment = System.Configuration.ConfigurationManager.AppSettings["Attachment Path Key"] + ' 
						+ attachment + ' ; \n';
		generated += "string subject = \"" + subject + "\" ; \n";
		
		//split the body by double line breaks and filter out empty lines
		var body_lines = body.split("\n\n").filter(function(line){ return line.trim().length>0;});
		var generated_body = "";
		
		//insert double line breaks after each line
		for(var i=0; i<body_lines.length; ++i){
			generated_body += body_lines[i] + double_linebrk;
		}
		
		//split the body by single line breaks
		var body_lines = generated_body.split("\n");
		var generated_body = "";
		
		//insert single line breaks
		for(var i=0; i<body_lines.length; ++i){
			generated_body += body_lines[i] + single_linebrk;
		}
		
		generated += "string body = \"" + generated_body + "\" ; \n";
		
		generated_textarea.value = generated;
}

var btn_generate = document.querySelector("#btn_generate");
btn_generate.addEventListener("click", generateEmail);



//smart email generator

/*
Expected Format

To: to email
From: from email
cc: cc email
bcc: bcc email
attachment: attachment
Subject: email subject

email body


*/

var generateEmailSmartly = function(){
	var single_linebrk = "<br/>";	
	var double_linebrk = document.querySelector("#txt_double_linebreak_smart").value;
	var email = document.querySelector("#txtarea_body_smart").value.trim();
	var generated_email_textarea = document.querySelector("#txtarea_generated_smart");
	
	var lines = email.split("\n");
	
	var to = lines[0].substring(lines[0].indexOf(':')+1).trim();
	var from = lines[1].substring(lines[1].indexOf(':')+1).trim();
	var cc = lines[2].substring(lines[2].indexOf(':')+1).trim();
	var bcc = lines[3].substring(lines[3].indexOf(':')+1).trim();
	var attachment = lines[4].substring(lines[4].indexOf(':')+1).trim();
	var subject = lines[5].substring(lines[5].indexOf(':')+1).trim();
	var body = lines.slice(6, lines.length).join("\n");
	
	var generated = "";
	generated  = "string to = \"" + to + "\" ; \n";
	generated += "string from = \"" + from + "\" ; \n";
	generated += "string cc = \"" + cc + "\" ; \n";
	generated += "string bcc = \"" + bcc + "\" ; \n";
	generated += 'string attachment = System.Configuration.ConfigurationManager.AppSettings["Attachment Path Key"] + \"' 
						+ attachment + '\" ; \n';
	generated += "string subject = \"" + subject + "\" ; \n";

	
	//split the body by double line breaks and filter out empty lines
	var body_lines = body.split("\n\n").filter(function(line){ return line.trim().length>0;});
	var generated_body = "";
		
	//insert double line breaks after each line
	for(var i=0; i<body_lines.length; ++i){
		generated_body += body_lines[i] + double_linebrk;
	}
	
	//split the body by single line breaks
	var body_lines = generated_body.split("\n");
	var generated_body = "";
		
	//insert single line breaks
	for(var i=0; i<body_lines.length; ++i){
		generated_body += body_lines[i] + single_linebrk;
	}

	generated += "string body = \"" + generated_body + "\" ; \n";
	
	generated_email_textarea.value = generated;
	
}

var btn_generate_smart = document.querySelector("#btn_generate_smart");
btn_generate_smart.addEventListener("click", generateEmailSmartly);

















