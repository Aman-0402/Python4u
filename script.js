// ── Back-to-top visibility ───────────────────────────
window.addEventListener('scroll', function () {
  var btn = document.getElementById('toTopBtn');
  if (btn) {
    if (window.scrollY > 300) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }
}, { passive: true });

// ── Sidebar toggle ──────────────────────────────────
const menuBtn = document.getElementById('menuBtn');
const sidebar = document.getElementById('sidebar');

menuBtn.addEventListener('click', () => {
  sidebar.classList.toggle('closed');
  if (sidebar.classList.contains('closed')) {
    document.body.classList.add('sidebar-collapsed');
  } else {
    document.body.classList.remove('sidebar-collapsed');
  }
});

// ── Dark / light mode ────────────────────────────────
var themeToggle = document.getElementById('themeToggle');

window.addEventListener('DOMContentLoaded', function () {
  var saved = localStorage.getItem('theme');
  if (saved === 'dark') {
    document.body.classList.add('dark');
    if (themeToggle) themeToggle.checked = true;
  } else {
    document.body.classList.remove('dark');
    if (themeToggle) themeToggle.checked = false;
  }
});

if (themeToggle) {
  themeToggle.addEventListener('change', function () {
    if (themeToggle.checked) {
      document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  });
}

// ── Copy protection ──────────────────────────────────
document.addEventListener('copy', function (event) {
  const selection  = window.getSelection();
  const selectedText = selection.toString().trim();
  let allow = false;

  if (selection.rangeCount > 0) {
    let node = selection.getRangeAt(0).commonAncestorContainer;
    if (node.nodeType !== 1) node = node.parentElement;
    if (
      node.closest('.quiz-question') ||
      node.closest('.answer') ||
      node.closest('pre') ||
      node.closest('code') ||
      node.closest('.terminal-out') ||
      selectedText.length <= 60
    ) {
      allow = true;
    }
  }

  if (!allow) {
    event.preventDefault();
    event.clipboardData.setData(
      'text/plain',
      "Type it — that's how you learn. 😏"
    );
  }
});

// ── Global quiz helpers (called by inline onclick in topic files) ─
function checkAnswer(element, status) {
  const questionDiv = element.closest('.quiz-question');
  const questionText = questionDiv.querySelector('p')?.textContent || '';
  const cleanQ = questionText.replace(/^\d+\.\s*/, '');
  const correctLi = questionDiv.querySelector('li[onclick*="correct"]');
  const correctText = correctLi ? correctLi.textContent.replace(/^[a-z]\)\s*/i, '') : '';

  if (status === 'correct') {
    element.classList.add('correct');
    if (typeof Swal !== 'undefined') {
      Swal.fire({
        icon: 'success',
        title: 'Correct!',
        html: `✅ <b>${cleanQ}</b><br><br>You got it right!`,
        timer: 2000,
        showConfirmButton: false,
        background: document.body.classList.contains('dark') ? '#0d1117' : '#f0f9f0'
      });
    }
  } else {
    element.classList.add('wrong');
    if (typeof Swal !== 'undefined') {
      Swal.fire({
        icon: 'error',
        title: 'Wrong Answer',
        html: `❌ <b>${cleanQ}</b><br><br>
               Your answer: ${element.textContent.trim()}<br>
               Correct: <b>${correctText}</b>`,
        timer: 3500,
        showConfirmButton: true,
        background: document.body.classList.contains('dark') ? '#0d1117' : '#fff0f0'
      });
    }
  }
}

function toggleSolution(button) {
  const solutionDiv = button.previousElementSibling;
  const hidden = solutionDiv.style.display === 'none' || solutionDiv.style.display === '';
  solutionDiv.style.display = hidden ? 'block' : 'none';
  button.textContent = hidden ? 'Hide Solution' : 'Show Solution';
}

function toggleAnswer(button) {
  const answerDiv = button.nextElementSibling;
  const hidden = answerDiv.style.display === 'none' || answerDiv.style.display === '';
  answerDiv.style.display = hidden ? 'block' : 'none';
  button.textContent = hidden ? 'Hide Answer' : 'Show Answer';
}
