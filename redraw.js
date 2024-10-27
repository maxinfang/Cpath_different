// Main redraw function
function redraw(student_string, correct_string) {
  const myNodes = deserialiseC(student_string);
  const mylinks = deserialiseL(student_string);
  const answer_Nodes = deserialiseC(correct_string);
  const answer_Links = deserialiseL(correct_string);

  if (myNodes.length === 0) return;

  // Handle different modes
  switch (mode) {
    case "submission":
      handleSubmissionMode(myNodes, mylinks);
      break;
    case "student":
      handleStudentMode(myNodes, mylinks, answer_type);
      break;
    case "correct":
      handleCorrectMode(myNodes, mylinks, answer_Nodes, answer_Links, answer_type);
      break;
  }
}

// Mode handlers
function handleSubmissionMode(nodes, links) {
  nodes.forEach(node => drawnode(node));
  addConnections(links);
}

function handleStudentMode(nodes, links, answerType) {
  if (answerType === "overlapping") {
    // Implementation for student overlapping mode
    // Currently commented out in original code
  }
}

function handleCorrectMode(myNodes, mylinks, answer_Nodes, answer_Links, answerType) {
  switch (answerType) {
    case "overlapping":
      handleOverlappingMode(myNodes, mylinks, answer_Nodes, answer_Links);
      break;
    case "precedence":
      handlePrecedenceMode(myNodes, mylinks, answer_Nodes);
      break;
    case "arrow":
      handleArrowMode(myNodes, mylinks);
      break;
  }
}

// Helper functions for node processing
function processLinkedArray(nodes, links) {
  const linkedArray = [];
  const linkedArray2 = [];

  // Create linked nodes
  nodes.forEach(node => {
    const linkedNode = new NodeClass(node);
    linkedArray.push(linkedNode);
    linkedArray2.push(linkedNode);
  });

  // Set up connections
  linkedArray.forEach(linkedNode => {
    const [parents, children] = findParentsAndChildren(linkedNode, links);
    linkedNode.prevNode = parents;
    linkedNode.nextNodes = children;
  });

  return [linkedArray, linkedArray2];
}

function findParentsAndChildren(linkedNode, links) {
  const parents = [];
  const children = [];

  links.forEach(link => {
    if (link.t === linkedNode.id) {
      parents.push(findlinkednode(link.h));
    }
    if (link.h === linkedNode.id) {
      children.push(findlinkednode(link.t));
    }
  });

  return [parents, children];
}

// Calculation functions
function calculateNodeTimings(linkedArray, deep) {
  for (let n = deep; n > 0; n--) {
    linkedArray.forEach(lnode => {
      if (lnode.level === n) {
        const maxParentEFT = calculateMaxParentEFT(lnode);
        calculateEST(lnode.node, maxParentEFT);
        calculateEFT(lnode.node);
      }
    });
  }
}

function calculateProjectDuration(linkedArray, deep) {
  let duration = 0;
  for (let i = 1; i <= deep; i++) {
    linkedArray.forEach(lnode => {
      duration = Math.max(duration, lnode.node.EFT);
    });
  }
  return duration;
}

// Node comparison and update functions
function compareAndUpdateNodes(answer_Nodes, myNodes) {
  answer_Nodes.forEach(correctNode => {
    const studentNode = myNodes.find(node => node.activity === correctNode.activity);
    correctNode.color = studentNode ? "green" : "red";
  });
}

// Drawing functions
function drawNodesAndConnections(nodes, links) {
  nodes.forEach(node => drawnode(node));
  addConnections(links);
}
