export function ProjectsForm() {
    return (
        <div>
            <label htmlFor="projects_name">Name</label>
            <input id="projects_name" type="text"/>
            <label htmlFor="projects_start_date">Start Date</label>
            <input id="projects_start_date" type="text"/>
            <label htmlFor="projects_end_date">End Date</label>
            <input id="projects_end_date" type="text"/>
            <label htmlFor="projects_description">Description</label>
            <input id="projects_description" type="text"/>
            <label htmlFor="projects_highlights">Highlights</label>
            <input id="projects_highlights" type="text"/>
            <label htmlFor="projects_url">Url</label>
            <input id="projects_url" type="text"/>
        </div>
    )
}
