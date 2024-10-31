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
    console.log(root);
    var linkedArray = new Array();
    var linkedArray2 = new Array();
    for (n = 0; n < answer_Nodes.length; n++) {
      var node = answer_Nodes[n];
      var linkedNode = new NodeClass(node);
      linkedArray.push(linkedNode);
      linkedArray2.push(linkedNode);
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
   //ABOVE IS TO SET UP THE LINKED ARRAY


    var linkedrootnode = findlinkednode(root.id);
    recursive(linkedrootnode);
    var deep = linkedrootnode.level;

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
              var parentlinkednode = findlinkednode(con.h);
              var parentnode = parentlinkednode.node;
              _array.push(+parentnode.EFT + +con.LT);
            }
            if (con.activity == 1) {
              var parentlinkednode = findlinkednode(con.h);
              var parentnode = parentlinkednode.node;
              _array.push(+parentnode.EST + +con.LT);
            }
            if (con.activity == 2) {
              var parentlinkednode = findlinkednode(con.h);
              var parentnode = parentlinkednode.node;
              var duration = du[lnode.node.activity];
              var temp = +parentnode.EFT + +con.LT - +duration;
              _array.push(temp);
            }
            if (con.activity == 3) {
              var parentlinkednode = findlinkednode(con.h);
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
              var parentlinkednode = findlinkednode(con.t);
              var parentnode = parentlinkednode.node;
              _array.push(+parentnode.LST + -+con.LT);

              var diff = +parentnode.EST - lnode.node.EFT;
              var ff = diff - con.LT;
              _array2.push(ff);
            }
            //start to start
            if (con.activity == 1) {
              var parentlinkednode = findlinkednode(con.t);
              var parentnode = parentlinkednode.node;
              var duration = du[lnode.node.activity];
              _array.push(+parentnode.LST - con.LT + +duration);

              var diff = parentnode.EST - lnode.node.EST;
              var ff = diff - con.LT;
              _array2.push(ff);
            }
            //finish to finish
            if (con.activity == 2) {
              var parentlinkednode = findlinkednode(con.t);
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
              var parentlinkednode = findlinkednode(con.t);
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
   function compareAndUpdateNodes(linkded) {
     // Compare correct nodes to student nodes
     for (let i = 0; i < answer_Nodes.length; i++) {
       const correctNode = answer_Nodes[i];
       const studentNode = myNodes.find(node => node.activity === correctNode.activity);
       
       if (studentNode) { 
        correctNode.color = "green"; // Correct 
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
           parents.push(findlinkednode(link.h));
         }
         if (link.h === linkedNode.activity) {
           children.push(findlinkednode(link.t));
         }
       }

       linkedNode.prevNode = parents;
       linkedNode.nextNodes = children;
     }

     // Calculate values
     var linkedrootnode = findlinkednode(root.activity);
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


   // Execute the functions 
    
   var linked_array_answer = calculateLinkedArrayAndValues(); 
   compareAndUpdateNodes();

 
   // need to get this out make it a simpler logic. 
    for (n = 0; n < answer_Nodes.length; n++) {
      var node = answer_Nodes[n];
      console.log(node);
      drawnode(node);
    }
    
    addConnections(answer_Links);
  }

  function findlinkednode(id) {
    for (x = 0; x < linkedArray2.length; x++) {
      var li = linkedArray2[x];
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
      // linkedNode.node.parentID;
      // console.log(children);
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

    for (n = 0; n < myNodes.length; n++) {
      var node = myNodes[n];
      //console.log(node);
      drawnode(node);
    }
    addConnections(mylinks);

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
