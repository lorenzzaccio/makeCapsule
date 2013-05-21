/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


//test if parent group exists or create a new group at the end of the file
function testParent(selectedNode) {
    //test if of type object
    var nodeValid = false;
    if (typeof(selectedNode.parentNode) == "object") {
    	if (selectedNode.parentNode.nodeName == "svg" || this.parentNode.nodeName == "g") {
    		selectedNode.parentGroup = selectedNode.parentNode;
    		nodeValid = true;
    	}
    }
    else if (typeof(this.parentNode) == "string") { 
    	//first test if Windows group exists
    	if (!document.getElementById(selectedNode.parentNode)) {
        	selectedNode.parentGroup = document.createElementNS(svgNS,"g");
        	selectedNode.parentGroup.setAttributeNS(null,"id",selectedNode.parentNode);
        	document.documentElement.appendChild(selectedNode.parentGroup);
        	nodeValid = true;
   		}
   		else {
       		selectedNode.parentGroup = document.getElementById(selectedNode.parentNode);
       		nodeValid = true;
   		}
   	}
   	return nodeValid;
}

function createGroup(){
    var newGroup = document.createElementNS(svgNS,"g");
    
}