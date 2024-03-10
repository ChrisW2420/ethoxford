document.addEventListener('DOMContentLoaded', function() {
    const treeContainer = document.getElementById('tree');
    const center = { x: treeContainer.offsetWidth / 2, y: treeContainer.offsetHeight / 2 };
    const radius = 200; // Distance from center to the nodes
    const nodeSize = 50; // Size of the nodes, assuming square nodes
    const nodeRadius = nodeSize / 2; // Radius of the node circles


    // Function to draw a line between two points with adjustments
    function drawLine(container, x1, y1, x2, y2) {
        // Offset for start and end points to account for node radius
        const offsetX = x2 - x1;
        const offsetY = y2 - y1;
        const distance = Math.sqrt(offsetX ** 2 + offsetY ** 2);
        const ratio = (distance - nodeRadius) / distance;
        const adjustedX2 = x1 + offsetX * ratio;
        const adjustedY2 = y1 + offsetY * ratio;

        const line = document.createElement('div');
        line.style.position = 'absolute';
        line.style.height = '4px'; // Make line thicker
        line.style.backgroundColor = 'gray'; // Change line color to gray
        const length = Math.sqrt((adjustedX2 - x1) ** 2 + (adjustedY2 - y1) ** 2);
        const angle = Math.atan2(adjustedY2 - y1, adjustedX2 - x1);
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
    rootNode.style.left = `${center.x - nodeRadius}px`; // Centering the node
    rootNode.style.top = `${center.y - nodeRadius}px`; // Centering the node
    treeContainer.appendChild(rootNode);

    const numberOfNodes = 5;

    // Create child nodes and connect them to the root
    for (let i = 0; i < numberOfNodes; i++) {
        const angle = (i / numberOfNodes) * (2 * Math.PI); // Angle for each node
        const x = center.x + radius * Math.cos(angle) - nodeRadius; // X position adjusted for node size
        const y = center.y + radius * Math.sin(angle) - nodeRadius; // Y position

        const nodeElement = document.createElement('div');
        nodeElement.className = 'node';
        nodeElement.innerText = `Node ${i + 1}`;
        nodeElement.style.left = `${x}px`;
        nodeElement.style.top = `${y}px`;
        treeContainer.appendChild(nodeElement);

        // Draw a line from the center of the root node to just before the edge of this child node
        drawLine(treeContainer, center.x, center.y, x + nodeRadius, y + nodeRadius);
    }
});
