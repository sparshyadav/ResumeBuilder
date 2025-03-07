import React, { useRef } from "react";
import "./Resume.scss";

function Resume({ formData, theme }) {
    const resumeRef = useRef(null);
    let formDataSkills = formData.skills.split(" ");

    return (
        <div className={theme ? 'resume-main-container dark-theme' : "resume-main-container"} ref={resumeRef}>
            <div className="resume-center-container">
                <div className={theme ? "resume-dark-personal-info-container" : "resume-personal-info-container"}>
                    <h1 className={theme ? "dark-name" : "name"}>{formData.name}</h1>
                    <div className="other-personal-info">
                        <p>{formData.phone}</p>
                        <p>{formData.email}</p>
                        <p>{formData.address}</p>
                    </div>
                </div>
                <div className="border"></div>
                <div className="resume-experience">
                    <h3>Experience</h3>
                    {formData.companies.map((com, index) => (
                        <>
                            <p key={index}><strong>Company:</strong> {com}</p>
                            <p className="experience-loop">{formData.experiences[index]}</p>
                        </>
                    ))}
                </div>
                {/* <div className="border"></div> */}
                <div className="resume-education">
                    <h3>Education</h3>
                    {formData.schools.map((school, index) => (
                        <>
                            <p><strong>Institute:</strong>  {school}</p>
                            <p className="experience-loop"> {formData.degrees[index]}</p>
                        </>
                    ))}
                </div>
                {/* <div className="border"></div> */}
                <div className="resume-skills">
                    <h3>Skills</h3>
                    <div className="all-skills">
                        {
                            formDataSkills.map((skill) => (
                                <p className={theme ? "" : "skill"}>{skill}</p>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Resume;
