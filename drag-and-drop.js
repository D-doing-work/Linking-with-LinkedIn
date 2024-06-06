// Allow drop function
function allowDrop(ev) {
  ev.preventDefault();
}

// Drag function
function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

// Drop function
function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  var draggedElement = document.getElementById(data);

  // Check if the drop target is a groupbox and append the dragged element
  if (ev.target.classList.contains('groupbox')) {
    if (!ev.target.contains(draggedElement)) {
      ev.target.appendChild(draggedElement);
      
    }
  }
}

// Function to change the background color of all boxes and show modal when the button is pressed
function pressButton() {
  let correctCount = 0;
  document.querySelectorAll('.groupbox').forEach(box => {
    const imgs = box.querySelectorAll('img');

    console.log('Box ID:', box.id, 'Number of images:', imgs.length);

    if (imgs.length !== 2) {
      box.style.backgroundColor = 'red';
    } else {
      // Check if the image is the correct match for the box
      const imgIds = Array.from(imgs).map(img => img.id);
      console.log('Image IDs in the box:', imgIds);
      if (isValidMatch(box.id, imgIds)) {
        box.style.backgroundColor = 'green';
        correctCount++;
      } else {
        box.style.backgroundColor = 'orange';
      }
    }
  });

  showModal(correctCount);
  disableSubmitButton(); // Disable the submit button after it is clicked
}

// Add event listeners to all groupbox elements
document.querySelectorAll('.groupbox').forEach(box => {
  box.addEventListener('drop', drop);
  box.addEventListener('dragover', allowDrop);
});

// Add event listener to the button
document.getElementById('cherry').addEventListener('click', pressButton);

// Helper function to check if the image is the correct match for the box
function isValidMatch(boxId, imgIds) {
  // Define the valid box-image pairs
  const validMatches = {
    'box1': 'drag1',
    'box2': 'drag2',
    'box3': 'drag3',
    'box4': 'drag4',
    'box5': 'drag5',
    'box6': 'drag6',
    'box7': 'drag7',
    'box8': 'drag8',
    'box9': 'drag9',
    'box10': 'drag10'    
  };

  // Check if the given box contains the correct image
  return validMatches[boxId] === imgIds[0] || validMatches[boxId] === imgIds[1];
}

// Function to show the modal with the result
function showModal(correctCount) {
  var modal, span;

  if (correctCount === 10) {
    modal = document.getElementById("myModal2");
  } else {
    modal = document.getElementById("myModal");
    document.querySelector("#myModal .modal-content h1").innerText = `SO CLOSE! (ɔ◔-◔)ɔ`;
    document.querySelector("#myModal .modal-content p").innerText = `You got ${correctCount} correct. Try again!`;
  }

  modal.style.display = "block";

  span = modal.querySelector(".close");

  span.onclick = function() {
    modal.style.display = "none";
  }

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
}

// Function to disable the submit button
function disableSubmitButton() {
  var btn = document.getElementById('cherry');
  btn.disabled = true;
  btn.removeEventListener('click', pressButton);
}


// Function to show the modal with the result
function showModal(correctCount) {
  var modal;

  if (correctCount === 10) {
    modal = document.getElementById("myModal2");
  } else {
    modal = document.getElementById("myModal");
    document.querySelector("#myModal .modal-content h1").innerText = `SO CLOSE! (ɔ◔-◔)ɔ`;
    document.querySelector("#myModal .modal-content p").innerText = `You got ${correctCount} correct. Try again!`;
  }

  modal.style.display = "block";

  // Add event listener to the "Try Again" button
  var tryAgainBtn = modal.querySelector("#tryAgain");
  tryAgainBtn.addEventListener("click", function() {
    window.location.reload(); // Reload the page
  });

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
}
