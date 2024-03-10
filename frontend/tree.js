document.addEventListener('DOMContentLoaded', function() {
    const treeContainer = document.getElementById('tree');
    const center = { x: treeContainer.offsetWidth / 2, y: treeContainer.offsetHeight / 2 };
    const radius = 200; // Distance from center to the nodes
    const nodeSize = 50; // Size of the nodes, assuming square nodes

    // Function to draw a line between two points
    function drawLine(container, x1, y1, x2, y2) {
        const line = document.createElement('div');
        line.style.position = 'absolute';
        line.style.height = '1px';
        line.style.backgroundColor = 'black';
        const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
        const angle = Math.atan2(y2 - y1, x2 - x1);
        line.style.width = `${length}px`;
        line.style.left = `${x1}px`;
        line.style.top = `${y1}px`;
        line.style.transform = `rotate(${angle}rad)`;
        line.style.transformOrigin = '0 0';
        container.appendChild(line);
    }

    // Create and style the root node, place it exactly at the center of the container
    const rootNode = document.createElement('div');
    rootNode.className = 'node root';
    rootNode.innerText = 'Root';
    rootNode.style.left = `${center.x - nodeSize / 2}px`; // Centering the node without adjust variable
    rootNode.style.top = `${center.y - nodeSize / 2}px`; // Centering the node without adjust variable
    treeContainer.appendChild(rootNode);

    const numberOfNodes = 5;
    const adjust = nodeSize / 2; // Center adjustment for child nodes

    // Create child nodes and connect them to the root
    for (let i = 0; i < numberOfNodes; i++) {
        const angle = (i / numberOfNodes) * (2 * Math.PI); // Angle for each node
        const x = center.x + radius * Math.cos(angle) - adjust; // X position adjusted for node size
        const y = center.y + radius * Math.sin(angle) - adjust; // Y position

        const nodeElement = document.createElement('div');
        nodeElement.className = 'node';
        nodeElement.innerText = `Node ${i + 1}`;
        nodeElement.style.left = `${x}px`;
        nodeElement.style.top = `${y}px`;
        treeContainer.appendChild(nodeElement);

        // Draw a line from the center of the root node to the center of this child node
        drawLine(treeContainer, center.x, center.y, x + adjust, y + adjust);
    }
});
