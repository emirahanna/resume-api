import './App.css';
import {useEffect, useState} from "react";
import {BasicsForm} from "./form/basics-form";
import {VolunteerForm} from "./form/volunteer-form";
import {EducationForm} from "./form/education-form";
import {AwardsForm} from "./form/awards-form";
import {CertificatesForm} from "./form/certificates-form";
import {PublicationsForm} from "./form/publications-form";
import {SkillsForm} from "./form/skills-form";
import {ReferencesForm} from "./form/references-form";
import {ProjectsForm} from "./form/projects-form";
import {WorkForm} from "./form/work-form";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import React from 'react';
import {ToastContainer, toast} from 'react-toastify';

function App() {
    //use useState for Reactive variables
    const [showSectionEntry, setShowSectionEntry] = useState(false);
    const [selectedSection, setSelectedSection] = useState('');
    const [entries, setEntries] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [inUpdateState, setUpdateState] = useState(false);
    const formComponents = {
        basics: <BasicsForm/>,
        work: <WorkForm/>,
        volunteer: <VolunteerForm/>,
        education: <EducationForm/>,
        awards: <AwardsForm/>,
        certificates: <CertificatesForm/>,
        publications: <PublicationsForm/>,
        skills: <SkillsForm/>,
        references: <ReferencesForm/>,
        projects: <ProjectsForm/>,
    };

    //runs on start up, triggers the basic form to display on the page
    useEffect(() => {
        setSelectedSection('basics');
    }, []);

    /**
     *  Takes all the form field info related to the category, and posts it to the server
     */
    function addData() {
        const section = document.querySelector("#resumeSection").value;
        const payload = {};
        //finds all content in the document with the id for that section
        const inputs = document.querySelectorAll(`[id^='${section}_']`);
        if (validateInput(section)) {
            // removes the section-relevant identifier so it matches the JSON attributes and build payload only from filled inputs
            inputs.forEach(input => {
                if (input.value.trim() !== "")
                    payload[input.id.replace(`${section}_`, "")] = input.value.trim();
            });
            //calls server to post new section data
            const request = new XMLHttpRequest();
            request.open("POST", `http://127.0.0.1:3001/${section}`, true);
            request.setRequestHeader("Content-Type", "application/json");
            request.onload = function () {
                if (request.status >= 200 && request.status < 300) {
                    toast.success("Added successfully!")
                    populateEntryDropdown()
                    //pretty prints it on screen
                    prettyPrint(JSON.parse(request.responseText));
                    // wait for backend to update before refreshing the content
                    setTimeout(() => populateEntryDropdown(), 300);
                } else {
                    toast.error("Add failed!")
                }
            };
            //send data to server as JSON body
            request.send(JSON.stringify(payload));
        }
    }

    function deleteData() {
        const section = document.querySelector("#resumeSection").value;
        if (!section || section === "--") {
            toast.warning("Please select a section first.")
            return;
        }
        // basics has no dropdown
        let url;
        if (section === "basics") {
            url = `http://127.0.0.1:3001/${section}`;
        } else {
            if (selectedIndex === null) {
                toast.warning("Please select an entry to delete.");
                return;
            }
            url = `http://127.0.0.1:3001/${section}/${selectedIndex}`;
        }

        const request = new XMLHttpRequest();
        request.open("DELETE", url, true);
        request.send();
        request.onload = function () {
            if (request.status >= 200 && request.status < 300) {
                toast.success("Deleted successfully!")
                // Clear current selections first
                setSelectedIndex(null);
                setEntries([]);

                // wait for backend to update before refreshing the content
                setTimeout(() => populateEntryDropdown(), 300);
            } else {
                toast.error("Delete failed!")
            }
        };
    }

    /**
     * Returns and prints all the entries in a section onto the page
     */
    function readData() {
        let section = document.querySelector("#resumeSection").value;
        const request = new XMLHttpRequest();
        request.open("GET", `http://127.0.0.1:3001/${section}`, true);
        request.send();
        request.onload = function () {
            if (request.status >= 200 && request.status < 300) {
                const json = JSON.parse(request.responseText);
                prettyPrint(json);
            } else {
                document.querySelector("#resumeDisplay").innerHTML = "";
            }
        }
    }

    /**
     * Puts updated data to the server
     */
    function updateData() {
        const section = document.querySelector("#resumeSection").value;
        const payload = {};
        if (validateInput(section)) {
            //gathers all the form field text to put it in the payload
            document.querySelectorAll(`[id^='${section}_']`).forEach(input => {
                payload[input.id.replace(`${section}_`, '')] = input.value;
            });

            //attributes with arrays have an index for accurate change
            const url = section === 'basics'
                ? `http://127.0.0.1:3001/${section}`
                : `http://127.0.0.1:3001/${section}/${selectedIndex}`;

            const request = new XMLHttpRequest();
            request.open("PUT", url, true);
            request.setRequestHeader("Content-Type", "application/json");
            request.send(JSON.stringify(payload));

            request.onload = function () {
                if (request.status >= 200 && request.status < 300) {
                    toast.success("Updated successfully!")
                    prettyPrint(JSON.parse(request.responseText));
                    populateEntryDropdown()
                } else {
                    toast.error("Update failed!")
                }
            };
        }
    }

    /**
     *  returns and prints the entire resume onto the page
     */
    function viewResume() {
        const request = new XMLHttpRequest();
        request.open("GET", `http://127.0.0.1:3001/resume`, true);
        request.send();
        request.onload = function () {
            prettyPrint(JSON.parse(request.responseText));
        }
    }

    /**
     * prints the resume onto the page, but styled
     * @param resume
     */
    function prettyPrint(resume) {
        const display = document.querySelector("#resumeDisplay");
        display.innerHTML = "";

        for (const sectionKey in resume) {
            const sectionData = resume[sectionKey];

            if (Array.isArray(sectionData)) {
                // create section heading (e.g. Awards, Skills)
                const sectionEl = document.createElement("div");
                sectionEl.className = "resume-section";

                const heading = document.createElement("h3");
                heading.className = "resume-heading";
                heading.textContent = sectionKey.toUpperCase();
                sectionEl.appendChild(heading);

                if (sectionData.length > 0) {
                    // render each entry
                    sectionData.forEach((entry) => {
                        const entryEl = document.createElement("div");
                        entryEl.className = "resume-entry";

                        for (const key in entry) {
                            if (entry[key]) {
                                const p = document.createElement("p");
                                const noIndentKeys = ["name", "organization", "title"];
                                p.textContent = noIndentKeys.includes(key) ? `${entry[key]}` : `${key.replace('_', ' ')}: ${entry[key]}`;
                                p.style.marginLeft = noIndentKeys.includes(key) ? "0px" : "20px";
                                entryEl.appendChild(p);
                            }
                        }
                        entryEl.style.padding = "4px"
                        sectionEl.appendChild(entryEl);
                    });
                } else {
                    const empty = document.createElement("p");
                    empty.textContent = "No entries yet.";
                    empty.style.marginLeft = "20px";
                    sectionEl.appendChild(empty);
                }

                display.appendChild(sectionEl);
            } else if (typeof sectionData === "object" && sectionData !== null) {
                // For basics object
                const sectionEl = document.createElement("div");
                sectionEl.className = "resume-section";

                const heading = document.createElement("h3");
                heading.className = "resume-heading";
                heading.textContent = sectionKey.toUpperCase();
                sectionEl.appendChild(heading);

                const objectEl = document.createElement("div");
                objectEl.className = "resume-basics";
                objectEl.style.marginLeft = "20px";

                for (const key in sectionData) {
                    if (sectionData[key]) {
                        const p = document.createElement("p");
                        const noIndentKeys = ["name", "organization", "title"];
                        p.style.margin = "8px"
                        p.textContent = noIndentKeys.includes(key) ? `${sectionData[key]}` : `${key}: ${sectionData[key]}`;
                        p.style.marginLeft = noIndentKeys.includes(key) ? "0px" : "20px";
                        p.style.lineHeight = "1";
                        objectEl.appendChild(p);
                    }
                }

                sectionEl.appendChild(objectEl);
                display.appendChild(sectionEl);
            }
        }
    }

    function validateInput(section) {
        //finds all content in the document with the id for that section
        const inputs = document.querySelectorAll(`[id^='${section}_']`);
        // find at least one filled field (preferably name, title, or organization)
        const hasMainField = Array.from(inputs).some(input =>
            ["name", "title", "organization"].some(key =>
                input.id.includes(`${section}_${key}`) && input.value.trim() !== ""
            )
        );
        if (!hasMainField) {
            toast.error("Please fill out at least the name, title, or organization field before continuing.");
            return false;
        }
        return true;
    }

    /**
     * Handles operations that occur when a section is selected
     * @param option
     */
    function selectSection(option) {
        const selected = option.target.value;
        //updates the sectionSelected reactive attribute
        setSelectedSection(selected);
        //only show section entry dropdown if basics is not selected (basics is the only section that does not have an array of objects)
        populateEntryDropdown();
        setShowSectionEntry(selected !== 'basics');
    }

    /**
     * Handles when an entry is selected from an array attribute dropdown
     */
    function selectEntry(option) {
        const index = option.target.selectedIndex - 1; // -1 because of the "--" option
        if (index >= 0) {
            setSelectedIndex(index);
            // Autofill form with selected entry data
            const section = document.querySelector("#resumeSection").value;
            const selectedEntry = entries[index];
            for (const key in selectedEntry) {
                const input = document.querySelector(`#${section}_${key}`);
                if (input) {
                    input.value = selectedEntry[key];
                }
            }
        } else {
            setSelectedIndex(null);
        }
    }

    /**
     * Populates the entryDropdown when the sections contain a valid array.
     */
    function populateEntryDropdown() {
        //reset dropdown appearance
        setEntries([]);
        const section = document.querySelector("#resumeSection").value;
        const request = new XMLHttpRequest();
        request.open("GET", `http://127.0.0.1:3001/${section}`, true);
        request.send();
        request.onload = function () {
            let data = JSON.parse(request.responseText);
            const sectionData = data[section];
            if (section === "basics") {
                // basics is an object, not an array
                for (const key in sectionData) {
                    const input = document.querySelector(`#${section}_${key}`);
                    if (input) input.value = sectionData[key];
                    setUpdateState(true)
                }
            } else {
                setEntries(Array.isArray(sectionData) ? sectionData : [])
            }
        }
        readData()
    }

    async function downloadPDF() {
        const resume = document.getElementById("resumeDisplay");
        if (!resume) return;

        const canvas = await html2canvas(resume, {
            scale: 2, // higher quality
            useCORS: true,
            windowWidth: document.body.scrollWidth,
            windowHeight: resume.scrollHeight,
        });

        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");

        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = pageWidth;
        const imgHeight = (canvas.height * pageWidth) / canvas.width;

        let position = 0;
        let heightLeft = imgHeight;

        while (heightLeft > 0) {
            pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
            if (heightLeft > 0) {
                pdf.addPage();
                position = 0 - (imgHeight - heightLeft);
            }
        }

        pdf.save("resume.pdf");
    }

    return (<div className="App">
        <div id="header">Resume Builder</div>
        <ToastContainer/>
        <div id="appContainer">
            <div id="controlContainer">
                <div id="buttonContainer">
                    <button className="btn" onClick={addData}>
                        <span className="icon">＋</span> Add
                    </button>
                    <button className="btn" onClick={populateEntryDropdown}>
                        View
                    </button>
                    {/*if the dropdown has entries, or is in update state, show update button*/}
                    {(entries.length > 0 || inUpdateState) &&
                        <button className="btn outline" onClick={updateData}>✎ Update</button>}
                    <button className="btn" onClick={deleteData}> Delete</button>
                    <button className="btn" onClick={downloadPDF}>⬇ Download PDF</button>
                    <button className="btn" onClick={viewResume}>Show Full Resume</button>
                </div>
                <div id="textFieldContainer">
                    <label htmlFor="resumeSection">Resume Section:</label>
                    <select name="resume-section" id="resumeSection" onChange={selectSection}>
                        <option value="basics">Basic Information</option>
                        <option value="work">Work</option>
                        <option value="volunteer">Volunteering Experience</option>
                        <option value="education">Education</option>
                        <option value="awards">Awards</option>
                        <option value="certificates">Certificates</option>
                        <option value="publications">Publications</option>
                        <option value="skills">Skills</option>
                        <option value="references">References</option>
                        <option value="projects">Projects</option>
                    </select>
                    {showSectionEntry && entries.length > 0 && (
                        <div>
                            <label htmlFor="sectionEntry">Section Entry:</label>
                            <select name="section-entry" id="sectionEntry" onChange={selectEntry}>
                                <option>--</option>
                                {entries.map((item, index) => (
                                    <option
                                        key={index}>{item.name || item.organization || item.title}</option>
                                ))}
                            </select>
                        </div>
                    )}
                    {formComponents[selectedSection]}
                </div>
            </div>
            <div id="resumeDisplay">
                Your future resume goes here!
            </div>
        </div>

    </div>);
}

export default App;
