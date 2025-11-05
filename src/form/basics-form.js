export function BasicsForm() {
    return (
        <div>
            <label htmlFor="basics_name">Name</label>
            <input id="basics_name" type="text" />
            <label htmlFor="basics_label">Label</label>
            <input id="basics_label" type="text" />
            <label htmlFor="basics_email">Email</label>
            <input id="basics_email" type="email" />
            <label htmlFor="basics_phone">Phone</label>
            <input id="basics_phone" type="text" />
            <label htmlFor="basics_website">Website</label>
            <input id="basics_website" type="url" />
            <label htmlFor="basics_summary">Summary</label>
            <input id="basics_summary" type="text" />
        </div>
    );
}
