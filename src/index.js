import { diffLines } from 'diff';

// Helper function to escape HTML special characters
function escapeHtml(text) {
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;',
    };
    return text.replace(/[&<>"']/g, function (m) { return map[m]; });
  }

// Function to create the diff result with proper formatting
function createDiff(oldText, newText) {
    const changes = diffLines(oldText, newText);
    let result = '';
  
    // Loop through the changes and format them for display
    changes.forEach(change => {
      const escapedValue = escapeHtml(change.value);  // Escape HTML characters in the text
      if (change.added) {
        result += `<div class="added">+ ${escapedValue.replace(/\n/g, '<br>')}</div>`;
      } else if (change.removed) {
        result += `<div class="removed">- ${escapedValue.replace(/\n/g, '<br>')}</div>`;
      } else {
        result += `<div>  ${escapedValue.replace(/\n/g, '<br>')}</div>`;
      }
    });
  
    return result;
  }

// Export the createDiff function so it can be used elsewhere
export { createDiff };

// Add event listener to handle the user input and show the diff
document.getElementById('compareBtn').addEventListener('click', () => {
  // Get the input text from the textarea elements
  const oldText = document.getElementById('oldText').value;
  const newText = document.getElementById('newText').value;

  // Call the createDiff function to generate the differences
  const diffResult = createDiff(oldText, newText);

  // Display the result in the 'diffOutput' div
  document.getElementById('diffOutput').innerHTML = diffResult;
});