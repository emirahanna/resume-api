import './App.css';
import {useState} from "react";
import {BasicsForm} from "./form/basics-form";
import {VolunteerForm} from "./form/volunteer-form";
import {EducationForm} from "./form/education-form";
import {AwardsForm} from "./form/awards-form";
import {CertificatesForm} from "./form/certificates-form";
import {PublicationsForm} from "./form/publications-form";
import {SkillsForm} from "./form/skills-form";
import {InterestsForm} from "./form/interests-form";
import {ReferencesForm} from "./form/references-form";
import {ProjectsForm} from "./form/projects-form";
import {WorkForm} from "./form/work-form";

function App() {
    let displayCategoryContent = false;
    const [categorySelected, setCategorySelected] = useState('');
    const formComponents = {
        basics: <BasicsForm />,
        work: <WorkForm />,
        volunteer: <VolunteerForm />,
        education: <EducationForm />,
        awards: <AwardsForm />,
        certificates: <CertificatesForm />,
        publications: <PublicationsForm />,
        skills: <SkillsForm />,
        interests: <InterestsForm />,
        references: <ReferencesForm />,
        projects: <ProjectsForm />,
    };

    function addData() {
        const section = document.querySelector("#resumeSection").value;
        const payload = {};
        //finds all content in the document with the id for that section, then removes the section-relevant identifier so it matches the JSON attributes
        document.querySelectorAll(`[id^='${section}_']`).forEach(input => {
            payload[input.id.replace(`${section}_`, '')] = input.value;
        });

        const request = new XMLHttpRequest();
        request.open("POST", `http://127.0.0.1:3001/${section}`, true);
        request.setRequestHeader("Content-Type", "application/json");
        request.onload = function () {
            parseObject(JSON.parse(request.responseText));
        };
        //send data to server as JSON body
        request.send(JSON.stringify(payload));
    }

    function deleteData() {
        //delete data, open a dropdown, should it be like a pop up?
        const request = new XMLHttpRequest();
        let section = document.querySelector("#resumeSection").value
        let data = document.querySelector("#userInput");
        request.open("DELETE", `http://127.0.0.1:3001/${section}/title/${data}`, true);
        request.send();
    }

    function readData() {
        const request = new XMLHttpRequest();
        let section = document.querySelector("#resumeSection").value;
        request.open("GET", `http://127.0.0.1:3001/${section}`, true);
        request.send();
        request.onload = function () {
            parseObject(JSON.parse(request.responseText));
        }
        console.log(request.responseText)
    }

    function viewResume() {
        const request = new XMLHttpRequest();
        request.open("GET", `http://127.0.0.1:3001/resume`, true);
        request.onload = function () {
            console.log('response', request.responseText);
            parseObject(JSON.parse(request.responseText));
        }
        request.send();
    }

    function parseObject(resume, parent) {
        const display = parent || document.querySelector("#resumeDisplay");
        // clear only on first call
        if (!parent) display.innerHTML = "";
        for (const key in resume) {
            if (typeof resume[key] === "object" && resume[key] !== null) {
                const section = document.createElement("div");
                if (resume[key].length > 0) section.innerHTML = `<strong>${key}</strong>`;
                display.appendChild(section);
                // recurse, but pass section as the parent
                parseObject(resume[key], section);
            } else {
                const paraEl = document.createElement("p");
                const paraTextNode = document.createTextNode(`${key}: ${resume[key]}`);
                paraEl.appendChild(paraTextNode);
                display.appendChild(paraEl);
            }
        }
    }

    function selectCategory(e) {
        setCategorySelected(e.target.value);
        displayCategoryContent =  categorySelected !== 'basics'
    }
    return (<div className="App">
            <div id="pageContainer">
                <div id="buttons">
                    <button onClick={addData}>Add</button>
                    <button onClick={deleteData}>Delete</button>
                    <button onClick={readData}>View</button>
                    <button>Download</button>
                    <button onClick={viewResume}>View Full Resume</button>
                </div>
                <div id="textFields">
                    <label htmlFor="resumeSection">Resume Category:</label>
                    <select name="resume-section" id="resumeSection" onChange={selectCategory}>
                        <option>--</option>
                        <option value="basics">Basic Information</option>
                        <option value="work">Work</option>
                        <option value="volunteer">Volunteering Experience</option>
                        <option value="education">Education</option>
                        <option value="awards">Awards</option>
                        <option value="certificates">Certificates</option>
                        <option value="publications">Publications</option>
                        <option value="skills">Skills</option>
                        <option value="interests">Interests</option>
                        <option value="references">References</option>
                        <option value="projects">Projects</option>
                    </select>
                    {formComponents[categorySelected] ?? null}
                    {displayCategoryContent ?? (
                        <div>

                        </div>
                    )}
                </div>
            </div>
                <div id="resumeDisplay">
                    lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                </div>
        </div>);
}

export default App;
