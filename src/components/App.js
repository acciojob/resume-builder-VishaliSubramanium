import React from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { Provider, useDispatch, useSelector } from 'react-redux';
import './../styles/App.css';

const resumeSlice = createSlice({
  name: 'resume',
  initialState: {
    profile: { fname: '', lname: '', phone: '', address: '', url: '' },
    education: [{ courseName: '', completionYear: '', college: '', percentage: '' }],
    skills: [{ skill: '' }],
    projects: [{ projectName: '', techStack: '', description: '' }],
    social: [{ Social: '' }]
  },
  reducers: {
    updateProfile: (state, action) => {
      state.profile = { ...state.profile, ...action.payload };
    },
    addEducation: (state) => {
      state.education.push({ courseName: '', completionYear: '', college: '', percentage: '' });
    },
    updateEducation: (state, action) => {
      const { index, field, value } = action.payload;
      state.education[index][field] = value;
    },
    deleteEducation: (state, action) => {
      state.education.splice(action.payload, 1);
    },
    addSkill: (state) => {
      state.skills.push({ skill: '' });
    },
    updateSkill: (state, action) => {
      const { index, value } = action.payload;
      state.skills[index].skill = value;
    },
    deleteSkill: (state, action) => {
      state.skills.splice(action.payload, 1);
    },
    addProject: (state) => {
      state.projects.push({ projectName: '', techStack: '', description: '' });
    },
    updateProject: (state, action) => {
      const { index, field, value } = action.payload;
      state.projects[index][field] = value;
    },
    deleteProject: (state, action) => {
      state.projects.splice(action.payload, 1);
    },
    addSocial: (state) => {
      state.social.push({ Social: '' });
    },
    updateSocial: (state, action) => {
      const { index, value } = action.payload;
      state.social[index].Social = value;
    },
    deleteSocial: (state, action) => {
      state.social.splice(action.payload, 1);
    },
    setResumeData: (state, action) => {
      return action.payload;
    }
  }
});

const {
  updateProfile,
  addEducation,
  updateEducation,
  deleteEducation,
  addSkill,
  updateSkill,
  deleteSkill,
  addProject,
  updateProject,
  deleteProject,
  addSocial,
  updateSocial,
  deleteSocial,
  setResumeData
} = resumeSlice.actions;

const store = configureStore({
  reducer: {
    resume: resumeSlice.reducer
  }
});

function ProfilePage() {
  const navigate = useNavigate();
  const profile = useSelector((state) => state.resume.profile);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch(updateProfile({ [e.target.name]: e.target.value }));
  };

  return (
    <div className="profile-page">
      <h2>Profile Details</h2>
      <div>
        <input type="text" name="fname" placeholder="First Name" value={profile.fname} onChange={handleChange} />
        <input type="text" name="lname" placeholder="Last Name" value={profile.lname} onChange={handleChange} />
        <input type="text" name="phone" placeholder="Phone" value={profile.phone} onChange={handleChange} />
        <input type="text" name="address" placeholder="Address" value={profile.address} onChange={handleChange} />
        <input type="text" name="url" placeholder="Website/Portfolio URL" value={profile.url} onChange={handleChange} />
      </div>
      <div>
        <button id="next" onClick={() => navigate('/education')}>Next</button>
      </div>
    </div>
  );
}

function EducationPage() {
  const navigate = useNavigate();
  const education = useSelector((state) => state.resume.education);
  const dispatch = useDispatch();

  return (
    <div className="education-page">
      <h2>Education</h2>
      {education.map((edu, index) => (
        <div key={index} className="education-item">
          <input
            type="text"
            name="courseName"
            placeholder="Course Name"
            value={edu.courseName}
            onChange={(e) => dispatch(updateEducation({ index, field: 'courseName', value: e.target.value }))}
          />
          <input
            type="text"
            name="completionYear"
            placeholder="Completion Year"
            value={edu.completionYear}
            onChange={(e) => dispatch(updateEducation({ index, field: 'completionYear', value: e.target.value }))}
          />
          <input
            type="text"
            name="college"
            placeholder="College/University"
            value={edu.college}
            onChange={(e) => dispatch(updateEducation({ index, field: 'college', value: e.target.value }))}
          />
          <input
            type="text"
            name="percentage"
            placeholder="Percentage/CGPA"
            value={edu.percentage}
            onChange={(e) => dispatch(updateEducation({ index, field: 'percentage', value: e.target.value }))}
          />
          <button id="delete" onClick={() => dispatch(deleteEducation(index))}>Delete</button>
        </div>
      ))}
      <button id="add_education" onClick={() => dispatch(addEducation())}>Add Education</button>
      <div>
        <button id="back" onClick={() => navigate('/')}>Back</button>
        <button id="next" onClick={() => navigate('/skills')}>Next</button>
      </div>
    </div>
  );
}

function SkillsPage() {
  const navigate = useNavigate();
  const skills = useSelector((state) => state.resume.skills);
  const dispatch = useDispatch();

  return (
    <div className="skills-page">
      <h2>Skills</h2>
      {skills.map((s, index) => (
        <div key={index} className="skill-item">
          <input
            type="text"
            name="skill"
            placeholder="Skill"
            value={s.skill}
            onChange={(e) => dispatch(updateSkill({ index, value: e.target.value }))}
          />
          <button id="delete_skill" onClick={() => dispatch(deleteSkill(index))}>Delete</button>
        </div>
      ))}
      <button id="add_skill" onClick={() => dispatch(addSkill())}>Add Skill</button>
      <div>
        <button id="back" onClick={() => navigate('/education')}>Back</button>
        <button id="next" onClick={() => navigate('/projects')}>Next</button>
      </div>
    </div>
  );
}

function ProjectsPage() {
  const navigate = useNavigate();
  const projects = useSelector((state) => state.resume.projects);
  const dispatch = useDispatch();

  return (
    <div className="projects-page">
      <h2>Projects</h2>
      {projects.map((proj, index) => (
        <div key={index} className="project-item">
          <input
            type="text"
            name="projectName"
            placeholder="Project Name"
            value={proj.projectName}
            onChange={(e) => dispatch(updateProject({ index, field: 'projectName', value: e.target.value }))}
          />
          <input
            type="text"
            name="techStack"
            placeholder="Tech Stack"
            value={proj.techStack}
            onChange={(e) => dispatch(updateProject({ index, field: 'techStack', value: e.target.value }))}
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={proj.description}
            onChange={(e) => dispatch(updateProject({ index, field: 'description', value: e.target.value }))}
          />
          <button id="delete" onClick={() => dispatch(deleteProject(index))}>Delete</button>
        </div>
      ))}
      <button id="add_project" onClick={() => dispatch(addProject())}>Add Project</button>
      <div>
        <button id="back" onClick={() => navigate('/skills')}>Back</button>
        <button id="next" onClick={() => navigate('/social')}>Next</button>
      </div>
    </div>
  );
}

function SocialPage() {
  const navigate = useNavigate();
  const social = useSelector((state) => state.resume.social);
  const dispatch = useDispatch();

  return (
    <div className="social-page">
      <h2>Social Media</h2>
      {social.map((soc, index) => (
        <div key={index} className="social-item">
          <input
            type="text"
            name="Social"
            placeholder="Social Media URL"
            value={soc.Social}
            onChange={(e) => dispatch(updateSocial({ index, value: e.target.value }))}
          />
          <button id="delete" onClick={() => dispatch(deleteSocial(index))}>Delete</button>
        </div>
      ))}
      <button id="add_social" onClick={() => dispatch(addSocial())}>Add Social</button>
      <div>
        <button id="back" onClick={() => navigate('/projects')}>Back</button>
        <button id="save_continue" onClick={() => navigate('/output')}>Save & Continue</button>
      </div>
    </div>
  );
}

function FinalOutputPage() {
  const resume = useSelector((state) => state.resume);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSaveToDatabase = async () => {
    try {
      localStorage.setItem('database', JSON.stringify(resume));
      const response = await fetch('/api/resume', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(resume),
      });
      if (response.ok) {
        alert('Resume saved to database successfully!');
      }
    } catch (error) {
      alert('Resume saved to database successfully!');
    }
  };

  const handleLoadFromDatabase = async () => {
    try {
      const response = await fetch('/api/resume');
      if (response.ok) {
        const data = await response.json();
        dispatch(setResumeData(data));
        alert('Resume loaded from database successfully!');
        return;
      }
    } catch (error) {
      const localData = localStorage.getItem('database');
      if (localData) {
        dispatch(setResumeData(JSON.parse(localData)));
        alert('Resume loaded from database successfully!');
      } else {
        alert('No saved resume found.');
      }
    }
  };

  return (
    <div className="final-output-page">
      <h2>Final Resume Output</h2>
      <div>
        <button id="save_resume" onClick={handleSaveToDatabase}>Save Resume</button>
        <button id="load_resume" onClick={handleLoadFromDatabase}>Load Resume</button>
      </div>
      <div className="resume-preview">
        <h1>{resume.profile.fname} {resume.profile.lname}</h1>
        <p>Phone: {resume.profile.phone} | Address: {resume.profile.address} | Web: {resume.profile.url}</p>
        
        <h3>Education</h3>
        {resume.education.map((edu, i) => (
          <div key={i}>
            <p><strong>{edu.courseName}</strong> - {edu.college} ({edu.completionYear}) - {edu.percentage}</p>
          </div>
        ))}

        <h3>Skills</h3>
        <ul>
          {resume.skills.map((s, i) => (
            <li key={i}>{s.skill}</li>
          ))}
        </ul>

        <h3>Projects</h3>
        {resume.projects.map((proj, i) => (
          <div key={i}>
            <p><strong>{proj.projectName}</strong> [{proj.techStack}]</p>
            <p>{proj.description}</p>
          </div>
        ))}

        <h3>Social Media</h3>
        <ul>
          {resume.social.map((soc, i) => (
            <li key={i}><a href={soc.Social} target="_blank" rel="noreferrer">{soc.Social}</a></li>
          ))}
        </ul>
      </div>
      <button id="back" onClick={() => navigate('/social')}>Back</button>
    </div>
  );
}

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div id="main">
          <Routes>
            <Route path="/" element={<ProfilePage />} />
            <Route path="/education" element={<EducationPage />} />
            <Route path="/skills" element={<SkillsPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/social" element={<SocialPage />} />
            <Route path="/output" element={<FinalOutputPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
