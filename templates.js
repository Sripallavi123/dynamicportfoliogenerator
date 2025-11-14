document.addEventListener('DOMContentLoaded', function() {
    // Get all input elements in the editor sidebar
    const inputElements = document.querySelectorAll('.editor-sidebar input, .editor-sidebar textarea, .editor-sidebar select');
    
    // Add event listeners to update the preview in real-time
    inputElements.forEach(input => {
        input.addEventListener('input', updatePreview);
    });
    
    // Handle skill range sliders
    const skillRanges = document.querySelectorAll('.skill-range');
    skillRanges.forEach(range => {
        range.addEventListener('input', function() {
            const skillItem = this.closest('.skill-item');
            const skillName = skillItem.querySelector('input[type="text"]').value;
            const skillLevel = this.value;
            
            // Update preview
            const previewSkill = document.querySelector(`.skills-list .skill-item span:contains('${skillName}')`);
            if (previewSkill) {
                const skillBar = previewSkill.nextElementSibling.querySelector('.skill-level');
                skillBar.style.width = `${skillLevel}%`;
            }
        });
    });
    
    // Handle profile picture upload
    const profilePicInput = document.getElementById('profilePic');
    if (profilePicInput) {
        profilePicInput.addEventListener('change', function() {
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    document.getElementById('previewProfilePic').src = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
    }
    
    // Add new education item
    const addEducationBtn = document.querySelector('.btn-add[onclick="addEducation()"]');
    if (addEducationBtn) {
        addEducationBtn.addEventListener('click', addEducation);
    }
    
    // Add new skill
    const addSkillBtn = document.getElementById('addSkillBtn');
    if (addSkillBtn) {
        addSkillBtn.addEventListener('click', addSkill);
    }
    
    // Add new project
    const addProjectBtn = document.querySelector('.btn-add[onclick="addProject()"]');
    if (addProjectBtn) {
        addProjectBtn.addEventListener('click', addProject);
    }
    
    // Add new experience
    const addExperienceBtn = document.querySelector('.btn-add[onclick="addExperience()"]');
    if (addExperienceBtn) {
        addExperienceBtn.addEventListener('click', addExperience);
    }
    
    // Add new certification
    const addCertificationBtn = document.querySelector('.btn-add[onclick="addCertification()"]');
    if (addCertificationBtn) {
        addCertificationBtn.addEventListener('click', addCertification);
    }
    
    // Add new achievement
    const addAchievementBtn = document.querySelector('.btn-add[onclick="addAchievement()"]');
    if (addAchievementBtn) {
        addAchievementBtn.addEventListener('click', addAchievement);
    }
    
    // Save portfolio
    const savePortfolioBtn = document.getElementById('savePortfolio');
    if (savePortfolioBtn) {
        savePortfolioBtn.addEventListener('click', savePortfolio);
    }
    
    // Download portfolio as PDF
    const downloadPortfolioBtn = document.getElementById('downloadPortfolio');
    if (downloadPortfolioBtn) {
        downloadPortfolioBtn.addEventListener('click', downloadPortfolio);
    }
    
    // Share portfolio link
    const sharePortfolioBtn = document.getElementById('sharePortfolio');
    if (sharePortfolioBtn) {
        sharePortfolioBtn.addEventListener('click', sharePortfolio);
    }
});

function updatePreview() {
    const inputId = this.id;
    const inputValue = this.value;
    const previewElement = document.getElementById(`preview${inputId.charAt(0).toUpperCase() + inputId.slice(1)}`);
    
    if (previewElement) {
        if (this.type === 'range') {
            previewElement.style.width = `${inputValue}%`;
        } else {
            previewElement.textContent = inputValue;
        }
    }
    
    // Special cases for complex elements
    if (inputId === 'fullName') {
        document.getElementById('previewName').textContent = inputValue;
    } else if (inputId === 'profession') {
        document.getElementById('previewProfession').textContent = inputValue;
    } else if (inputId === 'bio') {
        document.getElementById('previewBio').textContent = inputValue;
    } else if (inputId === 'goals') {
        document.getElementById('previewGoals').innerHTML = `<p>${inputValue}</p>`;
    } else if (inputId === 'interests') {
        document.getElementById('previewInterests').innerHTML = `<p>${inputValue}</p>`;
    }
}

function addEducation() {
    const educationContainer = document.querySelector('.education-list');
    const newEducationItem = document.createElement('div');
    newEducationItem.className = 'education-item';
    newEducationItem.innerHTML = `
        <div class="form-group">
            <label>Degree</label>
            <input type="text" placeholder="e.g. Bachelor of Science">
        </div>
        <div class="form-group">
            <label>University</label>
            <input type="text" placeholder="University Name">
        </div>
        <div class="form-group">
            <label>Duration</label>
            <input type="text" placeholder="e.g. 2019 - 2023">
        </div>
        <div class="form-group">
            <label>Description</label>
            <textarea placeholder="Details about your education"></textarea>
        </div>
        <button class="btn btn-small btn-danger" onclick="removeItem(this)">Remove</button>
    `;
    educationContainer.appendChild(newEducationItem);
}

function addSkill() {
    const newSkill = document.getElementById('newSkill').value.trim();
    if (newSkill) {
        const skillsContainer = document.querySelector('.skills-container');
        const newSkillItem = document.createElement('div');
        newSkillItem.className = 'skill-item';
        newSkillItem.innerHTML = `
            <input type="text" value="${newSkill}" placeholder="Skill">
            <input type="range" min="1" max="100" value="50" class="skill-range">
            <button class="btn btn-small btn-danger" onclick="removeItem(this)">Remove</button>
        `;
        skillsContainer.appendChild(newSkillItem);
        document.getElementById('newSkill').value = '';
        
        // Add to preview
        const previewSkills = document.querySelector('.skills-list');
        const newPreviewSkill = document.createElement('div');
        newPreviewSkill.className = 'skill-item';
        newPreviewSkill.innerHTML = `
            <span>${newSkill}</span>
            <div class="skill-bar">
                <div class="skill-level" style="width: 50%;"></div>
            </div>
        `;
        previewSkills.appendChild(newPreviewSkill);
    }
}

function addProject() {
    const projectsContainer = document.querySelector('.projects-list');
    const newProjectItem = document.createElement('div');
    newProjectItem.className = 'project-item';
    newProjectItem.innerHTML = `
        <div class="form-group">
            <label>Project Name</label>
            <input type="text" placeholder="Project Title">
        </div>
        <div class="form-group">
            <label>Technologies</label>
            <input type="text" placeholder="Technologies used">
        </div>
        <div class="form-group">
            <label>Description</label>
            <textarea placeholder="Project details"></textarea>
        </div>
        <button class="btn btn-small btn-danger" onclick="removeItem(this)">Remove</button>
    `;
    projectsContainer.appendChild(newProjectItem);
}

function addExperience() {
    const experienceContainer = document.querySelector('.experience-list');
    const newExperienceItem = document.createElement('div');
    newExperienceItem.className = 'experience-item';
    newExperienceItem.innerHTML = `
        <div class="form-group">
            <label>Position</label>
            <input type="text" placeholder="Job Title">
        </div>
        <div class="form-group">
            <label>Company</label>
            <input type="text" placeholder="Company Name">
        </div>
        <div class="form-group">
            <label>Duration</label>
            <input type="text" placeholder="e.g. June 2022 - August 2022">
        </div>
        <div class="form-group">
            <label>Description</label>
            <textarea placeholder="Your responsibilities and achievements"></textarea>
        </div>
        <button class="btn btn-small btn-danger" onclick="removeItem(this)">Remove</button>
    `;
    experienceContainer.appendChild(newExperienceItem);
}

function addCertification() {
    const certificationsContainer = document.querySelector('.certifications-list');
    const newCertificationItem = document.createElement('div');
    newCertificationItem.className = 'certification-item';
    newCertificationItem.innerHTML = `
        <div class="form-group">
            <label>Certification</label>
            <input type="text" placeholder="Certification Name">
        </div>
        <div class="form-group">
            <label>Issuer</label>
            <input type="text" placeholder="Issuing Organization">
        </div>
        <div class="form-group">
            <label>Year</label>
            <input type="text" placeholder="Year obtained">
        </div>
        <button class="btn btn-small btn-danger" onclick="removeItem(this)">Remove</button>
    `;
    certificationsContainer.appendChild(newCertificationItem);
}

function addAchievement() {
    const achievementsContainer = document.querySelector('.achievements-list');
    const newAchievementItem = document.createElement('div');
    newAchievementItem.className = 'achievement-item';
    newAchievementItem.innerHTML = `
        <div class="form-group">
            <label>Achievement</label>
            <input type="text" placeholder="Achievement">
        </div>
        <div class="form-group">
            <label>Year</label>
            <input type="text" placeholder="Year">
        </div>
        <button class="btn btn-small btn-danger" onclick="removeItem(this)">Remove</button>
    `;
    achievementsContainer.appendChild(newAchievementItem);
}

function removeItem(button) {
    const itemToRemove = button.closest('.education-item, .skill-item, .project-item, .experience-item, .certification-item, .achievement-item');
    if (itemToRemove) {
        itemToRemove.remove();
    }
}

function savePortfolio() {
    // In a real app, this would save to a database
    alert('Portfolio saved successfully!');
}

function downloadPortfolio() {
    // In a real app, this would generate a PDF
    alert('Downloading portfolio as PDF...');
}

function sharePortfolio() {
    // In a real app, this would generate a shareable link
    alert('Share link copied to clipboard!');
}