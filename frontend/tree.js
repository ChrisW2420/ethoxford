document.addEventListener("DOMContentLoaded", async function () {
  const treeContainer = document.getElementById("tree");
  const subscriptions = await get_user_subscriptions();
  const center = {
    x: treeContainer.offsetWidth / 2,
    y: treeContainer.offsetHeight / 2,
  };
  const radius = 200; // Distance from center to the nodes
  const nodeSize = 50; // Size of the nodes, assuming square nodes
  const nodeRadius = nodeSize / 2; // Radius of the node circles
  //

  // Create and style the root node, place it exactly at the center of the container
  const rootNode = document.createElement("div");
  rootNode.className = "node root";
  rootNode.innerText = "";
  rootNode.style.left = `${center.x - nodeRadius}px`; // Centering the node
  rootNode.style.top = `${center.y - nodeRadius}px`; // Centering the node
  treeContainer.appendChild(rootNode);

  console.log(subscriptions);
  subscriptions.map((subscription, index) => {
    const nodeElement = document.createElement("div");

    // Set up a click event listener for each nodes
    const angle = (index / subscriptions.length) * (2 * Math.PI); // Calculate the angle for each node
    const x = center.x + radius * Math.cos(angle) - nodeRadius; // Calculate the x position
    const y = center.y + radius * Math.sin(angle) - nodeRadius; // Calculate the y position

    nodeElement.className = "node";
    nodeElement.innerText = subscription.name; // Display subscription name on the node
    nodeElement.style.position = "absolute";
    nodeElement.style.left = `${x}px`;
    nodeElement.style.top = `${y}px`;
    nodeElement.key = subscription.id;

    nextPaymentDate = new Date(subscription.date_pay_next);
    currentDate = new Date();
    period = subscription.period;
    diff = currentDate - nextPaymentDate;
    if (diff > period) {
      nodeElement.style.backgroundColor = "grey";
    } else if (diff > period) {
      nodeElement.style.backgroundColor = "green";
    } else {
      nodeElement.style.backgroundColor = "yellow";
    }

    treeContainer.appendChild(nodeElement);

    nodeElement.addEventListener("mouseover", () => {
      const dataDisplay = document.createElement("div");
      dataDisplay.id = "data_" + subscription.id;
      dataDisplay.key = "data_" + subscription.id;

      dataDisplay.innerHTML = `
        <div>
            <p>Price: ${subscription.price}</p>
            <p>Last paid date: ${subscription.date_last_paid}</p>
            <p>Next pay date: ${subscription.date_pay_next}</p>
        `;

      dataDisplay.style.position = "absolute";
      dataDisplay.style.left = `${x + nodeSize}px`;
      dataDisplay.style.top = `${y + nodeSize}px`;
      dataDisplay.style.fontSize = "12px";
      treeContainer.appendChild(dataDisplay);
    });

    nodeElement.addEventListener("mouseleave", () => {
      var elem = document.getElementById("data_" + subscription.id);
      elem.parentNode.removeChild(elem);
    });

    nodeElement.addEventListener("click", () => {
      if (document.getElementById(subscription.id)) {
        var elem = document.getElementById(subscription.id);
        elem.parentNode.removeChild(elem);
      } else {
        const smart_contract_address = subscription.smart_contract_address;

        const infoDisplay = document.createElement("div");
        infoDisplay.id = subscription.id;
        infoDisplay.key = subscription.id;

        console.log(subscription.price);
        infoDisplay.innerHTML = `
      <div><button type="button" onclick="sendEther('${smart_contract_address.toString()}', '${subscription.price.toString()}').then(update_subscription_dates('${
          subscription.id
        }', '${subscription.period}')).catch(console.error);">Pay</button></div>
      <div><button type="button" onclick="delete_subscription('${
        subscription.id
      }')">Delete</button></div>
      `;
        infoDisplay.style.position = "absolute";
        infoDisplay.style.left = `${x + nodeSize}px`;
        infoDisplay.style.top = `${y + nodeSize}px`;
        treeContainer.appendChild(infoDisplay);
      }
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

    const line = document.createElement("div");
    line.style.position = "absolute";
    line.style.height = "4px"; // Make line thicker
    line.style.backgroundColor = "gray"; // Change line color to gray
    const length = Math.sqrt((adjustedX2 - x1) ** 2 + (adjustedY2 - y1) ** 2);
    const angle = Math.atan2(adjustedY2 - y1, adjustedX2 - x1);
    line.style.width = `${length}px`;
    line.style.left = `${x1}px`;
    line.style.top = `${y1}px`;
    line.style.transform = `rotate(${angle}rad)`;
    line.style.transformOrigin = "0 0";
    container.appendChild(line);
  }
});
