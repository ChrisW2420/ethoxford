document.addEventListener('DOMContentLoaded', async function() {
    const treeContainer = document.getElementById('tree');
    const subscriptions = await get_user_subscriptions();
    const center = { x: treeContainer.offsetWidth / 2, y: treeContainer.offsetHeight / 2 };
    const radius = 200; // Distance from center to the nodes
    const nodeSize = 50; // Size of the nodes, assuming square nodes
    const nodeRadius = nodeSize / 2; // Radius of the node circles
    // 
    
    // Create and style the root node, place it exactly at the center of the container
    const rootNode = document.createElement('div');
    rootNode.className = 'node root';
    rootNode.innerText = 'Root';
    rootNode.style.left = `${center.x - nodeRadius}px`; // Centering the node
    rootNode.style.top = `${center.y - nodeRadius}px`; // Centering the node
    treeContainer.appendChild(rootNode);
    
    
    console.log(subscriptions);
    subscriptions.map((subscription, index)  => {
        const nodeElement = document.createElement('div');
        
        // Set up a click event listener for each nodes
        const angle = (index / subscriptions.length) * (2 * Math.PI); // Calculate the angle for each node
        const x = center.x + radius * Math.cos(angle) - nodeRadius; // Calculate the x position
        const y = center.y + radius * Math.sin(angle) - nodeRadius; // Calculate the y position
        
        nodeElement.className = 'node';
        nodeElement.innerText = subscription.name; // Display subscription name on the node
        nodeElement.style.position = 'absolute';
        nodeElement.style.left = `${x}px`;
        nodeElement.style.top = `${y}px`;
        treeContainer.appendChild(nodeElement);
        
        nodeElement.addEventListener('click', () => {
        const nodeElement = document.createElement('div');
            // Format and display subscription details; could be improved with HTML formatting
            infoDisplay.innerHTML = `
            <div><strong>Name:</strong> ${subscription.name}</div>
            <div><strong>Price:</strong> ${subscription.price}</div>
            <div><strong>Date:</strong> ${subscription.date}</div>
            <div><strong>Frequency:</strong> ${subscription.frequency} days</div>
            <div><strong>Ticker:</strong> ${subscription.ticker}</div>
            <div><strong>Smart Contract Address:</strong> ${subscription.smart_contract_address}</div>
            <div><strong>Virtual Card Address:</strong> ${subscription.virtual_card_address}</div>
            `;
        });
        drawLine(treeContainer, center.x, center.y, x + nodeRadius, y + nodeRadius);
    });


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
});
