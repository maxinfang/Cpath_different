var CL_SEPARATOR='a';
var C_SEPARATOR='C';
var L_SEPARATOR='L';
var C_field_SEPARATOR='c';
var L_field_SEPARATRo='c';
var Label_SEPARATOR='d';
var Data_SEPARATOR='D';

if (!Array.prototype.indexOf)
{
  Array.prototype.indexOf = function(elt /*, from*/)
  {
    var len = this.length >>> 0;

    var from = Number(arguments[1]) || 0;
    from = (from < 0)
         ? Math.ceil(from)
         : Math.floor(from);
    if (from < 0)
      from += len;

    for (; from < len; from++)
    {
      if (from in this &&
          this[from] === elt)
        return from;
    }
    return -1;
  };
}
 
function connector(id,h,t,EST,EFT,LST,LFT,FF,TF){ 
 this.h="";
 this.t="";
 this.LT="";
 this.activity="";
  
}

function Node(id,type,parent,top,left,activity,EST,EFT,LST,LFT,FF,TF){     
 this.id = ""; 
 this.top ="";
 this.left=""; 
 this.activity="";
 this.EST="";
 this.EFT=""; 
 this.LST="";
 this.LFT="";
 this.FF="";
 this.TF="";                                                         
}  


function NodeClass(node) {  
  this.id=node.id;
  this.prevNode=null;       
  this.nextNodes=null;   
  this.prevconnectors=null;       
  this.nextconnectors=null;   
  this.node=node;  
  this.level=0; 
  
}


function connectionClass(connector) {  
 
  this.prevLinks=null;       
  this.prevLinks=null;       
  this.connector=connector;  
  this.level=0; 
  
}



function deserialiseL(string){  
 var array= new Array(); 
 var stringwithCandL=string.split('a');  
 var stringlink=stringwithCandL[1]; 
 if(stringlink.length ==0) return [];   
 var link= stringlink.split('L');  
 for(i=1;i<link.length;i++){ 
   var shapeanddata=link[i].split('D');  
   var linkAttribute= shapeanddata[0].split('c'); 
   var dataAttribute=shapeanddata[1].split('d');
   console.log(dataAttribute);
   var cc = new connector(); 
   cc.h= linkAttribute[1]
   cc.t= linkAttribute[2]; 
   cc.activity=dataAttribute[1];
   cc.LT=dataAttribute[2];
 
   array.push(cc);
 }
 
 
 return array;
 
}




function deserialiseC(string){ 
 var array= new Array(); 
 var stringwithCandL=string.split('a'); 
 var stringnode=stringwithCandL[0];
 var stringlink=stringwithCandL[1]; 
 var stringnode=  stringnode.split('C'); 
 for(i=1;i<stringnode.length;i++){ 
   var shapeanddata=stringnode[i].split('D'); 
       //console.log(shapeanddata);
       var nodeAttribute=shapeanddata[0].split('c');
       //console.log(nodeAttribute);
       var node = new Node();
       node.id= nodeAttribute[1]
       node.top=nodeAttribute[2];
       node.left=nodeAttribute[3];
 
       var dataAttribute=shapeanddata[1].split('d');
      // console.log(dataAttribute);
      node.activity=dataAttribute[1];
      node.EST=dataAttribute[2];
      node.EFT=dataAttribute[3];
      node.LST=dataAttribute[4];
      node.LFT=dataAttribute[5];
      node.FF=dataAttribute[6];
      node.TF=dataAttribute[7]; 
      array.push(node); 
    }  
    return array;   
    
  }


  function validateInt(value)
{
    var num = value;
    var regex=/^\d*$/;;
    
  
  message="true";
  
  if (!num.match(regex)) { message="Numbers must be Integer"; 
                          }
      
  return message;
  
  
 }



  function serialise(myNodes,mylinks){
    
    var answervalue ="";  
    for(l=0;l<myNodes.length;l++){
      var thisnode=myNodes[l];  
      answervalue+=C_SEPARATOR;  
      answervalue+=C_field_SEPARATOR; 
      answervalue+=thisnode.id;
      answervalue+=C_field_SEPARATOR; 
      answervalue+=thisnode.top;
      answervalue+=C_field_SEPARATOR;
      answervalue+=thisnode.left;
      answervalue+=C_field_SEPARATOR;  
      answervalue+=Data_SEPARATOR;
      answervalue+=Label_SEPARATOR;
      answervalue+=thisnode.activity;
      answervalue+=Label_SEPARATOR;
      answervalue+=thisnode.EST; 
      answervalue+=Label_SEPARATOR;
      answervalue+=thisnode.EFT;
      answervalue+=Label_SEPARATOR; 
      answervalue+=thisnode.LST;
      answervalue+=Label_SEPARATOR;
      answervalue+=thisnode.LFT;
      answervalue+=Label_SEPARATOR;
      answervalue+=thisnode.FF;
      answervalue+=Label_SEPARATOR;
      answervalue+=thisnode.TF; 
    } 
    answervalue+=CL_SEPARATOR='a';
    
    console.log(mylinks);
    
    for(l=0;l<mylinks.length;l++){
      var thislink=mylinks[l]; 
     
     answervalue+=L_SEPARATOR;   
     answervalue+=C_field_SEPARATOR; 
     answervalue+=thislink.h;
     answervalue+=C_field_SEPARATOR; 
     answervalue+=thislink.t;
     answervalue+=C_field_SEPARATOR;
     answervalue+=C_field_SEPARATOR;  
     answervalue+=Data_SEPARATOR;
     answervalue+=Label_SEPARATOR;
     answervalue+=thislink.activity;
     answervalue+=Label_SEPARATOR;
     answervalue+=thislink.LT; 
    } 
    
    return answervalue;
    
  } 

  function generateID(myNodes){
    
    if (typeof(myNodes) == "undefined" ) {return 1;}
    
    var myNodesArray=myNodes;
    var max=0;    
    for(n=0; n<myNodesArray.length;n++){ 
     var node= myNodes[n]; 
     node.id >=max;
     max=node.id 
   } 
   var ret= Number(max) +1;
   return ret;
   
 };


 function findnode(id){ 
  for(n=0; n<myNodes.length;n++){
    
    var node=myNodes[n];
    
    if (node.id==id) {
     return node; 
   } 
   
   
 }
}






function findrootnode(){

 for(var m=0; m<myNodes.length;m++){ 
   
   var node= myNodes[m]; 
   var id = node.id; 
   
   var count =0;
   for(var n=0; n<mylinks.length;n++){
    var link=mylinks[n];
    if (link.t==id) {
      count++;
      console.log("link:++"+link);
    }
  }
  if (count==0) {
   console.log("root:"+id); 
   return findnode(id);
 }
 

}


}

function findlink(h,t){
  
  for(var n=0; n<mylinks.length;n++){ 
   var link= mylinks[n]; 
   
   if (link.h == h && link.t== t)
     
   {    
     return link; 
   };
   
   
 }
 return  null ;
}

function deletelink(h,t){

 var link = findlink(h,t);
 
 if (link == null) console.log("null");
 var index = mylinks.indexOf(link);  
 
 mylinks.splice(index,1);
 
 
 if(mode == "student"){ sentToparentPage();}
 return;


}

function generateLinkID(mylinks){
  
  if (typeof(mylinks) == "undefined" ) {return 10000;}
  
  var mylinksArray=mylinks;
  var max=0;  
  
  for(n=0; n<mylinks.length;n++){ 
   var mylink= mylinks[n]; 
   mylink.id >=max;
   max=mylink.id 
 } 
 var ret= Number(max) +1;
 return ret;
 
};


function addNewNode(node){

 myNodes.push(node);
 sentToparentPage();
}

function addNewLink(link){

 mylinks.push(link);
 sentToparentPage();
}

function  emptymyNodes(){
 
}

function updatelink(link,property,con){

  var mylinkArray=mylinks;
  
  
  var ll= findlink(link.h,link.t)
  if(ll){
   if(property=="activity"){ll.activity=link.activity;
    if (ll.activity==0){
      con.setPaintStyle({lineWidth: 2, 
       strokeStyle:"#666",
       dashstyle:"4 2"})
    } 
    else{
     con.setPaintStyle({
       dashstyle: "solid",
       lineWidth: 2 ,
       strokeStyle:"#666"
     })
   } 
 } 
 if(property=="EST"){ll.EST=link.EST;} 
 if(property=="EFT"){ll.EFT=link.EFT;}
 if(property=="LST"){ll.LST=link.LST;} 
 if(property=="LFT"){ll.LFT=link.LFT;}
 if(property=="FF"){ll.FF=link.FF;} 
 if(property=="TF"){ll.TF=link.TF;}
 if(property=="LT"){ll.LT=link.LT;}
}
if(mode == "student"){ sentToparentPage();}
return;

}


function updateNode(node,property){
  var myNodesArray=myNodes;
  
  for(n=0; n<myNodesArray.length;n++){ 
   var nn= myNodes[n]; 
   if(  nn.id== node.id){
    if(property=="top") {nn.top=node.top;}
    if(property=="left"){nn.left=node.left;} 
    if(property=="activity"){nn.activity=node.activity;} 
    if(property=="EST"){nn.EST=node.EST;} 
    if(property=="EFT"){nn.EFT=node.EFT;}
    if(property=="LST"){nn.LST=node.LST;} 
    if(property=="LFT"){nn.LFT=node.LFT;}
    if(property=="FF"){nn.FF=node.FF;} 
    if(property=="TF"){nn.TF=node.TF;}
    
  }
} 

console.log(myNodes);
if(mode == "student"){ sentToparentPage();}
return;


};



function  giveWarning(){
 
 
 var numberOfnoParent=0;
 for(n=0; n<myNodes.length;n++){
  var node= myNodes[n];
  var tail= node.id;
  var istailexist=0;
  for(var l=0; l<mylinks.length;l++){ 
   var link= mylinks[l]; 
   if (link.t == tail ){ 
    istailexist=1;break;
  } 
}   
if (istailexist==0) numberOfnoParent++;
}

if (numberOfnoParent>1) {
 
 $("body").css("background-color","#fee");
 $("p").text("Warning: Not all nodes are connected!");
 
}  
else{
  $("body").css("background-color","transparent");
  $("p").text("");
  
}; 


}


function sentToparentPage()
{   giveWarning();
  
  answervalue= serialise(myNodes,mylinks);
  console.log(answervalue);
  
  var elem= parent.document.getElementsByTagName("input"); 
  var arr = new Array();
  var i = 0;
  var iarr = 0;
  var att;
  for(; i < elem.length; i++) {
    att = elem[i].getAttribute("type");
    if(att =="text") {
     elem[i].value   = answervalue;
   }  
   
 }
 
 
}


function calculateEFT(node){
 node.EFT= +du[node.activity] +  +node.EST;
 if( node.EFT==0){node.EFT="0"}
   return node.EFT;
}




function  calculateEST(node,value){
  if(value == 0) {value = "0";}
  node.EST=value;
  return true;
  
};




function calculateLFT(node,value){
  //if(value == ) {value=node.EFT;}
  if (value==0) value="0";
  // console.log(node.EFT);
  node.LFT=value;
  
  return true;
  
}

function calculateLST(node){
 node.LST=    +node.LFT - +du[node.activity];
 if(node.LST==0) {node.LST="0";}
 return node.EFT;

}

function calculateFFTF(node,value){ 
  
 node.FF=   value  - node.EFT;
 node.TF=    +node.LFT - +node.EFT;
 if(node.FF == 0) { node.FF ="0";}
 if(node.TF == 0)  { node.TF= "0";}
 
}


function calculateTF(node){
  node.TF=  +node.LFT - +node.EFT; 
  if(node.TF == 0)  { node.TF= "0";}
}


function calculateFF(node,value){
  node.FF=value;
  
  
  if(node.FF == 0)  { node.FF= "0";}
}

function deleteNode(node)
{
 var deletedNodeid=node.id; 
 var index = myNodes.indexOf(node); 
 
 myNodes.splice(index,1); 
 for(n=0; n<myNodes.length;n++){
  var node= myNodes[n];
  
  if(node.parentID==node.id){ 
    node.parentID="";
    $("#"+node.id).children().each(function(no,el){
      if($(el).hasClass("droplist")){
        $(el).hide();
      } 
    });
  }
 }
   
   deletearray =new Array();
   for(var n=0; n<mylinks.length;n++){ 
   var link= mylinks[n];  
   if (link.h == deletedNodeid  )
     
   {    
    deletearray.push(link); 
   }
     
      if (link.t == deletedNodeid  )
     
   {    
     deletearray.push(link); 
   }
   
  }  
   
   for(var d=0; d<deletearray.length;d++){ 
      var link= deletearray[d]; 
      deletelink(link.h,link.t); 
   }
   
   
  $("#"+deletedNodeid).remove();
  if(mode == "student"){ sentToparentPage();}
  return;
}

 function recursive(node){  
    var currentnode= node;
    var nextnodes= node.nextNodes;
    var nodedata= node.node; 
    var length= nextnodes.length;
    
     
    if( length>0) {
      var  prob=0;
      var max = 0;
      for (var x=0;x<length;x++){
        var childnode = nextnodes[x];  
        var childLevel = recursive(childnode);  
        
        if( max < childLevel){
          max=childLevel;  
          
        }
        
      } 
      node.level=max+1;
      return node.level
      
    } 
    
    node.level=1;
    return node.level;
    
  }

function findmaxEFTlinks(linksarray){
    var max=0;
   for(n=0; n<linksarray.length;n++){ 
       var lin= linksarray[n];
     if(lin.EFT>max){max=lin.EFT}
   }
  return max; 
}

function findminsESTlink(linksarray){
    var min=100000;
  for(n=0; n<linksarray.length;n++){ 
       var lin= linksarray[n];
     if(lin.EST< min){min=lin.EST}
   }
  return min;
  

}
