export function CertificatesForm() {
    return (
        <div>
            <label htmlFor="certificates_title">Title</label>
            <input id="certificates_title" type="text" />
            <label htmlFor="certificates_date">Date</label>
            <input id="certificates_date" type="date" />
            <label htmlFor="certificates_issuer">Issuer</label>
            <input id="certificates_issuer" type="text" />
            <label htmlFor="certificates_url">URL</label>
            <input id="certificates_url" type="url" />
        </div>
    )
}
