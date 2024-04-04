// let fetchButton = document.getElementById("fetchbtn");

// fetchButton.addEventListener("click", async () => {
//     try {
//         const responseData = await fetch("http://192.168.1.9:8000");
//         if (!responseData.ok) {
//             throw new Error('Failed to fetch data');
//         }
//         const data = await responseData.json();
//         // Access the message property from the data object
//         const message = data.message;

//         document.getElementById("apiResponse").innerHTML = `
//         <div class="card border-success mb-3" style="max-width: 18rem;">
//         <div class="card-header bg-transparent border-success">Data from API</div>
//         <div class="card-body text-success">
//             <p class="card-text" id="para">username is majoring [data.major] and favorite food is [message.favorite food] and like to </p>
//         </div>
//         <div class="card-footer bg-transparent border-success">by AbdinasirM</div>
//     </div>`;

//         console.log(data); // Log the JSON data received from the server
//     } catch (error) {
//         console.error('Error fetching data:', error);
//     }
// });
// document.getElementById("dataForm").addEventListener("submit", async (event) => {
//     event.preventDefault();

//     const name = document.getElementById("nameInput").value;
//     const favoriteFood = document.getElementById("foodInput").value;
//     const major = document.getElementById("majorInput").value;
//     const hobbies = document.getElementById("hobbiesInput").value;

//     const formData = {
//         name: name,
//         favoritefood: favoriteFood,
//         major: major,
//         hoppy: hobbies
//     };

//     try {
//         const response = await fetch("http://192.168.1.9:8000/savedata", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify(formData)
//         });

//         if (!response.ok) {
//             throw new Error('Failed to save data');
//         }

//         // Fetch data from the API after saving it
//         const fetchDataResponse = await fetch("http://localhost:8000/getdata");
//         if (!fetchDataResponse.ok) {
//             throw new Error('Failed to fetch data');
//         }
//         const responseData = await fetchDataResponse.json();

//         // Update UI to display the fetched data
//         const apiResponseElement = document.getElementById("apiResponse");
//         apiResponseElement.innerHTML = ""; // Clear previous content
//         responseData.forEach(data => {
//             const card = document.createElement("div");
//             card.className = "card border-success mb-3";
//             card.style = "max-width: 18rem;";
//             card.innerHTML = `
//                 <div class="card-header bg-transparent border-success">Data from API</div>
//                 <div class="card-body text-success">
//                     <p class="card-text">Name: ${data.name}</p>
//                     <p class="card-text">Favorite Food: ${data.favoritefood}</p>
//                     <p class="card-text">Major: ${data.major}</p>
//                     <p class="card-text">Hobbies: ${data.hoppy}</p>
//                 </div>
//                 <div class="card-footer bg-transparent border-success">by AbdinasirM</div>
//             `;
//             apiResponseElement.appendChild(card);
//         });

//     } catch (error) {
//         console.error('Error saving or fetching data:', error);
//     }
// });

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
      const response = await fetch("http://192.168.1.9:8000/savedata", {
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
      const fetchDataResponse = await fetch("http://192.168.1.9:8000/getdata");
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
                    <div class="card-footer bg-transparent border-success">by AbdinasirM</div>
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
