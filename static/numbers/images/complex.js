var my={}
function complexMain(imode){this.version='0.933';this.w=350;this.h=300;this.mode=typeof imode!=='undefined'?imode:'Multiply';var id="calc";this.keys=["7","8","9","\u00d7","\u00f7","4","5","6","+","\u2212","1","2","3","(",")","0",".","i","\u2190","C"];this.keysn=this.keys.length;this.fkeys=["a+bi","^","pi","="];var s='';s+='<div style="position:relative; max-width:480px; min-height:'+h+'px; border: none; border-radius: 20px; margin:auto; display:block;">';s+='<textarea id="u" style="width:98%; height:60px; font: 25px Arial; color: blue; text-align:center; z-index:2; border-radius: 10px;" onkeyup="userKey(event)" autofocus  >&nbsp;</textarea>';s+='<div id="a" style="display: inline-block; margin-top:-2px; width:98%; height:46px; padding:3px; font: bold 20px Arial; background-color: rgba(0,0,255,0.2); color: darkblue; border: 1px solid #bbb; border-radius: 10px; text-align: center;" >&nbsp;</div>';s+=getKeyHTML();s+='<br>';s+=getfKeyHTML();s+='<br>';s+='<div style="font: 12px arial; font-weight: bold; color: #6600cc; text-align:left;">History:</div>';s+='<textarea  id="hist" value="ddd" style="width:98%; height: 120px; font: 14px Arial; border: 1px solid red; border-radius: 9px; background-color: #eeeeff; display: block; text-align: center;">';s+='</textarea>';s+='<div id="copyrt" style="font: bold 10px arial; color: #6600cc; text-align:center;">&copy; 2018 MathsIsFun.com  v'+this.version+'</div>';s+='</div>';document.write(s);hists=[];lastHist="?";lastHistTime=0;this.p=new Parser();this.radsQ=true;this.abiQ=true;document.getElementById("u").focus();}
function tests(){var exs=['12','i','i*2','i*i','(2+3i)','(2-3i)','i*(2-3i)','(2-3i)*(1+i)','(2-3i)/(1-i)','i^2','(2-3i)^2','sin(1)','(1-i)^(-0.5)','(1-i)^-0.5','e^(i*pi)','(1+i)^i','(1+i)^3','conj(2-3i)','re(2-3i)','im(2-3i)','exp(1)','exp(i)','exp(1+i)','sinh(2-i)','cosh(2-i)','tanh(2-i)','sin(1)','cos(1)','tan(1)','sin(1-2i)','cos(1-2i)','tan(1-2i)','ln(2)','ln(2-2i)','asin(0.5+2i)','acos(0.5+2i)','atan(0.5+2i)'];exNo=0;for(var i=0;i<exs.length;i++){var ex=exs[i];p.newParse(ex);console.log("ex:",ex,'==>',p.getVal(),'==>',p.getVal().fmt(),'==>',p.getVal().cisfmt());}}
function toggleRad(){this.radsQ=!this.radsQ;var inddiv=document.getElementById('rad');if(this.radsQ){inddiv.innerHTML='rad';}else{inddiv.innerHTML='deg';}
doCalc(false);return;}
function getKeyHTML(){var lineStt='<div style="text-align:center;">';var lineEnd='</div>';var s='';for(var i=0;i<this.keys.length;i++){var key=this.keys[i];if(i%5==0){if(i>0)s+=lineEnd;s+=lineStt;}
var clr=keyClr(i,'out')+';';s+='<button id="key'+i+'" style="width:57px; margin:-1px; font: 30px Consolas,monaco,monospace; background: '+clr+';" type="button" onclick="doKey('+i+')" onmouseover="keyOver('+i+')"  onmouseout="keyOut('+i+')" >'+key+'</button>';}
s+=lineEnd;return s;}
function getfKeyHTML(){var lineStt='<div style="text-align:center;">';var lineEnd='</div>';var s='';for(var i=0;i<this.fkeys.length;i++){var key=this.fkeys[i];if(i%4==0){if(i>0)s+=lineEnd;s+=lineStt;}
var n=i+this.keysn;var clr=keyClr(n,'out')+';';s+='<button id="key'+n+'" style="width:71px; height:38px; margin:-1px; font: 21px Consolas,monaco,monospace; background: '+clr+';" type="button" onclick="doKey('+n+')" onmouseover="keyOver('+n+')"  onmouseout="keyOut('+n+')" >'+key+'</button>';}
s+=lineEnd;return s;}
function doKey(i){if(i<this.keysn){var key=this.keys[i];}else{key=this.fkeys[i-this.keysn];}
var simples=["1","2","3","4","5","6","7","8","9","0","(",")","+","\u00d7","\u00f7","\u2212",".",'^','i'];if(simples.indexOf(key)>=0){pushU(key);}else{switch(key){case "=":var x=doCalc(true);break;case "C":document.getElementById('u').value='';document.getElementById('a').innerHTML='&nbsp;';break;case "1/x":aroundU('(1/(','))');break;case "\u00B1":aroundU('(-(','))');break;case "sin":aroundU('sin(',')');break;case "cos":aroundU('cos(',')');break;case "tan":aroundU('tan(',')');break;case "sin<sup>-1</sup>":aroundU('asin(',')');break;case "cos<sup>-1</sup>":aroundU('acos(',')');break;case "tan<sup>-1</sup>":aroundU('atan(',')');break;case "e<sup>x</sup>":aroundU('exp(',')');break;case "ln":aroundU('ln(',')');break;case "\u221a":aroundU('sqrt(',')');break;case "x\u00b2":aroundU('(',')^2');break;case "x\u00b3":aroundU('(',')^3');break;case "rad":toggleRad(i);break;case "a+bi":this.abiQ=!this.abiQ;var keydiv=document.getElementById('key'+i);if(this.abiQ){keydiv.innerHTML='a+bi';}else{keydiv.innerHTML='cis';}
doCalc(false);break;case "pi":pushU('pi');break;case "\u2190":var s=document.getElementById('u').value;s=s.substring(0,s.length-1);document.getElementById('u').value=s;break;default:}}}
function pushU(s){my.uDiv=document.getElementById('u');if(my.uDiv.selectionStart==0&&my.uDiv.selectionEnd==0){var txt=my.uDiv.value;my.uDiv.setSelectionRange(txt.length,txt.length);}
var txt=my.uDiv.value;my.uDiv.value=(txt.substring(0,my.uDiv.selectionStart)+s+txt.substring(my.uDiv.selectionEnd));my.uDiv.setSelectionRange(my.uDiv.selectionStart+s.length,my.uDiv.selectionStart+s.length);doCalc(false);}
function aroundU(s1,s2){var s=document.getElementById('u').value;var ops=["+","-","\u2212",'*',"\u00d7",'../index.html',"\u00f7",'^'];var skipi=false;for(var i=s.length-1;i>=0;i--){var c=s.charAt(i);if(c=='i')skipi=true;if(skipi&&(c=='-'||c=='+')){skipi=false;}else{if(ops.indexOf(c)>-1)break;}}
if(i==0){var sNew=s1+s+s2;}else{i++;sNew=s.substr(0,i)+s1+s.substr(i)+s2;console.log("aroundU",s,i,sNew);}
document.getElementById('u').value=sNew;doCalc(false);}
function userKey(e){var kt=keyType(e.keyCode,e.shiftKey);var f=document.getElementById('u').value;switch(kt){case '=':f=f.substr(0,f.length-1);document.getElementById('u').value=f;doCalc(true);break;case '+':case '*':case '/':case '^':console.log("userKey",kt);if(f.length==1){document.getElementById('u').value=hists[0][0]+f;}
doCalc(false);break;default:doCalc(false);break;}}
function keyType(k,shift){if(k==13)return "=";if(k==61&&shift)return "+";if(k==61&&!shift)return "=";if(k==187&&shift)return "+";if(k==187&&!shift)return "=";if(k==173&&!shift)return "-";if(k==189&&!shift)return "-";if(k==191&&!shift)return "/";if(k==56&&shift)return "*";if(k==106)return "*";if(k==107)return "+";if(k==109)return "-";if(k==111)return "/";return "?";}
function doCalc(updateUQ){var f=document.getElementById('u').value;this.p.radiansQ=this.radsQ;this.p.newParse(f);if(this.abiQ){var num=this.p.getVal().fmt();}else{var num=this.p.getVal().cisfmt();}
if(this.p.errMsg.length>0){document.getElementById('a').innerHTML='&nbsp;';}else{if(updateUQ){document.getElementById('u').value='';}
document.getElementById('a').innerHTML=' = '+num;addHist(f,num);}
return num;}
function addHist(q,a){console.log("addHist",q,a);if(q!=a.toString()){var hist=q+" = "+a;if(hist!=lastHist){if(lastHistTime+2000>Date.now()){console.log("replace");hists[0]=[q,a];}else{console.log("unshift");hists.unshift([q,a]);}
lastHist=hist;lastHistTime=Date.now();var h='';for(var i=0;i<Math.min(8,hists.length-1);i++){h+=hists[i][0]+' = '+hists[i][1]+"\n";}
document.getElementById('hist').value=h;}}}
function keyOver(n){var div=document.getElementById('key'+n);div.style.background=keyClr(n,'over');}
function keyOut(n){var div=document.getElementById('key'+n);div.style.background=keyClr(n,'out');}
function keyClr(n,state){var clr='blue;';switch(state){case 'out':clr='linear-gradient(to right, #8af 0%, #acf 100%)';if(n%5>=3)clr='linear-gradient(to right, #fa8 0%, #fc8 100%)';if(n>=this.keysn)clr='linear-gradient(to right, #fa8 0%, #fc8 100%)';break;case 'over':clr='linear-gradient(to right, #acf 0%, #def 100%)';if(n%5>=3)clr='linear-gradient(to right, #fca 0%, #fdc 100%)';if(n>=this.keysn)clr='linear-gradient(to right, #fca 0%, #fdc 100%)';break;default:}
return clr;}
function getHist(){var s="";lastHistTime=0;update();for(var i=0;i<hists.length;i++){s+=hists[i]+"\n";}
return s;}
function fmt(num,digits){if(num==Number.POSITIVE_INFINITY)
return "undefined";if(num==Number.NEGATIVE_INFINITY)
return "undefined";return num;}
function fmtNum(num,digits){if(num==Number.POSITIVE_INFINITY)return "undefined";if(num==Number.NEGATIVE_INFINITY)return "undefined";num=Number(num.toPrecision(digits));if(Math.abs(num)<1e-15)num=0;return num;}
Number.prototype.fmt=function(){return "Error";};Number.prototype.cisfmt=function(){return "Error";};function Parser(){this.operators="+-*(/),^.";this.rootNode=null;this.tempNode=[];this.Variable="x";this.errMsg="";this.radiansQ=true;this.vals=[];for(var i=0;i<26;i++){this.vals[i]=0;}
this.reset();}
Parser.prototype.setVarVal=function(varName,newVal){switch(varName){case "x":this.vals[23]=newVal;break;case "y":this.vals[24]=newVal;break;case "z":this.vals[25]=newVal;break;default:if(varName.length==1){this.vals[varName.charCodeAt(0)-'a'.charCodeAt(0)]=newVal;}}};Parser.prototype.getVal=function(){return(this.rootNode.walk(this.vals));};Parser.prototype.newParse=function(s){this.reset();s=s.replace(/[^\w/\.\(\)\[\]\+\-\^\&\;\*\u2212\u00F7\u00D7\u00B2\u00B3\u221a]/gi,'');s=s.split("x").join("*");s=s.split("[").join("(");s=s.split("]").join(")");s=s.split("&nbsp;").join("");s=s.split("&mult;").join("*");s=s.split("&divide;").join("../index.html");s=s.split("&minus;").join("-");s=s.replace(/\u2212/g,'-');s=s.replace(/\u00F7/g,'../index.html');s=s.replace(/\u00D7/g,'*');s=s.replace(/\u00B2/g,'^2');s=s.replace(/\u00B3/g,'^3');s=s.replace(/\u221a/g,'sqrt');s=this.fixPercent(s);s=this.fixENotation(s);s=this.fixParentheses(s);s=this.fixUnaryMinus(s);s=this.fixImplicitMultply(s);this.rootNode=this.parse(s);};Parser.prototype.fixPercent=function(s){if(!s.match(/%/)){return s;}
var myRe=/[0-9]*\.?[0-9]+[%]/g;var bits=[];var stt=0;var arr;while((arr=myRe.exec(s))!==null){bits.push(s.substr(stt,arr.index-stt));var str=arr[0];str='('+str.replace(/%/,'/100')+')';bits.push(str);stt=arr.index+arr[0].length;}
bits.push(s.substr(stt));s=bits.join('');return s;};Parser.prototype.fixENotation=function(s){if(!s.match(/e/i)){return s;}
var myRe=/[0-9]*\.?[0-9]+[eE]{1}[-+]?[0-9]+/g;var bits=[];var stt=0;var arr;while((arr=myRe.exec(s))!==null){bits.push(s.substr(stt,arr.index-stt));var eStr=arr[0];eStr='('+eStr.replace(/e/gi,'*10^(')+'))';bits.push(eStr);stt=arr.index+arr[0].length;}
bits.push(s.substr(stt));s=bits.join('');return s;};Parser.prototype.fixParentheses=function(s){var sttParCount=0;var endParCount=0;for(var i=0;i<s.length;i++){if(s.charAt(i)=="(")sttParCount++;if(s.charAt(i)==")")endParCount++;}
while(sttParCount<endParCount){s="("+s;sttParCount++;}
while(endParCount<sttParCount){s+=")";endParCount++;}
return(s);};Parser.prototype.fixUnaryMinus=function(s){var x=s+"\n";var y="";var OpenQ=false;var prevType="(";var thisType="";for(var i=0;i<s.length;i++){var c=s.charAt(i);if((c>="0"&&c<="9")||c=='.'){thisType="N";}else{if(this.operators.indexOf(c)>=0){if(c=="-"){thisType="-";}else{thisType="O";}}else{if(c=="."||c==this.Variable){thisType="N";}else{thisType="C";}}
if(c=="("){thisType="(";}
if(c==")"){thisType=")";}}
x+=thisType;if(prevType=="("&&thisType=="-"){y+="0";}
if(OpenQ){switch(thisType){case "N":break;default:y+=")";OpenQ=false;}}
if(prevType=="O"&&thisType=="-"){y+="(0";OpenQ=true;}
y+=c;prevType=thisType;}
if(OpenQ){y+=")";OpenQ=false;}
return(y);};Parser.prototype.fixImplicitMultply=function(s){var x=s+"\n";var y="";var prevType="?";var prevName="";var thisType="?";var thisName="";for(var i=0;i<s.length;i++){var c=s.charAt(i);if(c>="0"&&c<="9"){thisType="N";}else{if(this.operators.indexOf(c)>=0){thisType="O";thisName="";}else{thisType="C";thisName+=c;}
if(c=="("){thisType="(";}
if(c==")"){thisType=")";}}
x+=thisType;if(prevType=="N"&&thisType=="C"){y+="*";thisName="";}
if(prevType=="N"&&thisType=="("){y+="*";}
if(prevType==")"&&thisType=="("){y+="*";}
if(thisType=="("){switch(prevName){case "i":case "pi":case "e":case "a":case this.Variable:y+="*";break;}}
y+=c;prevType=thisType;prevName=thisName;}
return(y);};Parser.prototype.reset=function(){this.tempNode=[];this.errMsg="";};Parser.prototype.parse=function(s){if(s==""){this.errMsg+="Missing Value\n";return new MathNode("real","0",this.radiansQ);}
if(isNumeric(s)){return new MathNode("real",s,this.radiansQ);}
if(s.charAt(0)=="$"){if(isNumeric(s.substr(1))){return this.tempNode[Number(s.substr(1))];}}
var sLo=s.toLowerCase();if(sLo.length==1){if(sLo>="a"&&sLo<="z"){return new MathNode("var",sLo,this.radiansQ);}}
switch(sLo){case "pi":return new MathNode("var",sLo,this.radiansQ);break;}
var bracStt=s.lastIndexOf("(");if(bracStt>-1){var bracEnd=s.indexOf(")",bracStt);if(bracEnd<0){this.errMsg+="Missing ')'\n";return new MathNode("real","0",this.radiansQ);}
var isParam=false;if(bracStt==0){isParam=false;}else{var prefix=s.substr(bracStt-1,1);isParam=this.operators.indexOf(prefix)<=-1;}
if(!isParam){this.tempNode.push(this.parse(s.substr(bracStt+1,bracEnd-bracStt-1)));return this.parse(s.substr(0,bracStt)+"$"+(this.tempNode.length-1).toString()+s.substr(bracEnd+1,s.length-bracEnd-1));}else{var startM=-1;for(var u=bracStt-1;u>-1;u--){var found=this.operators.indexOf(s.substr(u,1));if(found>-1){startM=u;break;}}
nnew=new MathNode("func",s.substr(startM+1,bracStt-1-startM),this.radiansQ);nnew.addchild(this.parse(s.substr(bracStt+1,bracEnd-bracStt-1)));this.tempNode.push(nnew);return this.parse(s.substr(0,startM+1)+"$"+(this.tempNode.length-1).toString()+s.substr(bracEnd+1,s.length-bracEnd-1));}}
var k;var k1=s.lastIndexOf("+");var k2=s.lastIndexOf("-");if(k1>-1||k2>-1){if(k1>k2){k=k1;var nnew=new MathNode("op","add",this.radiansQ);nnew.addchild(this.parse(s.substr(0,k)));nnew.addchild(this.parse(s.substr(k+1,s.length-k-1)));return nnew;}else{k=k2;nnew=new MathNode("op","sub",this.radiansQ);nnew.addchild(this.parse(s.substr(0,k)));nnew.addchild(this.parse(s.substr(k+1,s.length-k-1)));return nnew;}}
k1=s.lastIndexOf("*");k2=s.lastIndexOf("../index.html");if(k1>-1||k2>-1){if(k1>k2){k=k1;nnew=new MathNode("op","mult",this.radiansQ);nnew.addchild(this.parse(s.substr(0,k)));nnew.addchild(this.parse(s.substr(k+1,s.length-k-1)));return nnew;}else{k=k2;nnew=new MathNode("op","div",this.radiansQ);nnew.addchild(this.parse(s.substr(0,k)));nnew.addchild(this.parse(s.substr(k+1,s.length-k-1)));return nnew;}}
k=s.indexOf("^");if(k>-1){nnew=new MathNode("op","pow",this.radiansQ);nnew.addchild(this.parse(s.substr(0,k)));nnew.addchild(this.parse(s.substr(k+1,s.length-k-1)));return nnew;}
if(isNumeric(s)){return new MathNode("real",s,this.radiansQ);}else{if(s.length==0){return new MathNode("real","0",this.radiansQ);}else{this.errMsg+="'"+s+"' is not a number.\n";return new MathNode("real","0",this.radiansQ);}}};function MathNode(typ,val,radQ){this.tREAL=0;this.tVAR=1;this.tOP=2;this.tFUNC=3;this.radiansQ=true;this.setNew(typ,val,radQ);}
MathNode.prototype.setNew=function(typ,val,radQ){this.radiansQ=typeof radQ!=='undefined'?radQ:true;this.clear();switch(typ){case "real":this.typ=this.tREAL;this.r=Number(val);break;case "var":this.typ=this.tVAR;this.v=val;break;case "op":this.typ=this.tOP;this.op=val;break;case "func":this.typ=this.tFUNC;this.op=val;break;}
return(this);};MathNode.prototype.clear=function(){this.r=1;this.v="";this.op="";this.child=[];this.childCount=0;};MathNode.prototype.addchild=function(n){this.child.push(n);this.childCount++;return(this.child[this.child.length-1]);};MathNode.prototype.getLevelsHigh=function(){var lvl=0;for(var i=0;i<this.childCount;i++){lvl=Math.max(lvl,this.child[i].getLevelsHigh());}
return(lvl+1);};MathNode.prototype.isLeaf=function(){return(this.childCount==0);};MathNode.prototype.getLastBranch=function(){if(this.isLeaf()){return(null);}
for(var i=0;i<this.childCount;i++){if(!this.child[i].isLeaf()){return(this.child[i].getLastBranch());}}
return(this);};MathNode.prototype.fmt=function(htmlQ){htmlQ=typeof htmlQ!=='undefined'?htmlQ:true;var s="";if(this.typ==this.tOP){switch(this.op.toLowerCase()){case "add":s="+";break;case "sub":s=htmlQ?"\u2212":"-";break;case "mult":s=htmlQ?"\u00d7":"x";break;case "div":s=htmlQ?"\u00f7":"/";break;case "pow":s="^";break;default:s=this.op;}}
if(this.typ==this.tREAL){s=this.r.toString();}
if(this.typ==this.tVAR){if(this.r==1){s=this.v;}else{if(this.r!=0){s=this.r+this.v;}}}
if(this.typ==this.tFUNC){s=this.op;}
return s;};MathNode.prototype.walkFmt=function(){var s=this.walkFmta(true,"");s=s.replace("Infinity","Undefined");return s;};MathNode.prototype.walkFmta=function(noparq,prevop){var s="";if(this.childCount>0){var parq=false;if(this.op=="add")parq=true;if(this.op=="sub")parq=true;if(prevop=="div")parq=true;if(noparq)parq=false;if(this.typ==this.tFUNC)parq=true;if(this.typ==this.tOP){}else{s+=this.fmt(true);}
if(parq)s+="(";for(var i=0;i<this.childCount;i++){if(this.typ==this.tOP&&i>0)s+=this.fmt();s+=this.child[i].walkFmta(false,this.op);if(this.typ==this.tFUNC||(parq&&i>0)){s+=")";}}}else{s+=this.fmt();if(prevop=="sin"||prevop=="cos"||prevop=="tan"){if(this.radiansQ){s+=" rad";}else{s+="\u00b0";}}}
return s;};MathNode.prototype.walkNodesFmt=function(level){var s="";for(var i=0;i<level;i++){s+="|   ";}
s+=this.fmt();s+="\n";for(i=0;i<this.childCount;i++){s+=this.child[i].walkNodesFmt(level+1);}
return s;};MathNode.prototype.walk=function(vals){if(this.typ==this.tREAL)return new C(this.r,0);if(this.typ==this.tVAR){switch(this.v){case "i":return new C(0,1);break;case "x":return(vals[23]);break;case "y":return(vals[24]);break;case "z":return(vals[25]);break;case "pi":return new C(Math.PI,0);break;case "e":return new C(Math.E,0);break;case "a":return(vals[0]);break;case "n":return(vals[13]);break;default:return new C(0,0);}}
if(this.typ==this.tOP){var val=0;for(var i=0;i<this.childCount;i++){var val2=0;if(this.child[i]!=null)
val2=this.child[i].walk(vals);if(i==0){val=val2;}else{switch(this.op){case "add":val=val.add(val2);break;case "sub":val=val.sub(val2);break;case "mult":val=val.mult(val2);break;case "div":val=val.div(val2);break;case "pow":val=val.pow(val2);break;default:}}}
return val;}
if(this.typ==this.tFUNC){var lhs=this.child[0].walk(vals);var angleFact=1;if(!this.radiansQ)angleFact=180/Math.PI;switch(this.op){case "sqrt":val=lhs.sqrt();break;case "sin":val=lhs.sin();break;case "cos":val=lhs.cos();break;case "tan":val=lhs.tan();break;case "asin":val=lhs.asin();break;case "acos":val=lhs.acos();break;case "atan":val=lhs.atan();break;case "sinh":val=lhs.sinh();break;case "cosh":val=lhs.cosh();break;case "tanh":val=lhs.tanh();break;case "exp":val=lhs.exp();break;case "ln":val=lhs.ln();break;case "round":val=lhs.round();break;case "floor":val=lhs.floor();break;case "ceil":val=lhs.ceil();break;case "re":val=lhs.re();break;case "im":val=lhs.im();break;case "conj":val=lhs.conj();break;default:val=NaN;}
return val;}
return val;};function factorial(n){if(n<0)return NaN;if(n<2)return 1;n=n<<0;var i;i=n;var f=n;while(i-->2){f*=i;}
return f;}
function C(r,i){this.r=r;this.i=i;this.tol=0.000000001;}
C.prototype.fmt=function(){var c=this;if(isNaN(c.r)||isNaN(c.i))return(NaN);if(Math.abs(c.r)<1e-15&&Math.abs(c.i)>1e-3)c.r=0;if(Math.abs(c.i)<1e-15&&Math.abs(c.r)>1e-3)c.i=0;var s='';if(c.r==0&&c.i==0)return "0";if(c.r>0)s+=fmtNum(c.r,14).toString();if(c.r<0)s+='\u2212'+fmtNum(-c.r,14).toString();if(c.i!=0){if(c.i>0){if(s.length>0)s+=" +";if(Math.abs(c.i-1)<this.tol){}else{s+=fmtNum(c.i,14).toString();}}else{if(s.length>0)s+=" ";s+="\u2212";if(s.length>1)s+=" ";if(Math.abs(c.i+1)<this.tol){}else{s+=fmtNum(-c.i,14).toString();}}
s+="i";}
return s;};C.prototype.cisfmt=function(){if(isNaN(this.r)||isNaN(this.i)){return(NaN);}
if(this.r==0&&this.c==0){return "0 cis 0";}
var p=this.polar();if(Math.abs(p.i)<1e-15)p.i=0;return p.r+" cis "+p.i;};C.prototype.eq=function(c2){if((this.r==c2.r)&&(this.i==c2.i)){return true;}
return false;};C.prototype.re=function(){return new C(this.r,0);};C.prototype.im=function(){return new C(0,this.i);};C.prototype.conj=function(){return new C(this.r,-this.i);};C.prototype.neg=function(){return new C(-this.r,-this.i);};C.prototype.add=function(c2){return new C(this.r+c2.r,this.i+c2.i);};C.prototype.sub=function(c2){return this.add(c2.neg());};C.prototype.mult=function(c2){var c1=this;return new C(c1.r*c2.r-c1.i*c2.i,c1.r*c2.i+c1.i*c2.r);};C.prototype.cartes=function(){return new C(this.r*Math.cos(this.i),this.r*Math.sin(this.i));};C.prototype.polar=function(){return new C(Math.sqrt(this.r*this.r+this.i*this.i),Math.atan2(this.i,this.r));};C.prototype.ln=function(){return new C(Math.log(this.mod()),this.arg());};C.prototype.mod=function(){return Math.sqrt(this.r*this.r+this.i*this.i);};C.prototype.absSqr=function(){return this.mult(this.conj());};C.prototype.abs=function(){return Math.sqrt(this.absSqr().r);};C.prototype.arg=function(){return Math.atan2(this.i,this.r);};C.prototype.chs=function(){return new C(-this.r,-this.i);};C.prototype.exp=function(){return new C(Math.exp(this.r)*Math.cos(this.i),Math.exp(this.r)*Math.sin(this.i));};C.prototype.pow=function(c2){if(c2.i==0){if(c2.r==-2)return new C(1,0).div(this.mult(this));if(c2.r==-1)return new C(1,0).div(this);if(c2.r==0)return new C(1,0);if(c2.r==1)return this;if(c2.r==2)return this.mult(this);if(c2.r==3)return this.mult(this.mult(this));}
var mag=Math.sqrt(this.r*this.r+this.i*this.i);var t=Math.atan2(this.i,this.r);var re=Math.pow(mag,c2.r)*Math.exp(-c2.i*t)*Math.cos(c2.r*t+c2.i*Math.log(mag));var im=Math.pow(mag,c2.r)*Math.exp(-c2.i*t)*Math.sin(c2.r*t+c2.i*Math.log(mag));return new C(re,im);};C.prototype.div=function(c2){var det=c2.r*c2.r+c2.i*c2.i;return new C((this.r*c2.r+this.i*c2.i)/det,(this.i*c2.r-this.r*c2.i)/det);};C.prototype.sqrt=function(){return this.pow(new C(0.5,0));};C.prototype.round=function(){return new C(Math.round(this.r),Math.round(this.i));};C.prototype.floor=function(){return new C(Math.floor(this.r),Math.floor(this.i));};C.prototype.ceil=function(){return new C(Math.ceil(this.r),Math.ceil(this.i));};C.prototype.sin=function(){return new C(Math.sin(this.r)*Math.cosh(this.i),Math.cos(this.r)*Math.sinh(this.i));};C.prototype.cos=function(){return new C(Math.cos(this.r)*Math.cosh(this.i),-Math.sin(this.r)*Math.sinh(this.i));};C.prototype.tan=function(){return this.sin().div(this.cos());};C.prototype.asin=function(){return(new C(1,0)).sub(this.mult(this)).sqrt().add(new C(0,1).mult(this)).ln().mult(new C(0,-1));};C.prototype.acos=function(){return this.mult(this).sub(new C(1,0)).sqrt().add(this).ln().mult(new C(0,-1));};C.prototype.atan=function(){return(new C(0,1)).add(this).div((new C(0,1)).sub(this)).ln().mult(new C(0,1)).div(new C(2,0));};C.prototype.sinh=function(){return this.exp().sub(this.neg().exp()).div(new C(2,0));};C.prototype.cosh=function(){return this.exp().add(this.neg().exp()).div(new C(2,0));};C.prototype.tanh=function(){return this.sinh().div(this.cosh());};function isNumeric(n){return!isNaN(parseFloat(n))&&isFinite(n);}