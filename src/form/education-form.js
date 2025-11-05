export function EducationForm() {
    return (
        <div>
            <label htmlFor="education_university">University</label>
            <input id="education_university" type="text"/>
            <label htmlFor="education_website">Website</label>
            <input id="education_website" type="url"/>
            <label htmlFor="education_area">Area</label>
            <input id="education_area" type="text"/>
            <label htmlFor="education_level">Education Level</label>
            <input id="education_level" type="text"/>
            <label htmlFor="education_start_date">Start Date</label>
            <input id="education_start_date" type="date"/>
            <label htmlFor="education_end_date">End Date</label>
            <input id="education_end_date" type="date"/>
            <label htmlFor="education_GPA">GPA</label>
            <input id="education_GPA" type="text"/>
        </div>
    )
}
