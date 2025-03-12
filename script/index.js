
// Loding funconality
function showLoader (){
  document.getElementById("loader").classList.remove("hidden")
  document.getElementById("video_wrapper").classList.add("hidden")
}
function hideLoader (){
  document.getElementById("loader").classList.add("hidden")
  document.getElementById("video_wrapper").classList.remove("hidden")
}




// Search functionality
document.getElementById("search_input").addEventListener("keyup", (e) => {
  const searchValue = e.target.value;
  console.log(searchValue);
  loadVideo(searchValue);
});





// Category load and show
function removeActiveClass() {
  const activeButtons = document.getElementsByClassName("active");
  for (let btn of activeButtons) {
    btn.classList.remove("active");
  }
}

function loadCategory() {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => {
      displayCategories(data.categories);
    });
}

function displayCategories(categories) {
  const categoryWrapper = document.getElementById("category_wrapper");

  for (const cat of categories) {
    const categoryButton = document.createElement("div");
    categoryButton.innerHTML = `
     <button id="btn-${cat.category_id}" onclick="loadCategoryVideos(${cat.category_id})"  class="bg-gray-200 px-6 py-2 rounded-md"> ${cat.category} </button>
    `;

    categoryWrapper.appendChild(categoryButton);
  }
}

loadCategory();





// Load category videos
function loadCategoryVideos(id) {
  const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      displayVideo(data.category);
      removeActiveClass();
      document.getElementById(`btn-${id}`).classList.add("active");
    });
}





// Video load and show function
function loadVideo(searchValue = "") {
  showLoader ();
  fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchValue}`)
    .then((videos) => videos.json())
    .then((data) => displayVideo(data.videos));
  removeActiveClass();
  document.getElementById("btn-all").classList.add("active");
}

function displayVideo(videos) {
  const videoWrapper = document.getElementById("video_wrapper");
  videoWrapper.innerHTML = "";
  if (videos.length === 0) {
    videoWrapper.innerHTML = `
          <div class="text-center container mx-auto h-[70vh] w-100 col-span-4 content-center items-center"> 
        <div class=" bg-red-100 mx-auto  rounded-lg w-5/12 p-5 h-[400px] flex justify-center flex-col gap-2 items-center">
            <img src="./assets/Icon.png" alt="">
        <h2 class="text-3xl font-bold mt-3 text-gray-700">Video Not Found</h2>
        </div>
        </div>
        
    `;
    return;
  }
  videos.map((video) => {
    const videoItem = document.createElement("div");

    videoItem.innerHTML = `
      <div class="bg-white rounded-lg overflow-hidden shadow-md">
       <div class="relative">
           <img src="${video.thumbnail}" alt="Video thumbnail" class="w-full h-48 object-cover">
           <span class="absolute bottom-2 right-2 bg-black text-white text-sm px-2 py-1 rounded capitalize">${getVideoUploadTime(
             video.others.posted_date
           )}</span>
 
       </div>
       <div class="p-4">
   
           <div class="flex space-x-3">
               <img src="${video.authors[0].profile_picture}" alt="Author" class="w-10 h-10 object-cover rounded-full ring ring-2 ring-red-500">
               <div>
                   <h3 class="font-semibold text-lg -mt-1">${video.title}</h3>
                   <div class="flex items-center space-x-2 mt-0">
                       <p class="text-gray-600">${video.authors[0].profile_name}</p>
                      ${
                        video.authors[0].verified
                          ? `<img class="w-5 h-5" src="https://img.icons8.com/?size=100&id=99285&format=png&color=339af0" title="Verified">`
                          : ""
                      }
                   </div>
                   <p class="text-gray-600  text-sm">${video.others.views} views</p>
               </div>
           </div>
           <button onclick="loadVideoDetails('${video.video_id}')" class="btn bg-[#ef4444] text-white w-full mt-3">View Details</button>

       </div>
   </div>  
    `;
    videoWrapper.appendChild(videoItem);
    hideLoader()
  });
}
loadVideo();





// loadVideoDetails
function loadVideoDetails(id) {
  const url = `https://openapi.programming-hero.com/api/phero-tube/video/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showVideoDetails(data.video));
}

function showVideoDetails(videoDetails) {
  console.log(videoDetails);
  const modalContainer = document.getElementById("videoDetailsModal");
  modalContainer.innerHTML = `
       <div id="modal" class="modal-box">
      <div class="w-full min-h-[250px] mt-0 rounded-md bg-gray-100 border border-gray-300 overflow-hidden p-1">
      <img class="w-full h-full object-cover  rounded-md" src="${videoDetails.thumbnail}" alt="${videoDetails.title}"/>
      </div>
      <h3 class="text-2xl font-semibold mt-4 mb-0">${videoDetails.title}</h3>
      <p class="py-4 line-clamp-5 overflow-hidden pb-0">${videoDetails.description}</p>
      <div class="modal-action">
        <form method="dialog">
          <button class="btn">Close</button>
        </form>
      </div>
    </div>

`;
  modalContainer.showModal();
}
