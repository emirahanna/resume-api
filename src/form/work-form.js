export function WorkForm() {
    return (
        <div>
            <label htmlFor="work_organization">Organization</label>
            <input id="work_organization" type="text"/>
            <label htmlFor="work_position">Position</label>
            <input id="work_position" type="text"/>
            <label htmlFor="work_website">Website</label>
            <input id="work_website" type="url"/>
            <label htmlFor="work_start_date">Start Date</label>
            <input id="work_start_date" type="date"/>
            <label htmlFor="work_end_date">End Date</label>
            <input id="work_end_date" type="date"/>
            <label htmlFor="work_summary">Summary</label>
            <input id="work_summary" type="text"/>
            <label htmlFor="work_highlights">Highlights</label>
            <input id="work_highlights" type="text"/>
        </div>
    )
}
