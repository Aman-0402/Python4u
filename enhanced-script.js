// Enhanced Python eBook Script with Achievements and Progress Tracking

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
    const progress = (completedTopics.length / 18) * 100;
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
  const total = 18;
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
  const toggleTheme = document.getElementById('toggleTheme');
  if (toggleTheme) {
    toggleTheme.addEventListener('click', () => {
      // Add rotation animation
      toggleTheme.style.transform = 'rotate(180deg)';
      setTimeout(() => toggleTheme.style.transform = '', 300);
      
      // Award achievement for dark mode
      if (document.body.classList.contains('dark')) {
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

      // Add loading animation
      if (content) {
        content.innerHTML = `
          <div style="text-align: center; padding: 50px;">
            <div style="font-size: 3em; margin-bottom: 20px;">🐍</div>
            <div style="font-size: 1.5em; margin-bottom: 10px;">Loading...</div>
            <div style="width: 50px; height: 50px; border: 5px solid #f3f3f3; border-top: 5px solid #4CAF50; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto;"></div>
          </div>
          <style>
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          </style>
        `;
      }

      if (file) {
        fetch(`topics/${file}`)
          .then(res => res.text())
          .then(data => {
            if (content) {
              content.innerHTML = data;
              
              // Mark topic as completed
              markTopicCompleted(file);
              
              // Add success animation
              content.style.animation = 'fadeIn 0.5s ease-in-out';
              setTimeout(() => content.style.animation = '', 500);
            }
            
            // Initialize compiler if compiler.html is loaded
            if (file === 'compiler.html') {
              awardAchievement('compiler');
            }
          })
          .catch(() => {
            if (content) {
              content.innerHTML = `
                <div style="text-align: center; padding: 50px;">
                  <div style="font-size: 3em; margin-bottom: 20px;">😔</div>
                  <h2>Oops! Something went wrong</h2>
                  <p>Sorry, the topic "${file}" could not be loaded.</p>
                  <button onclick="location.reload()" style="padding: 10px 20px; background: #4CAF50; color: white; border: none; border-radius: 5px; cursor: pointer;">Try Again</button>
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