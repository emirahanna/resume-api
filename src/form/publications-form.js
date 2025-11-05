export function PublicationsForm() {
    return (
        <div>
            <label htmlFor="publications_name">Name</label>
            <input id="publications_name" type="text"/>
            <label htmlFor="publications_publisher">Publisher</label>
            <input id="publications_publisher" type="text"/>
            <label htmlFor="publications_release_date">Release Date</label>
            <input id="publications_release_date" type="date"/>
            <label htmlFor="publications_url">URL</label>
            <input id="publications_url" type="url"/>
        </div>
    )
}
