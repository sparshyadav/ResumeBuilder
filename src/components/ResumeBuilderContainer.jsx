import React, { useState, useRef } from "react";
import Resume from "./Resume";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import "./ResumeBuilderContainer.scss";

function ResumeBuilder() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        experiences: [""],
        companies: [""],
        schools: [""],
        degrees: [""],
        skills: "",
        summary: ""
    });

    const resumeRef = useRef(null);
    const [theme, setTheme] = useState(true);

    function toggleTheme() {
        setTheme((prev) => !prev);
        console.log("Theme -> ", theme);
    }

    const handleChange = (e, index) => {
        const { name, value } = e.target;
        if (name === "experience") {
            const newExperiences = [...formData.experiences];
            newExperiences[index] = value;
            setFormData({ ...formData, experiences: newExperiences });
        } else if (name === "company") {
            const newCompanies = [...formData.companies];
            newCompanies[index] = value;
            setFormData({ ...formData, companies: newCompanies });
        } else if (name === "school") {
            const newSchools = [...formData.schools];
            newSchools[index] = value;
            setFormData({ ...formData, schools: newSchools });
        } else if (name === "degree") {
            const newDegrees = [...formData.degrees];
            newDegrees[index] = value;
            setFormData({ ...formData, degrees: newDegrees });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleAddExperience = () => {
        setFormData({
            ...formData,
            experiences: [...formData.experiences, ""],
            companies: [...formData.companies, ""]
        });
    };

    const handleAddEducation = () => {
        setFormData({
            ...formData,
            schools: [...formData.schools, ""],
            degrees: [...formData.degrees, ""]
        });
    };

    const handleDownloadPDF = () => {
        html2canvas(resumeRef.current, {
            scale: 2,
            useCORS: true,
            allowTaint: true,
            scrollX: 0,
            scrollY: 0,
        }).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF("p", "mm", "a4");
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const imgWidth = canvas.width;
            const imgHeight = canvas.height;
            const ratio = imgWidth / imgHeight;
            let heightLeft = (pdfWidth / ratio) * (canvas.height / canvas.width);
            let yPosition = 0;

            while (heightLeft > 0) {
                pdf.addImage(imgData, "PNG", 0, yPosition, pdfWidth, (pdfWidth / ratio));
                heightLeft -= pdfHeight;
                yPosition -= pdfHeight;
                if (heightLeft > 0) pdf.addPage();
            }

            pdf.save(formData.name ? `${formData.name}_Resume.pdf` : "Resume.pdf");
        });
    };

    return (
        <div className="builder-main-container">
            <div className="builder-form-center-container">
                <h2>Resume Builder</h2>
                <form className="builder-form">
                    <div className="input-field-container">
                        <label className="label">Name: </label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-field-container">
                        <label className="label">Email:</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-field-container">
                        <label className="label">Phone Number: </label>
                        <input
                            type="tel"
                            name="phone"
                            placeholder="Phone Number"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-field-container">
                        <label className="label">Address: </label>
                        <input
                            type="text"
                            name="address"
                            placeholder="Address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="user-profile">
                        <h3>Profile Summary
                            <input
                                type="text"
                                name="summary"
                                placeholder='Profile Summary'
                                value={formData.summary}
                                onChange={handleChange}
                                required
                            />
                        </h3>
                    </div>
                    <div className="user-experience">
                        <h3>Experience</h3>
                        {formData.experiences.map((exp, index) => (
                            <div className="single-experience" key={index}>
                                <div className="input-field-container">
                                    <label className="label">Company Name {index + 1}: </label>
                                    <input
                                        type="text"
                                        name="company"
                                        placeholder={`Company Name ${index + 1}`}
                                        value={formData.companies[index]}
                                        onChange={(e) => handleChange(e, index)}
                                        required
                                    />
                                </div>
                                <div className="input-field-container">
                                    <label className="label">Experience {index + 1}: </label>
                                    <textarea
                                        className="text-area"
                                        name="experience"
                                        placeholder={`Experience ${index + 1}`}
                                        value={exp}
                                        onChange={(e) => handleChange(e, index)}
                                        required
                                    ></textarea>
                                </div>
                            </div>
                        ))}
                        <div className="experience-button">
                            <button type="button" onClick={handleAddExperience}>
                                Add Another Experience
                            </button>
                        </div>
                    </div>

                    <div className="user-education">
                        <h3>Education</h3>
                        {formData.schools.map((school, index) => (
                            <div className="single-education" key={index}>
                                <div className="input-field-container">
                                    <label className="label">Institute Name {index + 1}: </label>
                                    <input
                                        type="text"
                                        name="school"
                                        placeholder={`School Name ${index + 1}`}
                                        value={formData.schools[index]}
                                        onChange={(e) => handleChange(e, index)}
                                        required
                                    />
                                </div>
                                <div className="input-field-container">
                                    <label className="label">Course {index + 1}: </label>
                                    <input
                                        type="text"
                                        name="degree"
                                        placeholder={`Degree ${index + 1}`}
                                        value={formData.degrees[index]}
                                        onChange={(e) => handleChange(e, index)}
                                        required
                                    />
                                </div>
                            </div>
                        ))}
                        <div className="experience-button">
                            <button type="button" onClick={handleAddEducation}>
                                Add Another Education
                            </button>
                        </div>
                    </div>

                    <div className="input-field-container">
                        <label className="label">Skills: </label>
                        <textarea
                            name="skills"
                            placeholder="Skills (comma separated)"
                            value={formData.skills}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>
                </form>
                <div className="choose-theme-container">
                    <button onClick={toggleTheme}>Theme 1</button>
                    <button onClick={toggleTheme}>Theme 2</button>
                </div>
                <button onClick={handleDownloadPDF}>Download Resume</button>
            </div>
            <div ref={resumeRef} className="builder-main-resume">
                <Resume formData={formData} theme={theme} />
            </div>
        </div>
    );
}

export default ResumeBuilder;