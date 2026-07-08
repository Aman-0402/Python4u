// Enhanced Python eBook Script with Achievements and Progress Tracking

// Wrap each <pre> in IDE window chrome + inject copy button
function addCopyButtons(container) {
  // Code blocks
  container.querySelectorAll('pre').forEach(function (pre) {
    if (pre.closest('.code-wrapper')) return;

    var wrapper = document.createElement('div');
    wrapper.className = 'code-wrapper';

    var header = document.createElement('div');
    header.className = 'code-header';
    header.innerHTML =
      '<span class="term-dots">' +
        '<span class="dot-r">&#11044;</span>' +
        '<span class="dot-y">&#11044;</span>' +
        '<span class="dot-g">&#11044;</span>' +
      '</span>' +
      '<span class="code-fname">main.py</span>';

    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'copy-btn';
    btn.textContent = 'Copy';
    btn.addEventListener('click', function () {
      var codeEl = pre.querySelector('code');
      var text = codeEl ? codeEl.innerText : pre.innerText;
      navigator.clipboard.writeText(text).then(function () {
        btn.textContent = '✓ Copied';
        btn.classList.add('copied');
        setTimeout(function () {
          btn.textContent = 'Copy';
          btn.classList.remove('copied');
        }, 1800);
      });
    });

    header.appendChild(btn);
    pre.parentNode.insertBefore(wrapper, pre);
    wrapper.appendChild(header);
    wrapper.appendChild(pre);
  });

  // Output blocks — add "▶ Output" header
  container.querySelectorAll('.output-block').forEach(function (block) {
    if (block.closest('.output-wrapper')) return;
    var wrapper = document.createElement('div');
    wrapper.className = 'output-wrapper';
    var header = document.createElement('div');
    header.className = 'output-header';
    header.innerHTML = '<span>&#9654;</span><span>Output</span>';
    block.parentNode.insertBefore(wrapper, block);
    wrapper.appendChild(header);
    wrapper.appendChild(block);
  });
}

// Re-execute <script> tags injected via innerHTML (browser skips them by default)
function executeScripts(container) {
  container.querySelectorAll('script').forEach(function (oldScript) {
    var newScript = document.createElement('script');
    Array.from(oldScript.attributes).forEach(function (attr) {
      newScript.setAttribute(attr.name, attr.value);
    });
    newScript.textContent = oldScript.textContent;
    oldScript.parentNode.replaceChild(newScript, oldScript);
  });
}

// Achievement system
const achievements = {
  firstVisit: { name: 'First Steps', description: 'Welcome to Python eBook!', icon: '🎉' },
  firstTopic: { name: 'Knowledge Seeker', description: 'Completed your first topic', icon: '📚' },
  compiler: { name: 'Code Runner', description: 'Used the Python compiler', icon: '🚀' },
  quiz: { name: 'Quiz Master', description: 'Completed a quiz', icon: '🎯' },
  darkMode: { name: 'Night Owl', description: 'Tried dark mode', icon: '🌙' },
  progress25: { name: 'Quarter Way', description: '25% progress completed', icon: '🏃‍♂️' },
  progress50: { name: 'Halfway There', description: '50% progress completed', icon: '🎯' },
  progress75: { name: 'Almost There', description: '75% progress completed', icon: '🏆' },
  progress100: { name: 'Python Master', description: 'Completed all topics!', icon: '👑' }
};

// Initialize achievements
function initializeAchievements() {
  if (!localStorage.getItem('achievements')) {
    localStorage.setItem('achievements', JSON.stringify({}));
  }
}

// Award achievement
function awardAchievement(achievementKey) {
  const userAchievements = JSON.parse(localStorage.getItem('achievements') || '{}');
  if (!userAchievements[achievementKey]) {
    userAchievements[achievementKey] = {
      ...achievements[achievementKey],
      earnedAt: new Date().toISOString()
    };
    localStorage.setItem('achievements', JSON.stringify(userAchievements));
    
    // Show achievement notification
    if (typeof Swal !== 'undefined') {
      Swal.fire({
        title: `Achievement Unlocked! ${achievements[achievementKey].icon}`,
        text: achievements[achievementKey].name,
        icon: 'success',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        background: '#f0f8ff'
      });
    }
  }
}

// Track topic completion
function markTopicCompleted(topicFile) {
  const completedTopics = JSON.parse(localStorage.getItem('completedTopics') || '[]');
  if (!completedTopics.includes(topicFile)) {
    completedTopics.push(topicFile);
    localStorage.setItem('completedTopics', JSON.stringify(completedTopics));
    
    // Award achievements
    if (completedTopics.length === 1) {
      awardAchievement('firstTopic');
    }
    
    // Check progress achievements
    const progress = (completedTopics.length / 37) * 100;
    if (progress >= 25 && progress < 50) {
      awardAchievement('progress25');
    } else if (progress >= 50 && progress < 75) {
      awardAchievement('progress50');
    } else if (progress >= 75 && progress < 100) {
      awardAchievement('progress75');
    } else if (progress >= 100) {
      awardAchievement('progress100');
    }
    
    updateProgress();
  }
}

// Update progress display
function updateProgress() {
  const completedTopics = JSON.parse(localStorage.getItem('completedTopics') || '[]');
  const total = 37;
  const percent = Math.round((completedTopics.length / total) * 100);
  
  const completedElement = document.getElementById('completedTopics');
  const percentElement = document.getElementById('progressPercent');
  const progressBar = document.getElementById('progressBar');
  
  if (completedElement) completedElement.textContent = completedTopics.length;
  if (percentElement) percentElement.textContent = percent + '%';
  if (progressBar) progressBar.style.width = percent + '%';
}

// Enhanced topic loading function
function loadTopic(topicFile) {
  const link = document.querySelector(`[data-file="${topicFile}"]`);
  if (link) {
    link.click();
  }
}

// Add interactive effects to feature cards
function initializeFeatureCards() {
  document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('click', function() {
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = '';
      }, 150);
    });
  });
}

// Add hover effects to main image
function initializeImageEffects() {
  const mainImage = document.getElementById('mainImage');
  if (mainImage) {
    mainImage.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.02)';
    });

    mainImage.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)';
    });
  }
}

// Show welcome message
function showWelcomeMessage() {
  if (!localStorage.getItem('hasVisited')) {
    setTimeout(() => {
      if (typeof Swal !== 'undefined') {
        Swal.fire({
          title: 'Welcome to Python eBook! 🐍',
          text: 'Ready to start your Python journey?',
          icon: 'success',
          confirmButtonText: 'Let\'s Go!',
          background: '#f0f8ff',
          backdrop: `
            rgba(0,0,123,0.4)
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext y='50' font-size='5' text-anchor='middle'%3E🐍%3C/text%3E%3C/svg%3E")
            left top
            no-repeat
          `
        });
      }
    }, 1000);
    localStorage.setItem('hasVisited', 'true');
  }
}

// Initialize all enhanced features
function initializeEnhancedFeatures() {
  // Initialize achievements
  initializeAchievements();
  
  // Award first visit achievement
  if (!localStorage.getItem('hasVisited')) {
    awardAchievement('firstVisit');
  }
  
  // Update progress
  updateProgress();
  
  // Initialize interactive elements
  initializeFeatureCards();
  initializeImageEffects();
  
  // Show welcome message
  showWelcomeMessage();
}

// Enhanced dark mode toggle
function enhanceDarkModeToggle() {
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('change', function () {
      if (themeToggle.checked) {
        awardAchievement('darkMode');
      }
    });
  }
}

// Enhanced sidebar toggle
function enhanceSidebarToggle() {
  const menuBtn = document.getElementById('menuBtn');
  const sidebar = document.getElementById('sidebar');
  
  if (menuBtn && sidebar) {
    menuBtn.addEventListener('click', () => {
      // Add bounce effect
      menuBtn.style.transform = 'scale(0.9)';
      setTimeout(() => menuBtn.style.transform = '', 150);
    });
  }
}

// Enhanced topic link handling
function enhanceTopicLinks() {
  const links = document.querySelectorAll('.topic-link');
  const content = document.getElementById('content');
  
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const file = link.getAttribute('data-file');

      if (file) {
        // Fade-out current content before fetching
        if (content) content.classList.add('content-loading');

        fetch(`topics/${file}`)
          .then(res => res.text())
          .then(data => {
            // Wait for fade-out (180ms matches CSS transition), then swap
            setTimeout(function () {
              if (content) {
                content.innerHTML = data;

                // Execute <script> tags injected via innerHTML
                executeScripts(content);
                addCopyButtons(content);

                // Close sidebar, expand content
                const sidebar = document.getElementById('sidebar');
                if (sidebar) sidebar.classList.add('closed');
                document.body.classList.add('sidebar-collapsed');

                // Remove loading class → triggers fade-in via CSS transition
                content.classList.remove('content-loading');

                // Scroll to top smoothly
                window.scrollTo({ top: 0, behavior: 'smooth' });

                // Mark topic as completed
                markTopicCompleted(file);
              }

              if (file === 'compiler.html') {
                awardAchievement('compiler');
              }
            }, 180);
          })
          .catch(() => {
            if (content) {
              content.classList.remove('content-loading');
              content.innerHTML = `
                <div style="text-align:center;padding:50px;">
                  <div style="font-size:3em;margin-bottom:20px;">&#128532;</div>
                  <h2>Oops! Something went wrong</h2>
                  <p>Could not load the topic "${file}".</p>
                  <button type="button" onclick="location.reload()" style="padding:10px 20px;background:#4CAF50;color:white;border:none;border-radius:5px;cursor:pointer;">Try Again</button>
                </div>
              `;
            }
          });
      }
    });
  });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initializeEnhancedFeatures();
  enhanceDarkModeToggle();
  enhanceSidebarToggle();
  enhanceTopicLinks();
});

// Export functions for use in main script
window.loadTopic = loadTopic;
window.updateProgress = updateProgress;
window.markTopicCompleted = markTopicCompleted;
window.awardAchievement = awardAchievement; 