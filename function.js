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

if (!Array.prototype.compare)
  {
  Array.prototype.compare = function(testArr) {
  
      if (this.length != testArr.length) return false;
      for (var i = 0; i < testArr.length; i++) {
          if ((this[i] == "" && testArr[i] == "0") ||
          (this[i] == "0" && testArr[i] == "")) {
                  continue;
          }
          else if (this[i] != testArr[i]) return false;
      }
    console.log("found!");
      return true;
  }
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
      node.activity=parseInt(dataAttribute[1]);
      node.EST=parseInt(dataAttribute[2]);
      node.EFT=parseInt(dataAttribute[3]);
      node.LST=parseInt(dataAttribute[4]);
      node.LFT=parseInt(dataAttribute[5]);
      node.FF=parseInt(dataAttribute[6]);
      node.TF=parseInt(dataAttribute[7]); 
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






function findrootnode(myNodes,mylinks){

 for(var m=0; m<myNodes.length;m++){ 
   
   var node= myNodes[m]; 
   var id = node.id; 
   
   var count =0;
   for(var n=0; n<mylinks.length;n++){
    var link=mylinks[n];
    if (link.t==id) {
      count++; 
    }

  }
  if (count==0) { 
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
 
}




function  calculateEST(node,value){
 
  node.EST=value;
  return true;
  
};




function calculateLFT(node,value){
  //if(value == ) {value=node.EFT;}
   
  // console.log(node.EFT);
  node.LFT=value;
  
  return true;
  
}

function calculateLST(node){
 node.LST=    +node.LFT - +du[node.activity];
 return node.EFT;
}

function calculateFFTF(node,value){ 
 node.FF=   value  - node.EFT;
 node.TF=    +node.LFT - +node.EFT;
 
}


function calculateTF(node){
  node.TF=  +node.LFT - +node.EFT; 
}


function calculateFF(node,value){
  node.FF=value;
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

function setupLinkedArray(nodes, links) {
  var linkedArray = [];
  var linkedArray2 = [];

  for (let n = 0; n < nodes.length; n++) {
    var node = nodes[n];
    var linkedNode = new NodeClass(node);
    linkedArray.push(linkedNode);
    linkedArray2.push(linkedNode);
  }

  for (let j = 0; j < linkedArray.length; j++) {
    var linkedNode = linkedArray[j];
    var children = [];
    var parents = [];

    for (let n = 0; n < links.length; n++) {
      var link = links[n];
      if (link.t === linkedNode.id) {
        parents.push(findlinkednode(link.h));
      }
      if (link.h === linkedNode.id) {
        children.push(findlinkednode(link.t));
      }
    }

    linkedNode.prevNode = parents;
    linkedNode.nextNodes = children;
  }


  for (j = 0; j < linkedArray.length; j++) {
    var linkedNode = linkedArray[j];
    var children = new Array();
    var parents = new Array();
    for (var n = 0; n < answer_Links.length; n++) {
      var link = answer_Links[n];
      if (link.t == linkedNode.id) {
        parents.push(findlinkednode(link.h));
      }

      if (link.h == linkedNode.id) {
        children.push(findlinkednode(link.t));
      }
    }  

    linkedNode.prevNode = parents;
    linkedNode.nextNodes = children;
  }


  for (j = 0; j < linkedArray.length; j++) {
    var linkedNode = linkedArray[j];
    var predessors = Array();
    var successors = Array();

    predessors = linkedNode.prevNode;
    successors = linkedNode.nextNodes;

    var prevlink = Array();
    for (p = 0; p < predessors.length; p++) {
      var head = predessors[p].id;
      var link = findlink(head, linkedNode.id);
      prevlink.push(link);
    }
    linkedNode.prevconnectors = prevlink;

    var suclink = Array();
    for (s = 0; s < successors.length; s++) {
      var tail = successors[s].id;
      var link = findlink(linkedNode.id, tail);
      suclink.push(link);
    }
    linkedNode.nextconnectors = suclink;
  }

  return linkedArray;
}


function compareAndUpdateNodes(linkedArray,linkedArray_sub) {

  for(var n=0; n<linkedArray.length;n++){
    var linkednode = linkedArray[n];
    var node= linkedArray[n].node;  
    console.log (linkednode);
        for(var m=0; m<linkedArray_sub.length;m++){ 
       var student_linkednode=linkedArray_sub[m]; 
       var   student_node= student_linkednode.node;   
       if(student_node.activity ==  node.activity)  
          { node.color= "green";    
            if(node.EFT==student_node.EFT ){
              if(node.EFTcolor == "red"){node.EFTcolor="blue";}
              else{node.EFTcolor="default";} 
            } 
            if(node.EST==student_node.EST ){
              if(node.ESTcolor == "red"){node.ESTcolor="blue";}
              else{node.ESTcolor="blue";} 
            }  
            if(node.FF==student_node.FF)  {
              if(node.FFcolor == "red"){node.FFcolor="blue";}
              else{node.FFcolor="blue";}   
            }   
            if(node.LFT==student_node.LFT){ 
              if(node.LFTcolor == "red"){node.LFTcolor="blue";}
              else{node.LFTcolor="blue";}    
            } 
            if(node.LST==student_node.LST){ 
                if(node.LSTcolor == "red"){node.LSTcolor="blue";}
              else{node.LSTcolor="blue";} 
            } 
            if(node.TF==student_node.TF  ){
                if(node.TFcolor == "red"){node.TFcolor="blue";}
              else{node.TFcolor="blue";} 
            
            } 
              
    

            // Initialize correctbox as an empty array
            let correctbox = []; 
            var studentbox = [];
             // Add all the previous node activities to correctbox

            student_linkednode.prevNode.forEach(function(a) {
              console.log(a);
              studentbox.push(a.node.activity);
            });

            linkednode.prevNode.forEach(function(a) { //correct
             console.log(a);
             correctbox.push(a.node.activity);
            }); 
              
            console.log(correctbox);
            console.log(studentbox);
            if( !correctbox.sort().compare(studentbox.sort())) { node.left_red="red";}
            
       
            
          let correctbox_next = [];
          let studentbox_next  = []

          linkednode.nextNodes.forEach(function(a) {
              if (a.node.activity) {
                correctbox_next.push(a.node.activity)
              } 
            } )
            student_linkednode.nextNodes.forEach(function(a) {
              if (a.node.activity) {
                studentbox_next.push(a.node.activity)
              } 
            })
              
          if(! correctbox_next.sort().compare(studentbox_next.sort())) {   node.right_red="red";   } 
           break;
           }
        else {
         node.color="red"; 
          } 
      }
   
   }

   /*
   for (let i = 0; i < answer_Nodes.length; i++) {
     const correctNode = answer_Nodes[i];
     const studentNode = myNodes.find(node => node.activity === correctNode.activity);
    console.log(studentNode);
    console.log(correctNode);
     if (studentNode) { 
      correctNode.color = "green"; // Correct 
      if (correctNode.EFT !== studentNode.EFT || correctNode.LFT !== studentNode.LFT || correctNode.EST !== studentNode.EST || correctNode.LST !== studentNode.LST || correctNode.TF !== studentNode.TF || correctNode.FF !== studentNode.FF ) {
        correctNode.color = "orange"; // Partially correct
      }
    }
     else {
      correctNode.color = "red"; // Incorrect
     }
   }*/
 }



 function calculateLinkedArrayAndValues(myNodes, mylinks) {
   var root = findrootnode(myNodes, mylinks);
   linkedArray = [];
   linkedArray2 = [];

   // Create linked nodes
   for (let n = 0; n < myNodes.length; n++) {
     var node = myNodes[n];
     var linkedNode = new NodeClass(node);
     linkedArray.push(linkedNode);
     linkedArray2.push(linkedNode);
   }

   // Set up connections
   for (let j = 0; j < linkedArray.length; j++) {
     var linkedNode = linkedArray[j];
     var children = [];
     var parents = [];

     for (let n = 0; n < mylinks.length; n++) {
       var link = mylinks[n];
       if (link.t === linkedNode.activity) {
         parents.push(findlinkednode(link.h,linkedArray2));
       }
       if (link.h === linkedNode.activity) {
         children.push(findlinkednode(link.t,linkedArray2));
       }
     }

     linkedNode.prevNode = parents;
     linkedNode.nextNodes = children;
   }

   // Calculate values
   var linkedrootnode = findlinkednode(root.activity,linkedArray2);
   recursive(linkedrootnode);

   // Perform calculations (assuming these functions exist)
   calculateEFT(linkedrootnode);
   calculateLFT(linkedrootnode);
   calculateEST(linkedrootnode);
   calculateLST(linkedrootnode);
   calculateTF(linkedrootnode);
   calculateFF(linkedrootnode);

   return linkedArray;
 }


 function findlinkednode(id, array) {
  for (x = 0; x < array.length; x++) {
    var li = array[x];
    if (li.id == id) {
      return li;
    }
  }
  return "none";
}


 findsubnode = function(id){
    for (let i = 0; i < myNodes.length; i++) {
      if (myNodes[i].activity === id) {
        return myNodes[i];
      }
    }
 }
