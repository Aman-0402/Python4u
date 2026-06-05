// Toggle sidebar
const menuBtn = document.getElementById('menuBtn');
const sidebar = document.getElementById('sidebar');
const links = document.querySelectorAll('.topic-link');
const content = document.getElementById('content');
const toggleTheme = document.getElementById('toggleTheme');
//
menuBtn.addEventListener('click', () => {
  sidebar.classList.toggle('closed');

  // ✅ Correct logic: add 'sidebar-collapsed' when sidebar is closed
  if (sidebar.classList.contains('closed')) {
    document.body.classList.add('sidebar-collapsed');
  } else {
    document.body.classList.remove('sidebar-collapsed');
  }
}); 

// Auto-close sidebar and load topic content
links.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const file = link.getAttribute('data-file');

    if (file) {
      fetch(`topics/${file}`)
        .then(res => res.text())
        .then(data => {
          content.innerHTML = data;
          sidebar.classList.add('closed');
          document.body.classList.add('sidebar-collapsed'); // ✅ Keep this
          // Scroll to top of the page
          window.scrollTo({ top: 0, behavior: 'smooth' });
          
          // Initialize compiler if compiler.html is loaded
          if (file === 'compiler.html') {
            initializeCompiler();
          }
        })
        .catch(() => {
          content.innerHTML = `<h2>Error</h2><p>Sorry, the topic "${file}" could not be loaded.</p>`;
          window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    } else {
      const topicTitle = link.textContent;
      content.innerHTML = `<h2>${topicTitle}</h2><p>Content for "${topicTitle}" will be added here...</p>`;
      sidebar.classList.add('closed');
      document.body.classList.add('sidebar-collapsed');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });
});

// Dark/Light mode toggle
toggleTheme.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
});

// Load theme preference on page load
window.addEventListener('DOMContentLoaded', () => {
  const theme = localStorage.getItem('theme');
  if (theme === 'dark') {
    document.body.classList.add('dark');
  }
});

// Copy protection - prevent text copying except for quiz/MCQ content
// and allow short selections (<=50 chars)
document.addEventListener('copy', function(event) {
  const selection = window.getSelection();
  const selectedText = selection.toString().trim();

  let isQuizContent = false;
  if (selection.rangeCount > 0) {
    let node = selection.getRangeAt(0).commonAncestorContainer;
    if (node.nodeType !== 1) node = node.parentElement;
    if (
      node.closest('.quiz-question') ||
      node.closest('.answer') ||
      node.closest('ul') ||
      selectedText.length <= 50
    ) {
      isQuizContent = true;
    }
  }

  if (isQuizContent) {
    // Allow normal copying for quiz/MCQ content or short selections
    return;
  }

  // Prevent copying for other content
  event.preventDefault();
  event.clipboardData.setData('text/plain', "🙄 Oh, so you thought copying was the shortcut?\n" +
    "Newsflash: The only thing you're pasting is regret.\n" +
    "Now go type it like a real student. 😏");
});

// Compiler functionality
function initializeCompiler() {
  const codeEditor = document.getElementById('python-code');
  const runButton = document.getElementById('run-btn');
  const clearButton = document.getElementById('clear-btn');
  const exampleButton = document.getElementById('example-btn');
  const outputElement = document.getElementById('output');
  
  if (!codeEditor || !runButton || !clearButton || !exampleButton || !outputElement) {
    console.error('Compiler elements not found');
    return;
  }
  
  // Remove existing event listeners to prevent duplicates
  runButton.replaceWith(runButton.cloneNode(true));
  clearButton.replaceWith(clearButton.cloneNode(true));
  exampleButton.replaceWith(exampleButton.cloneNode(true));
  
  // Get fresh references after cloning
  const newRunButton = document.getElementById('run-btn');
  const newClearButton = document.getElementById('clear-btn');
  const newExampleButton = document.getElementById('example-btn');
  
  newRunButton.addEventListener('click', executePythonCode);
  newClearButton.addEventListener('click', clearAll);
  newExampleButton.addEventListener('click', loadExample);
  
  // Load initial example
  loadExample();
  
  async function executePythonCode() {
    const code = codeEditor.value.trim();
    
    if (!code) {
      showOutput('Please enter some Python code to run.', 'error');
      return;
    }
    
    showOutput('Running your Python code...', 'loading');
    newRunButton.disabled = true;
    newRunButton.innerHTML = '⏳ Running...';
    
    try {
      // Using a free online Python execution API
      const response = await fetch('https://emkc.org/api/v2/piston/execute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          language: 'python',
          version: '3.10.0',
          files: [{
            content: code
          }]
        })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.run) {
        if (data.run.stdout) {
          showOutput(data.run.stdout, 'success');
        } else if (data.run.stderr) {
          showOutput("Error:\n" + data.run.stderr, 'error');
        } else {
          showOutput('Program executed successfully with no output.', 'info');
        }
      } else {
        showOutput('Error: ' + (data.message || 'Unknown error occurred'), 'error');
      }
    } catch (error) {
      console.error('Execution error:', error);
      showOutput('Error: Unable to connect to Python execution service. Please check your internet connection and try again.', 'error');
    } finally {
      newRunButton.disabled = false;
      newRunButton.innerHTML = '▶️ Run Code';
    }
  }
  
  function clearAll() {
    codeEditor.value = '';
    showOutput('Ready to run Python code...', 'info');
  }
  
  function loadExample() {
    const exampleCode = `# Welcome to Python Compiler!
print("Hello, World!")

# Calculate Fibonacci sequence
def fibonacci(n):
    a, b = 0, 1
    for _ in range(n):
        print(a, end=' ')
        a, b = b, a + b

print("\\nFibonacci sequence:")
fibonacci(10)

# Simple calculator
def calculator(a, b, operation):
    if operation == '+':
        return a + b
    elif operation == '-':
        return a - b
    elif operation == '*':
        return a * b
    elif operation == '/':
        return a / b if b != 0 else "Error: Division by zero"
    else:
        return "Invalid operation"

print("\\nCalculator examples:")
print("10 + 5 =", calculator(10, 5, '+'))
print("10 * 5 =", calculator(10, 5, '*'))
print("10 / 2 =", calculator(10, 2, '/'))

# List comprehension example
numbers = [1, 2, 3, 4, 5]
squares = [x**2 for x in numbers]
print("\\nSquares of numbers:", squares)`;
    
    codeEditor.value = exampleCode;
    showOutput('Example code loaded! Click "Run Code" to execute it.', 'info');
  }
  
  function showOutput(message, type = 'info') {
    outputElement.textContent = message;
    outputElement.className = `output-${type}`;
  }
}

function checkAnswer(element, status) {
  const questionDiv = element.closest('.quiz-question');
  const questionText = questionDiv.querySelector('p').textContent;
  const cleanQuestionText = questionText.replace(/^\d+\.\s*/, '');

  const correctOption = questionDiv.querySelector('li[onclick*="correct"]').textContent;
  const correctAnswerText = correctOption.replace(/^[a-z]\)\s*/i, '');

  if (status === 'correct') {
    Swal.fire({
      icon: 'success',
      title: 'Correct!',
      html: `✅ <b>${cleanQuestionText}</b><br><br>You got it right!`,
      timer: 2000,
      showConfirmButton: false,
      background: '#f0f9f0'
    });
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Wrong Answer',
      html: `❌ <b>${cleanQuestionText}</b><br><br>
             Your selection: ${element.textContent.trim()}<br>
             Correct answer: <b>${correctAnswerText}</b>`,
      timer: 3000,
      showConfirmButton: true,
      background: '#fff0f0'
    });
  }

  element.style.backgroundColor = status === 'correct' ? '#d4edda' : '#f8d7da';
  setTimeout(() => {
    element.style.backgroundColor = '';
  }, 1000);
}

function toggleSolution(button) {
  const solutionDiv = button.previousElementSibling;
  if (solutionDiv.style.display === "none") {
    solutionDiv.style.display = "block";
    button.textContent = "Hide Solution";
  } else {
    solutionDiv.style.display = "none";
    button.textContent = "Show Solution";
  }
}

function toggleAnswer(button) {
  const answerDiv = button.nextElementSibling;
  if (answerDiv.style.display === "none") {
    answerDiv.style.display = "block";
    button.textContent = "Hide Answer";
  } else {
    answerDiv.style.display = "none";
    button.textContent = "Show Answer";
  }
}
