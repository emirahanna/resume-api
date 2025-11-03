export function PublicationsForm() {
    return (
        <div>
            <label htmlFor="publications_name">Name</label>
            <input id="publications_name" type="text"/>
            <label htmlFor="publications_publisher">Publisher</label>
            <input id="publications_publisher" type="text"/>
            <label htmlFor="publications_issuer">Issuer</label>
            <input id="publications_issuer" type="text"/>
            <label htmlFor="publications_url">URL</label>
            <input id="publications_url" type="text"/>
        </div>
    )
}
