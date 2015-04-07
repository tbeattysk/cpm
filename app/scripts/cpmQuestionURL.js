"use strict";
var cpmQuestionURL = function(){
	var textbook={
		1:{
			1:{1:1,2:5,3:15,4:24,5:32,max:40,min:1,count:5},
			2:{1:41,2:51,3:62,4:73,max:94,min:41,count:4},
			cl:{max:101,min:95},	
			min:1,
			max:101,
			count:2
		},
		2:{
			1:{1:1,2:11,max:19,min:1,count:2},
			2:{1:20,2:29,3:39,max:50,min:20,count:3},
			3:{1:51,2:60,3:70,4:80,max:90,min:51,count:4},
			cl:{max:100,min:91},
			min:1,
			max:100,
			count:3	
		},
		3:{
			1:{1:1,2:22,3:36,4:55,5:67,6:78,max:88,min:1,count:6},
			2:{1:89,2:99,3:111,4:123,max:132,min:89,count:4},
			cl:{max:142,min:133},
			min:1,
			max:133,
			count:2	
		},
		4:{
			1:{1:1,2:12,3:21,max:43,min:1,count:3},
			2:{1:44,2:52,3:63,4:75,max:84,min:44,count:4},
			cl:{max:93,min:85},	
			min:1,
			max:93,
			count:2
		},
		5:{
			1:{1:1,2:9,3:18,4:29,max:38,min:1,count:4},
			2:{1:39,2:53,max:65,min:39,count:2},
			3:{1:66,2:76,3:85,4:96,max:105,min:66,count:4},
			cl:{max:114,min:106},	
			min:1,
			max:114,
			count:3
		},
		6:{
			1:{1:1,2:15,3:26,4:43,max:60,min:1,count:4},
			2:{1:61,2:79,3:91,4:101,5:111,max:119,min:61,count:5},
			cl:{max:128,min:120},	
			min:1,
			max:128,
			count:2
		},
		7:{
			1:{1:1,2:14,3:24,max:34,min:1,count:3},
			2:{1:35,2:49,3:57,4:69,max:78,min:35,count:4},
			3:{1:79,2:91,3:101,4:112,max:130,min:79,count:4},
			cl:{max:139,min:131},
			min:1,
			max:139,
			count:3	
		},
		8:{
			1:{1:1,2:12,3:30,4:44,5:61,max:70,min:1,count:5},
			2:{1:71,max:83,min:71,count:1},
			3:{1:84,2:95,3:106,max:120,min:84,count:3},
			cl:{max:129,min:121},	
			min:1,
			max:129,
			count:3
		},
		9:{
			1:{1:1,2:15,max:28,min:1,count:2},
			2:{1:29,2:40,3:49,4:70,max:79,min:29,count:4},
			cl:{max:80,min:87},	
			3:{1:88,2:92,3:95,max:98,min:88,count:3},
			min:1,
			max:95,
			count:3
		}
	}
	return {
		checkQuestion: function(q,book){
			var res = q.split("-");
			var chap = parseInt(res[0]);
			var num = parseInt(res[1]);
			try{
				if(!textbook.hasOwnProperty(chap)){
					throw "Chapter not available";
				}
				if(res[0]!=chap || res[1]!=num){

					throw "Incorrect input";
				}
				if(textbook[chap].max < num){
					throw "No question "+chap+'-'+num+" exists";
				};
				if(textbook[chap].cl.min<=num && textbook[chap].cl.max>=num){
					return true
				}
				for(var i=textbook[chap].count; i>0; i--){
					if(textbook[chap][i].min<=num && textbook[chap][i].max>=num){
						for(var j=textbook[chap][i].count; j>0; j--){
							if(textbook[chap][i][j]<=num){
								return true
							}
						}
					}
				}
				throw "Well that doesn't make sense... tell Tyler something went wrong (make note of the questions you requested)";
			}
			catch(err){throw err};
		},
		
		genOutput: function(text,nameSpace){
		 var res = text.split("{{");
         var outputText = '<span>'+ res.shift();
            for(var i=0; i<res.length;i++){
              var temp=res[i].split("}}");
              try{
                outputText=outputText+this.getURL(temp[0],nameSpace)+temp[1];
              }
              catch(err){
                alert(err);
              }
            }

           return outputText;
       },
		getURL:function(q,name,book){
			if(name){
				name=name+".";
			}
			var res = q.split("-");
			var chap = parseInt(res[0]);
			var num = parseInt(res[1]);
			try{
				if(!textbook.hasOwnProperty(chap)){
					throw "Chapter not available";
				}
				if(res[0]!=chap || res[1]!=num){
					throw "Incorrect input";
				}
				if(textbook[chap].max < num){
					throw "No question "+chap+'-'+num+" exists";
				}
				if(textbook[chap].cl.min<=num && textbook[chap].cl.max>=num){
					return '<a target="_blank" href="http://'+name+'textbooks.cpm.org/bookdb.php?title='+
						'cc1'+'&name='+chap+'.closure&type=lesson#CL'+q+'">'+q+'</a>';
				}
				for(var i=textbook[chap].count; i>0; i--){
					if(textbook[chap][i].min<=num && textbook[chap][i].max>=num){
						for(var j=textbook[chap][i].count; j>0; j--){
							if(textbook[chap][i][j]<=num){
								return '<a target="_blank" href="http://'+name+'textbooks.cpm.org/bookdb.php?title='+
									'cc1'+'&name='+chap+'.'+i+'.'+j+'&type=lesson#'+q+'">'+q+'</a>';
							}
						}
					}
				}
				throw "Well that doesn't make sense... tell Tyler something went wrong (make note of the questions you requested)";

			}
			catch(err){
				throw err;
			};
		}
	};
}