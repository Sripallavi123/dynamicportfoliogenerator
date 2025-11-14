document.addEventListener('DOMContentLoaded', function() {
    // Get all input elements in the editor sidebar
    const inputElements = document.querySelectorAll('.editor-sidebar input, .editor-sidebar textarea, .editor-sidebar select');
    
    // Add event listeners to update the preview in real-time
    inputElements.forEach(input => {
        input.addEventListener('input', updateResumePreview);
    });
    
    // Handle skill tags
    const addSkillBtn = document.getElementById('addSkillBtn');
    if (addSkillBtn) {
        addSkillBtn.addEventListener('click', addResumeSkill);
    }
    
    // Add new work experience
    const addExperienceBtn = document.querySelector('.btn-add[onclick="addResumeExperience()"]');
    if (addExperienceBtn) {
        addExperienceBtn.addEventListener('click', addResumeExperience);
    }
    
    // Add new education
    const addEducationBtn = document.querySelector('.btn-add[onclick="addResumeEducation()"]');
    if (addEducationBtn) {
        addEducationBtn.addEventListener('click', addResumeEducation);
    }
    
    // Add new project
    const addProjectBtn = document.querySelector('.btn-add[onclick="addResumeProject()"]');
    if (addProjectBtn) {
        addProjectBtn.addEventListener('click', addResumeProject);
    }
    
    // Add new certification
    const addCertificationBtn = document.querySelector('.btn-add[onclick="addResumeCertification()"]');
    if (addCertificationBtn) {
        addCertificationBtn.addEventListener('click', addResumeCertification);
    }
    
    // Add new achievement
    const addAchievementBtn = document.querySelector('.btn-add[onclick="addResumeAchievement()"]');
    if (addAchievementBtn) {
        addAchievementBtn.addEventListener('click', addResumeAchievement);
    }
    
    // Save resume
    const saveResumeBtn = document.getElementById('saveResume');
    if (saveResumeBtn) {
        saveResumeBtn.addEventListener('click', saveResume);
    }
    
    // Download resume as PDF
    const downloadResumeBtn = document.getElementById('downloadResume');
    if (downloadResumeBtn) {
        downloadResumeBtn.addEventListener('click', downloadResume);
    }
    
    // Analyze ATS score
    const analyzeResumeBtn = document.getElementById('analyzeResume');
    if (analyzeResumeBtn) {
        analyzeResumeBtn.addEventListener('click', analyzeResume);
    }
    
    // Share resume link
    const shareResumeBtn = document.getElementById('shareResume');
    if (shareResumeBtn) {
        shareResumeBtn.addEventListener('click', shareResume);
    }
});

function updateResumePreview() {
    const inputId = this.id;
    const inputValue = this.value;
    const previewElement = document.getElementById(`preview${inputId.charAt(0).toUpperCase() + inputId.slice(1)}`);
    
    if (previewElement) {
        previewElement.textContent = inputValue;
    }
    
    // Special cases for complex elements
    if (inputId === 'resumeName') {
        document.getElementById('previewResumeName').textContent = inputValue;
    } else if (inputId === 'resumeTitle') {
        document.getElementById('previewResumeTitle').textContent = inputValue;
    } else if (inputId === 'resumeSummary') {
        document.getElementById('previewResumeSummary').textContent = inputValue;
    }
}

function addResumeSkill() {
    const newSkill = document.getElementById('newSkill').value.trim();
    if (newSkill) {
        const skillsContainer = document.querySelector('.skills-container');
        const newSkillTag = document.createElement('div');
        newSkillTag.className = 'skill-tag';
        newSkillTag.textContent = newSkill;
        newSkillTag.addEventListener('click', function() {
            this.remove();
        });
        skillsContainer.appendChild(newSkillTag);
        document.getElementById('newSkill').value = '';
        
        // Add to preview
        const previewSkills = document.querySelector('.skills-list');
        const skillsColumns = previewSkills.querySelectorAll('.skills-column');
        
        // Find the column with fewer items
        let targetColumn = skillsColumns[0];
        if (skillsColumns.length > 1 && skillsColumns[1].querySelectorAll('li').length < skillsColumns[0].querySelectorAll('li').length) {
            targetColumn = skillsColumns[1];
        }
        
        const newSkillItem = document.createElement('li');
        newSkillItem.textContent = newSkill;
        targetColumn.querySelector('ul').appendChild(newSkillItem);
    }
}

function addResumeExperience() {
    const experienceContainer = document.querySelector('.experience-list');
    const newExperienceItem = document.createElement('div');
    newExperienceItem.className = 'experience-item';
    newExperienceItem.innerHTML = `
        <div class="form-group">
            <label>Job Title</label>
            <input type="text" placeholder="Position">
        </div>
        <div class="form-group">
            <label>Company</label>
            <input type="text" placeholder="Company Name">
        </div>
        <div class="form-group">
            <label>Location</label>
            <input type="text" placeholder="City, State">
        </div>
        <div class="form-group">
            <label>Dates</label>
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

function addResumeEducation() {
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
            <label>Location</label>
            <input type="text" placeholder="City, State">
        </div>
        <div class="form-group">
            <label>Dates</label>
            <input type="text" placeholder="e.g. August 2019 - May 2023">
        </div>
        <div class="form-group">
            <label>GPA</label>
            <input type="text" placeholder="e.g. 3.8/4.0">
        </div>
        <div class="form-group">
            <label>Relevant Coursework</label>
            <textarea placeholder="List relevant courses"></textarea>
        </div>
        <button class="btn btn-small btn-danger" onclick="removeItem(this)">Remove</button>
    `;
    educationContainer.appendChild(newEducationItem);
}

function addResumeProject() {
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
            <textarea placeholder="Project details and achievements"></textarea>
        </div>
        <button class="btn btn-small btn-danger" onclick="removeItem(this)">Remove</button>
    `;
    projectsContainer.appendChild(newProjectItem);
}

function addResumeCertification() {
    const certificationsContainer = document.querySelector('.certifications-list');
    const newCertificationItem = document.createElement('div');
    newCertificationItem.className = 'certification-item';
    newCertificationItem.innerHTML = `
        <div class="form-group">
            <label>Certification</label>
            <input type="text" placeholder="Certification Name">
        </div>
        <div class="form-group">
            <label>Issuing Organization</label>
            <input type="text" placeholder="Organization">
        </div>
        <div class="form-group">
            <label>Date Earned</label>
            <input type="text" placeholder="Month Year">
        </div>
        <button class="btn btn-small btn-danger" onclick="removeItem(this)">Remove</button>
    `;
    certificationsContainer.appendChild(newCertificationItem);
}

function addResumeAchievement() {
    const achievementsContainer = document.querySelector('.achievements-list');
    const newAchievementItem = document.createElement('div');
    newAchievementItem.className = 'achievement-item';
    newAchievementItem.innerHTML = `
        <div class="form-group">
            <label>Achievement</label>
            <input type="text" placeholder="Achievement">
        </div>
        <div class="form-group">
            <label>Date</label>
            <input type="text" placeholder="Date or time period">
        </div>
        <button class="btn btn-small btn-danger" onclick="removeItem(this)">Remove</button>
    `;
    achievementsContainer.appendChild(newAchievementItem);
}

function saveResume() {
    // In a real app, this would save to a database
    alert('Resume saved successfully!');
}

function downloadResume() {
    // In a real app, this would generate a PDF
    alert('Downloading resume as PDF...');
}

function analyzeResume() {
    // In a real app, this would analyze the resume for ATS compatibility
    alert('Analyzing resume for ATS compatibility...\n\nATS Score: 85/100\n\nRecommendations:\n- Add more relevant keywords\n- Quantify achievements\n- Keep formatting simple');
}

function shareResume() {
    // In a real app, this would generate a shareable link
    alert('Share link copied to clipboard!');
}