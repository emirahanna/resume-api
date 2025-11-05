export function VolunteerForm() {
    return (
        <div>
            <label htmlFor="volunteer_organization">Organization</label>
            <input id="volunteer_organization" type="text"/>
            <label htmlFor="volunteer_position">Position</label>
            <input id="volunteer_position" type="text"/>
            <label htmlFor="volunteer_website">Website</label>
            <input id="volunteer_website" type="url"/>
            <label htmlFor="volunteer_start_date">Start Date</label>
            <input id="volunteer_start_date" type="date"/>
            <label htmlFor="volunteer_end_date">End Date</label>
            <input id="volunteer_end_date" type="date"/>
            <label htmlFor="volunteer_summary">Summary</label>
            <input id="volunteer_summary" type="text"/>
            <label htmlFor="volunteer_highlights">Highlights</label>
            <input id="volunteer_highlights" type="text"/>
        </div>
    )
}
