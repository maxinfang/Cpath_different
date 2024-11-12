function redraw(student_string, correct_string) {
 

  myNodes = deserialiseC(student_string);
  mylinks = deserialiseL(student_string);
 
  answer_Nodes = deserialiseC(correct_string);
  answer_Links = deserialiseL(correct_string);

  if (myNodes == []) return;
  if (mode == "submission") {
    for (n = 0; n < submission_Nodes.length; n++) {
      var node = myNodes[n]; 
      drawnode(node);
    }
    addConnections(myinks);
  }
 

  if (mode == "student" && answer_type == "overlapping") {
   /* for (n = 0; n < myNodes.length; n++) {
      var node = myNodes[n]; 
      drawnode(node);
    }
    var linkedArray = new Array();
    for (n = 0; n < myNodes.length; n++) {
      var node = myNodes[n];
      var linkedNode = new NodeClass(node);
      linkedArray.push(linkedNode);
    }
    for (j = 0; j < linkedArray.length; j++) {
      console.log(linkedArray[j]);
    } 
    addConnections(mylinks);*/
  }

  if (mode == "correct" && answer_type == "overlapping") {
    var root = new Node();
    root = findrootnode(answer_Nodes, answer_Links);
    root_sub = findrootnode(myNodes, mylinks);
    var { linkedArray, linkedArray2 } = setupLinkedArray(answer_Nodes, answer_Links); 
    
   var returnvalues =setupLinkedArray(myNodes, mylinks)
   var linkedArray2_sub = returnvalues.linkedArray2;
   var linkedArray_sub = returnvalues.linkedArray;
    //ABOVE IS TO SET UP THE LINKED ARRAY 
    var linkedrootnode = findlinkednode(root.id,linkedArray2);
   
    console.log(linkedArray);
    console.log(linkedArray2_sub);
    var linkedrootnode_sub = findlinkednode(root_sub.id,linkedArray2_sub);
   
    recursive(linkedrootnode);
    recursive(linkedrootnode_sub);

    var deep = linkedrootnode.level;
    var deep_sub = linkedrootnode_sub.level;

     for (var n = deep; n > 0; n--) {
      for (var j = 0; j < linkedArray.length; j++) {
        var lnode = linkedArray[j]; 
        console.log (n);
        if (lnode.level == n) {
          var precon = lnode.prevconnectors;
          var _array = new Array();
          _array.push(0);
          console.log(precon.length);
          for (var k = 0; k < precon.length; k++) {  
            if (precon[k] == null) continue;
            var con = precon[k];
            console.log(con);
            if (con.activity == 0) {
              var parentlinkednode = findlinkednode(con.h,linkedArray2);
              var parentnode = parentlinkednode.node;
              _array.push(+parentnode.EFT + +con.LT);
            }
            if (con.activity == 1) {
              var parentlinkednode = findlinkednode(con.h,linkedArray2);
              var parentnode = parentlinkednode.node;
              _array.push(+parentnode.EST + +con.LT);
            }
            if (con.activity == 2) {
              var parentlinkednode = findlinkednode(con.h,linkedArray2);
              var parentnode = parentlinkednode.node;
              var duration = du[lnode.node.activity];
              var temp = +parentnode.EFT + +con.LT - +duration;
              _array.push(temp);
            }
            if (con.activity == 3) {
              var parentlinkednode = findlinkednode(con.h,linkedArray2);
              var parentnode = parentlinkednode.node;
              var duration = du[lnode.node.activity];
              var temp = +parentnode.EST + +con.LT - +duration;
              _array.push(temp);
            }
          }
          var maxValudeofParentEFT = Math.max.apply(Math, _array);
          calculateEST(lnode.node, maxValudeofParentEFT);
          calculateEFT(lnode.node);
        }
      }
    }
    
    // use depth to get the calculation base
    var project_duration = 0;
    for (var i = 1; i <= deep; i++) {
      for (var j = 0; j < linkedArray.length; j++) {
        var lnode = linkedArray[j];
        var nodeEFT = lnode.node.EFT;
        if (project_duration < nodeEFT) {
          project_duration = nodeEFT;
        }
      }
    }

    //loop thrugh and  calcualte differerent fields
    for (var i = 1; i <= deep; i++) {
      for (var j = 0; j < linkedArray.length; j++) {
        var lnode = linkedArray[j];
        if (lnode.level == i) {
          var nextcon = lnode.nextconnectors;
          var _array = new Array();
          var _array2 = new Array();
          _array.push(project_duration);
          _array2.push(project_duration);
          for (var k = 0; k < nextcon.length; k++) {
            var con = nextcon[k];
            if (con == null) continue;
            //finish to start;
            if (con.activity == 0) {
              var parentlinkednode = findlinkednode(con.t,linkedArray2);
              var parentnode = parentlinkednode.node;
              _array.push(+parentnode.LST + -+con.LT);

              var diff = +parentnode.EST - lnode.node.EFT;
              var ff = diff - con.LT;
              _array2.push(ff);
            }
            //start to start
            if (con.activity == 1) {
              var parentlinkednode = findlinkednode(con.t,linkedArray2);
              var parentnode = parentlinkednode.node;
              var duration = du[lnode.node.activity];
              _array.push(+parentnode.LST - con.LT + +duration);

              var diff = parentnode.EST - lnode.node.EST;
              var ff = diff - con.LT;
              _array2.push(ff);
            }
            //finish to finish
            if (con.activity == 2) {
              var parentlinkednode = findlinkednode(con.t,linkedArray2);
              var parentnode = parentlinkednode.node;
              var duration = du[lnode.node.activity];
              var temp = +parentnode.LFT - +con.LT;
              _array.push(temp);
              var diff = +parentnode.EFT - lnode.node.EFT;
              var ff = diff - con.LT;
              _array2.push(ff);
            }

            // star to finish
            if (con.activity == 3) {
              var parentlinkednode = findlinkednode(con.t,linkedArray2);
              var parentnode = parentlinkednode.node;
              var duration = du[lnode.node.activity];
              var temp = +parentnode.LFT - +con.LT + +duration;
              _array.push(temp);
              var diff = +parentnode.EFT - lnode.node.EST;
              var ff = diff - con.LT;
              _array2.push(ff);
            }
          }
          var minEFT = Math.min.apply(Math, _array);
          calculateLFT(lnode.node, minEFT);
          calculateLST(lnode.node);
          calculateTF(lnode.node);
          _array2.push(lnode.node.TF);
          var minFF = Math.min.apply(Math, _array2);
          calculateFF(lnode.node, minFF);
        }
      }
    }



    //add some function here to compare to string
    // update the color of the node
   // Compare correct nodes to student nodes
   function compareAndUpdateNodes(linkedArray,linkedArray_sub) {

    for(var n=0; n<linkedArray.length;n++){
      var linkednode = linkedArray[n];
      var node= linkedArray[n].node;  
         for(var m=0; m<linkedArray_sub.length;m++){ 
         var student_linkednode=linkedArray_sub[m];
         var   student_node= linkedArray_sub[m].node; 
          
         if(student_node.activity ==  node.activity) 
           
            { node.color= "green";  
               
              // compare the pre and next
              // pre   
              if(node.EFT==student_node.EFT ){
                if(node.EFTcolor == "red"){node.EFTcolor="blue";}
                else{node.EFTcolor="default";}
                
              } 
              if(node.EST==student_node.EST ){
                if(node.ESTcolor == "red"){node.ESTcolor="blue";}
                else{node.ESTcolor="default";}  
              
              }  
              if(node.FF==student_node.FF)  {
                if(node.FFcolor == "red"){node.FFcolor="blue";}
                else{node.FFcolor="default";}   
              }   
              if(node.LFT==student_node.LFT){
                
                if(node.LFTcolor == "red"){node.LFTcolor="blue";}
                else{node.LFTcolor="default";}   
              
              } 
              if(node.LST==student_node.LST){
                
                  if(node.LSTcolor == "red"){node.LSTcolor="blue";}
                else{node.LSTcolor="default";} 
              } 
              if(node.TF==student_node.TF  ){
                  if(node.TFcolor == "red"){node.TFcolor="blue";}
                else{node.TFcolor="default";} 
              
              } 
                
              var correctbox = new Array();
              var studentbox  = new Array();
              
              
              for(var k=0; k<linkednode.prevNode.length; k++){
                var temp=  findnode(linkednode.prevNode[k].id); 
                 correctbox.push(temp.activity);
                
              }
              
              for(var k=0; k<student_linkednode.prevNode.length; k++){
                var temp=  findsubnode(student_linkednode.prevNode[k].id); 
                 studentbox.push(temp.activity);
                
              }
              if( !correctbox.sort().compare(studentbox.sort())) { node.left_red="red";}
              
              //next 
              
               var correctbox_next = new Array();
               var studentbox_next  = new Array();
                for(var k=0; k<linkednode.nextNodes.length; k++){
                var temp=  findnode(linkednode.nextNodes[k].id); 
                 
               if(typeof temp != 'undefined' ){
                  correctbox_next.push(temp.activity);
               }
                
              }
              
              for(var k=0; k<student_linkednode.nextNodes.length; k++){
                var temp=  findsubnode(student_linkednode.nextNodes[k].id); 
                if(typeof temp!= 'undefined' ){
                 studentbox_next.push(temp.activity);
                }
                
              }
              if(! correctbox_next.sort().compare(studentbox_next.sort())) {   node.right_red="red";   }
            
             break;
             }
          else {
           node.color="red";
         
            } 
        }
       console.log(linkednode);
     }
     
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
     }
   }

  

   function calculateLinkedArrayAndValues() {
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

 
   calculateLinkedArrayAndValues(); 
   compareAndUpdateNodes(linkedArray,linkedArray_sub);
 
    for (n = 0; n < answer_Nodes.length; n++) {
      var node = answer_Nodes[n];
      console.log(node);
      drawnode(node);
    } 
    addConnections(answer_Links);
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
        parents.push(findlinkednode(link.h, linkedArray2));
      }
      if (link.h === linkedNode.id) {
        children.push(findlinkednode(link.t, linkedArray2));
      }
    }

    linkedNode.prevNode = parents;
    linkedNode.nextNodes = children;
  }


  for (j = 0; j < linkedArray.length; j++) {
    var linkedNode = linkedArray[j];
    var children = new Array();
    var parents = new Array();
    for (var n = 0; n < links.length; n++) {
      var link = links[n];
      if (link.t == linkedNode.id) {
        parents.push(findlinkednode(link.h,linkedArray2));
      }

      if (link.h == linkedNode.id) {
        children.push(findlinkednode(link.t,linkedArray2));
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
   
  return {linkedArray, linkedArray2}
}

function deepCopyArray(array) {
  return array.map(item => {
    return JSON.parse(JSON.stringify(item));
  });
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

  function findsubnode(id) {
    for (x = 0; x < answer_Nodes.length; x++) {
      var li = answer_Nodes[x];
      if (li.activity == id) {
        return li;
      }
    }
    return "none";
  }

  function findnode(id) {
    for (x = 0; x < myNodes.length; x++) {
      var li = myNodes[x];
      if (li.activity == id) {
        return li;
      }
    }
    return "none";
  }

  if (mode == "correct" && answer_type == "precedence") {
    var root = new Node();
    root = findrootnode(answer_Nodes,answer_links);
    var linkedArray = new Array();
    var linkedArray2 = new Array();
    for (n = 0; n < myNodes.length; n++) {
      var node = myNodes[n];
      //console.log(node);
      var linkedNode = new NodeClass(node);
      // console.log(linkedNode);
      linkedArray.push(linkedNode);
    }

    for (j = 0; j < linkedArray.length; j++) {
      var linkedNode = linkedArray[j];
      var children = new Array();
      var parents = new Array();
      for (var n = 0; n < mylinks.length; n++) {
        var link = mylinks[n];
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

    var linkedrootnode = findlinkednode(root.id);
    recursive(linkedrootnode);
    var deep = linkedrootnode.level;
    console.log(linkedrootnode);

    for (var n = deep; n > 0; n--) {
      for (var j = 0; j < linkedArray.length; j++) {
        var lnode = linkedArray[j];
        if (lnode.level == n) {
          var parentnodes = lnode.prevNode; 
          var maxValudeofParentEFT = 0;
          for (var k = 0; k < parentnodes.length; k++) {
            var nodedata = parentnodes[k].node;
            var parentEFT = nodedata.EFT;
            if (maxValudeofParentEFT < parentEFT) {
              maxValudeofParentEFT = parentEFT;
            }
          }

          calculateEST(lnode.node, maxValudeofParentEFT);
          calculateEFT(lnode.node);
        }
      }
    }
    var project_duration = 0;

    for (var i = 1; i <= deep; i++) {
      for (var j = 0; j < linkedArray.length; j++) {
        var lnode = linkedArray[j];
        var nodeEFT = lnode.node.EFT;
        if (project_duration < nodeEFT) {
          project_duration = nodeEFT;
        }
      }
    }

    for (var i = 1; i <= deep; i++) {
      for (var j = 0; j < linkedArray.length; j++) {
        var lnode = linkedArray[j];
        if (lnode.level == i) {
          var childrenodes = lnode.nextNodes;
          var minValueofChildLST = project_duration;
          var minValueofChildEST = project_duration;
          for (var k = 0; k < childrenodes.length; k++) {
            var nodedata = childrenodes[k].node;
            var childLST = nodedata.LST;
            var childEST = nodedata.EST;
            if (minValueofChildLST > childLST) {
              minValueofChildLST = childLST;
            }
            if (minValueofChildEST > childEST) {
              minValueofChildEST = childEST;
            }
          }

          calculateLFT(lnode.node, minValueofChildLST);
          calculateLST(lnode.node);
          calculateFFTF(lnode.node, minValueofChildEST);
        }
      }
    }

    for (n = 0; n < answer_Nodes.length; n++) {
      var node = answer_Nodes[n]; 
      drawnode(node);
    }
    addConnections();

  } else if (mode == "correct" && answer_type == "arrow") {
    for (n = 0; n < myNodes.length; n++) {
      var node = myNodes[n];
      // console.log(node);
      drawnode(node);
    }
 
    var linkedArray = new Array();
    var linkedArray2 = new Array();

    for (n = 0; n < myNodes.length; n++) {
      var node = myNodes[n]; 
      var linkedNode = new NodeClass(node); 
      linkedArray.push(linkedNode);
      linkedArray2.push(linkedNode);
    }

    for (j = 0; j < linkedArray.length; j++) {
      var linkedNode = linkedArray[j];
      var children = new Array();
      var parents = new Array();
      for (var n = 0; n < mylinks.length; n++) {
        var link = mylinks[n];
        if (link.t == linkedNode.id) {
          parents.push(findlinkednode(link.h));
        }

        if (link.h == linkedNode.id) {
          children.push(findlinkednode(link.t));
        }
      }
      linkedNode.prevNode = parents;
      linkedNode.nextNodes = children;
      console.log(linkedNode);
    }
  
    var linkedconnections = new Array();
    var linkedconnectionsserach = new Array();

    for (x = 0; x < mylinks.length; x++) {
      var connector = mylinks[x];
      var linkedconnector = new connectionClass(connector); 
      linkedconnections.push(linkedconnector);
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

    var root = findrootnode(myNodes, mylinks);
    var linkedrootnode = findlinkednode(root.id);
    recursive(linkedrootnode);

    var deep = linkedrootnode.level;
    var maxvalueofEFT = 0;

    for (var n = deep; n > 0; n--) {
      for (var j = 0; j < linkedArray.length; j++) {
        var lnode = linkedArray[j];
        if (lnode.level == n) {
          var parentlinks = lnode.prevconnectors;
          var maxValudeofParentEFT = 0;
          for (var k = 0; k < parentlinks.length; k++) {
            var linkdata = parentlinks[k];

            var parentEFT = linkdata.EFT;
            if (maxValudeofParentEFT < parentEFT) {
              maxValudeofParentEFT = parentEFT;
              if (maxValudeofParentEFT > maxvalueofEFT) {
                maxvalueofEFT = maxValudeofParentEFT;
              }
            }
          }

          var nextlinks = lnode.nextconnectors;
          for (var k = 0; k < nextlinks.length; k++) {
            var linkdata = nextlinks[k];
            calculateEST(linkdata, maxValudeofParentEFT);
            calculateEFT(linkdata);
          }
        }
      }
    }

    for (var i = 1; i <= deep; i++) {
      for (var j = 0; j < linkedArray.length; j++) {
        var lnode = linkedArray[j];
        if (lnode.level == i) {
          var childrelinks = lnode.nextconnectors;
          var ValueofChildEFT = maxvalueofEFT;
          var ValueofChildEST = maxvalueofEFT;

          for (var k = 0; k < childrelinks.length; k++) {
            var linkdata = childrelinks[k];
            var childLST = linkdata.LST;
            var childEST = linkdata.EST;
            if (childLST < ValueofChildEFT) {
              ValueofChildEFT = childLST;
            }

            if (childEST < ValueofChildEST) {
              ValueofChildEST = childEST;
            }
          }

          var prelinks = lnode.prevconnectors;
          for (var k = 0; k < prelinks.length; k++) {
            link = prelinks[k];
            calculateLFT(link, ValueofChildEFT);
            calculateLST(link);
            calculateFFTF(link, ValueofChildEST);
          }
        }
      }
    }

    for (j = 0; j < linkedArray.length; j++) {
      console.log(linkedArray[j]);
    }

    addConnections(mylinks);
  }
}
 