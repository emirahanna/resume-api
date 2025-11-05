export function AwardsForm() {
    return (
        <div>
            <label htmlFor="awards_title">Title</label>
            <input id="awards_title" type="text" />
            <label htmlFor="awards_date">Date</label>
            <input id="awards_date" type="date" />
            <label htmlFor="awards_issuer">Issuer</label>
            <input id="awards_issuer" type="text" />
            <label htmlFor="awards_summary">Summary</label>
            <input id="awards_summary" type="text" />
        </div>
    )
}
