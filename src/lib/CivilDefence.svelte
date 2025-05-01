<script>
    let alerts = [
        {
            id: "alert001",
            type: "Severe Weather Warning",
            severity: "Severe",
            issuedBy: "MetService New Zealand",
            issuedAt: new Date("2024-10-18T14:30:00Z"),
            expiresAt: new Date("2024-10-18T20:00:00Z"),
            affectedAreas: [
                { region: "Auckland", city: "Auckland" },
                { region: "Waikato", city: "Hamilton" }
            ],
            instructions: [
                "Stay indoors and secure outdoor objects.",
                "Avoid non-essential travel.",
                "Monitor local news and updates."
            ],
            additionalInfo: {
                source: "Civil Defence Emergency Management",
                contactNumber: "0800 422 922",
                website: "https://www.civildefence.govt.nz"
            },
            status: "Active"
        },
        {
            id: "alert002",
            type: "Flood Warning",
            severity: "Moderate",
            issuedBy: "NIWA",
            issuedAt: new Date("2024-10-17T18:00:00Z"),
            expiresAt: new Date("2024-10-18T22:00:00Z"),
            affectedAreas: [
                { region: "Bay of Plenty", city: "Tauranga" },
                { region: "Hawke's Bay", city: "Napier" }
            ],
            instructions: [
                "Avoid driving through flooded areas.",
                "Move to higher ground if necessary.",
                "Stay tuned for updates from local authorities."
            ],
            additionalInfo: {
                source: "Regional Council",
                contactNumber: "0800 884 881",
                website: "https://www.boprc.govt.nz"
            },
            status: "Active"
        },
    ];
    let fullscreen="smallScreen"
</script>
<section
class={fullscreen === "full" ? "bigScreen" : "smallScreen"}
id={fullscreen === "small" ? "smallScreen" : ""}
>

    <h2>Civil Defence Alerts in New Zealand
  <button
  class="fullscreen-toggle"
  title={fullscreen === "full" ? "Shrink" : "Enlarge"}
  on:click={() => fullscreen == "full" ? (fullscreen = "small") : (fullscreen = "full")} >
  {fullscreen == "full" ? "🔍➖" : "🔍➕"}
</button>
    </h2>
    
    {#each alerts as alert}
        <div class="alert">
            <h5>{alert.type} (Severity: {alert.severity})</h5>
            <small><p><strong>Issued By:</strong> {alert.issuedBy}</p>
            <p><strong>Issued At:</strong> {alert.issuedAt.toLocaleString()}</p>
            <p><strong>Expires At:</strong> {alert.expiresAt.toLocaleString()}</p></small>
            <div class="affected-areas">
                <strong>Affected Areas:</strong>
                <ul>
                    {#each alert.affectedAreas as area}
                        <li>{area.region}, {area.city}</li>
                    {/each}
                </ul>
            </div>
            <div class="instructions">
                <strong>Instructions:</strong>
                <ul>
                    {#each alert.instructions as instruction}
                        <li>{instruction}</li>
                    {/each}
                </ul>
            </div>
            <div class="additional-info">
                <strong>Additional Info:</strong>
                <small><p>Source: {alert.additionalInfo.source}</p>
                <p>Contact Number: {alert.additionalInfo.contactNumber}</p>
                <p>Website: <a href={alert.additionalInfo.website} target="_blank">{alert.additionalInfo.website}</a></p></small>
            </div>
            <small><p><strong>Status:</strong> {alert.status}</p></small>
        </div>
    {/each}
</section>

<style>
    .bigScreen {
        width: 1000px;
        height: 700px;
    }
    .bigScreen * {
        padding: 0.3rem;
    }
    .bigScreen div * {
        font-size: 1em;
    }


    .smallScreen {
        width: 375px;
        height: 375px;
    }
    .fullscreen-toggle {
        cursor: pointer;
        background: none;
        border: none;
        font-size: 1em;
        margin-left: 0.5em;
    }
</style>