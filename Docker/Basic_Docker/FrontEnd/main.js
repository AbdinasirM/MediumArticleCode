document
  .getElementById("dataForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.getElementById("nameInput").value;
    const favoriteFood = document.getElementById("foodInput").value;
    const major = document.getElementById("majorInput").value;
    const hobbies = document.getElementById("hobbiesInput").value;

    const formData = {
      name: name,
      favoritefood: favoriteFood,
      major: major,
      hoppy: hobbies,
    };

    try {
      const response = await fetch("http://YOUR_IP_HERE:8000/savedata", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to save data");
      }

      // Fetch data from the API after saving it
      const fetchDataResponse = await fetch("http://YOUR_IP_HERE:8000/getdata");
      if (!fetchDataResponse.ok) {
        throw new Error("Failed to fetch data");
      }
      const responseData = await fetchDataResponse.json();

      // Update UI to display the fetched data
      const apiResponseElement = document.getElementById("apiResponse");
      apiResponseElement.innerHTML = ""; // Clear previous content
      responseData.forEach(data => {
        apiResponseElement.innerHTML += `
            <div class="col-4">
                <div class="card border-success mb-3" style="max-width: 18rem;">
                    <div class="card-header bg-transparent border-success">Data from API</div>
                    <div class="card-body text-success">
                        <p class="card-text">${data.name} is majoring ${data.major} and favorite food is ${data.favoritefood} and likes to ${data.hoppy}</p>
                    </div>
                    <div class="card-footer bg-transparent border-success">Report</div>
                </div>
            </div>
        `;
    });
    
    apiResponseElement.innerHTML += `
            </div>
        </div>
    `;
    } catch (error) {
      console.error("Error saving or fetching data:", error);
    }
  });
