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
    console.log(linkedArray_sub); 
    var linkedrootnode_sub = findlinkednode(root_sub.id,linkedArray2_sub);
   
    recursive(linkedrootnode);
    recursive(linkedrootnode_sub);
  

    var deep = linkedrootnode.level;
    var deep_sub = linkedrootnode_sub.level;

   
     for (var n = deep; n > 0; n--) {
      for (var j = 0; j < linkedArray.length; j++) {
        var lnode = linkedArray[j];  
        if (lnode.level == n) {
          var precon = lnode.prevconnectors;
          var _array = new Array();
          _array.push(0);
           for (var k = 0; k < precon.length; k++) {  
            if (precon[k] == null) continue;
            var con = precon[k];
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
  
    /*check the student vlaue*/
    for (var n = deep_sub; n > 0; n--) {
      for (var j = 0; j < linkedArray_sub.length; j++) {
        var lnode = linkedArray_sub[j];  
        if (lnode.level == n) {
          var precon = lnode.prevconnectors;
          var _array = new Array();
           console.log(precon.length);
          for (var k = 0; k < precon.length; k++) {  
            if (precon[k] == null) continue;
            var con = precon[k]; 
            if (con.activity == 0) {
              var parentlinkednode = findlinkednode(con.h,linkedArray2_sub);
              var parentnode = parentlinkednode.node;
              _array.push(+parentnode.EFT + +con.LT);
            }
            if (con.activity == 1) {
              var parentlinkednode = findlinkednode(con.h,linkedArray2_sub);
              var parentnode = parentlinkednode.node;
              _array.push(+parentnode.EST + +con.LT);
            }
            if (con.activity == 2) {
              var parentlinkednode = findlinkednode(con.h,linkedArray2_sub);
              var parentnode = parentlinkednode.node;
              var duration = du[lnode.node.activity];
              var temp = +parentnode.EFT + +con.LT - +duration;
              _array.push(temp);
            }
            if (con.activity == 3) {
              var parentlinkednode = findlinkednode(con.h,linkedArray2_sub);
              var parentnode = parentlinkednode.node;
              var duration = du[lnode.node.activity];
              var temp = +parentnode.EST + +con.LT - +duration;
              _array.push(temp);
            }
          }
          var maxValudeofParentEFT = Math.max.apply(Math, _array);
         checkEST(lnode.node, maxValudeofParentEFT);
         checkEFT(lnode.node);
       
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

    var project_duration_sub = 0;
    for (var i = 1; i <= deep_sub; i++) {
      for (var j = 0; j < linkedArray_sub.length; j++) {
        var lnode = linkedArray_sub[j];
        var nodeEFT = lnode.node.EFT;
        if (project_duration_sub < nodeEFT) {
          project_duration_sub = nodeEFT;
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

     //loop thrugh and  calcualte differerent fields
     for (var i = 1; i <= deep_sub; i++) {
      for (var j = 0; j < linkedArray_sub.length; j++) {
        var lnode = linkedArray_sub[j];
        if (lnode.level == i) {
          var nextcon = lnode.nextconnectors;
          var _array = new Array();
          var _array2 = new Array();
          _array.push(project_duration_sub);
          _array2.push(project_duration_sub);
          for (var k = 0; k < nextcon.length; k++) {
            var con = nextcon[k];
            if (con == null) continue;
            //finish to start;
            if (con.activity == 0) {
              var parentlinkednode = findlinkednode(con.t,linkedArray2_sub);
              var parentnode = parentlinkednode.node;
              _array.push(+parentnode.LST + -+con.LT);

              var diff = +parentnode.EST - lnode.node.EFT;
              var ff = diff - con.LT;
              _array2.push(ff);
            }
            //start to start
            if (con.activity == 1) {
              var parentlinkednode = findlinkednode(con.t,linkedArray2_sub);
              var parentnode = parentlinkednode.node;
              var duration = du[lnode.node.activity];
              _array.push(+parentnode.LST - con.LT + +duration);

              var diff = parentnode.EST - lnode.node.EST;
              var ff = diff - con.LT;
              _array2.push(ff);
            }
            //finish to finish
            if (con.activity == 2) {
              var parentlinkednode = findlinkednode(con.t,linkedArray2_sub);
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
              var parentlinkednode = findlinkednode(con.t,linkedArray2_sub);
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
          checkLFT(lnode.node, minEFT);
          checkLST(lnode.node);
          checkTF(lnode.node);
         
          //calculateLFT(lnode.node, minEFT);
          //calculateLST(lnode.node);
          //calculateTF(lnode.node);
          _array2.push(lnode.node.TF);
          var minFF = Math.min.apply(Math, _array2);
          checkFF(lnode.node, minFF);
         // calculateFF(lnode.node, minFF);
        }
      }
    }



 
  console.log(linkedArray);
  console.log(linkedArray_sub);


  /*for (n = 0; n < linkedArray_sub.length; n++) {
    var node = linkedArray_sub[n].node;
     for (m = 0; m < myNodes.length; m++) {
      var node2 = myNodes[m];
       if (node.id == node2.id) {
         if (node.EFT == node2.EFT) {
          node.EFT_color= "green";
         }else{
          node.EFT_color= "red";
         }
         if (node.EST == node2.EST) {
          node.EST_color= "green";
         } else{
          node.EST_color= "red";
         }
          if (node.LFT == node2.LFT) {
            node.LFT_color= "green";
          } else{
            node.LFT_color= "red";
          }
          if (node.LST == node2.LST) {
            node.LST_color= "green";
          } else{
            node.LST_color= "red";
          }
          if (node.FF == node2.FF) {
            node.FF_color= "green";
          } else{
            node.FF_color= "red";
          }
          if (node.TF == node2.TF) {
            node.TF_color= "green";
          } else{
            node.TF_color= "red";
          }
      } 
    }
  }
  console.log(linkedArray_sub) ;
 */
 
   calculateLinkedArrayAndValues(answer_Nodes, answer_Links); 
   compareAndUpdateNodes(linkedArray,linkedArray_sub);
   // need to updateanswerlinks; 
   console.log(linkedArray);
   
   for (n = 0; n < linkedArray.length; n++) {
    var node = linkedArray[n].node;
    if (node.color == "red")   {
        node.left_red = "red";
        node.right_red = "red";

    }
   }  
   
 
   for (m = 0; m < answer_Links.length; m++) {
    var link = answer_Links[m]; 
   

    leftnode = findlinkednode(link.h,linkedArray);
    leftnodedata = leftnode.node;
    rightnode = findlinkednode(link.t, linkedArray);
    rightnodedata = rightnode.node;
   
     if(rightnodedata.left_red =="red" && leftnodedata.right_red =="red"){ 
      link.boder_color = "red";
     }
   //console.log(link); 
   
  } 

    for (n = 0; n < linkedArray.length; n++) {
      var node = linkedArray[n].node;
      console.log(node);
      drawnode(node);
    } 
    console.log(answer_Links);
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
      var link = findlink_correct(head, linkedNode.id);
      prevlink.push(link);
    }
    linkedNode.prevconnectors = prevlink;

    var suclink = Array();
    for (s = 0; s < successors.length; s++) {
      var tail = successors[s].id;
      var link = findlink_correct(linkedNode.id, tail);
      suclink.push(link);
    }
    linkedNode.nextconnectors = suclink;
  }
   
  return {linkedArray, linkedArray2}
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
 