document.addEventListener("DOMContentLoaded", () => {
    const collectionDiv = document.getElementById("collection");
    const eraFilter = document.getElementById("eraFilter");
    const authFilter = document.getElementById("authFilter");
    const searchInput = document.getElementById("searchInput");

    fetch("data.json")
        .then(response => response.json())
        .then(data => {
            populateFilterOptions(data);
            displayCollection(data);
            
            eraFilter.addEventListener("change", () => filterAndDisplayItems(data));
            authFilter.addEventListener("change", () => filterAndDisplayItems(data));
            searchInput.addEventListener("input", () => filterAndDisplayItems(data));
        });

    function populateFilterOptions(data) {
        // Populate Era filter
        const eras = [...new Set(data.eras.map(era => era.period))];
        eras.forEach(era => {
            const option = document.createElement("option");
            option.value = era;
            option.textContent = era;
            eraFilter.appendChild(option);
        });

        // Populate Auth Type filter
        const authTypes = [...new Set(data.eras.flatMap(era => 
            era.items.map(item => item.authType)
        ))];
        authTypes.forEach(authType => {
            const option = document.createElement("option");
            option.value = authType;
            option.textContent = authType;
            authFilter.appendChild(option);
        });
    }

    function filterAndDisplayItems(data) {
        const selectedEra = eraFilter.value;
        const selectedAuth = authFilter.value;
        const searchTerm = searchInput.value.toLowerCase();

        const filteredData = {
            eras: data.eras
                .filter(era => selectedEra === "all" || era.period === selectedEra)
                .map(era => ({
                    ...era,
                    items: era.items.filter(item => {
                        const matchesAuth = selectedAuth === "all" || item.authType === selectedAuth;
                        const matchesSearch = 
                            item.title.toLowerCase().includes(searchTerm) ||
                            item.features.toLowerCase().includes(searchTerm) ||
                            item.platform.toLowerCase().includes(searchTerm) ||
                            item.year.toString().includes(searchTerm) ||
                            item.authType.toLowerCase().includes(searchTerm);
                        return matchesAuth && matchesSearch;
                    })
                }))
                .filter(era => era.items.length > 0)
        };

        displayCollection(filteredData);
    }

    function displayCollection(data) {
        collectionDiv.innerHTML = "";

        data.eras.forEach(era => {
            const eraSection = document.createElement("section");
            eraSection.innerHTML = `
                <h2 class="era-header">${era.title}</h2>
                <p class="era-description">${era.description}</p>
                <div class="items-container"></div>
            `;

            const itemsContainer = eraSection.querySelector('.items-container');
            era.items.forEach(item => {
                const card = document.createElement("div");
                card.classList.add("card");
                card.innerHTML = `
                    <img src="${item.image}" alt="${item.title}">
                    <div class="card-content">
                        <h3>${item.title} (${item.year})</h3>
                        <p><strong>Platform:</strong> ${item.platform}</p>
                        <p><strong>Auth Type:</strong> ${item.authType}</p>
                        <p>${item.features}</p>
                    </div>
                `;
                itemsContainer.appendChild(card);
            });

            collectionDiv.appendChild(eraSection);
        });
    }
});