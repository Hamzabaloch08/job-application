const cardContainer = document.getElementById("container");
const dropDownContainer = document.querySelector('.dropDown-container')
const dropDownWrapper = document.querySelector('.dropDown-wrapper')
const dropDownMenu = document.querySelector('.dropDown-menu')
const dropDownBtn = document.querySelector('.dropDown-button')


let api = async (jobLimits = 10) => {
  try {
    const response = await fetch(
      `https://hiringmine-railway-production.up.railway.app/api/jobAds/all?limit=${jobLimits}&pageNo=1&keyWord=&category=&isPending=false`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const JSONresponse = await response.json();
    console.log(JSONresponse.data, 'daataa')
    card(JSONresponse.data);
    multipleCards(JSONresponse.data)

  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const getTimeAgo = (updatedAt) => {
  const updatedTime = new Date(updatedAt);
  const currentTime = new Date();
  const diffInSeconds = Math.floor((currentTime - updatedTime) / 1000);

  if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours} hours ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return `${diffInDays} days ago`;
  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) return `${diffInWeeks} weeks ago`;
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) return `${diffInMonths} months ago`;
  const diffInYears = Math.floor(diffInDays / 365);
  return `${diffInYears} years ago`;
};

const card = (jobsCard) => {
  cardContainer.innerHTML = jobsCard
    .map((job) => {
      const timeAgo = getTimeAgo(job.updatedAt);
      return `
          <div class="flex flex-col justify-between bg-white shadow-lg py-6 px-6 rounded-md border border-gray-200 cursor-pointer transition-all ease-linear duration-200 hover:translate-y-[-5px] 
    w-[562px] min-w-[562px] 
    lg:w-[48%] lg:min-w-[48%] 
    md:w-[45%] md:min-w-[45%] 
    sm:w-[90%] sm:min-w-[90%] 
    max-sm:w-full max-sm:min-w-full h-[43vh]">
  
            
            <div>
              <div class="flex justify-between items-center">
                <h3 class="text-black font-medium text-base max-lg:text-sm">${job.companyName || "Anonymous"}</h3>
                <img src="../assets/logo.png" alt="Company Logo" class="w-10 h-auto max-lg:w-8" />
              </div>
              <h3 class="font-bold text-base text-black mt-1 max-lg:text-sm">${job.designation}</h3>
              <h3 class="font-bold text-base text-[#4D3BDB] mt-1 max-lg:text-sm">
                ${job.payRangeStart && job.payRangeEnd ? `RS ${job.payRangeStart} - ${job.payRangeEnd}` : "No salary mentioned"}
              </h3>
            </div>
  
            <div>
              <div class="flex justify-between text-gray-600 text-base mt-2 max-lg:text-sm">
                <h3 class="text-black">${job.city ? job.city + ", " : ""}${job.country || ""}</h3>
                <h3 class="text-black">${job.views} views</h3>
              </div>
              <div class="flex justify-between text-base mt-2 max-lg:text-sm">
                <h3 class="text-gray-500">${timeAgo}</h3>
                <h3 class="text-[#3f3f3f] font-bold">
                  posted by <span class="text-[#4D3BDB] font-medium">${job.user.firstName || "Unknown"}</span>
                </h3>
              </div>
            </div>
          </div>
        `;
    })
    .join("");
};

api(1);

const multipleCards = (ele) => {
  ele.forEach(e => {
    console.log(e)
    dropDownMenu.innerHTML += `
            <input
              type="checkbox"
              id="development"
              name="development"
              value="development"
            />
            <label for="development">Development</label><br />
            <input
              type="checkbox"
              id="marketing"
              name="marketing"
              value="marketing"
            />
            <label for="marketing">Marketing & Sales</label><br />
            <input type="checkbox" id="art" name="art" value="art" />
            <label for="art">Art & Illustration</label><br />
            <div class="flex flex-row justify-between mt-7">
              <div
                class="text-[#4d3bdb] text-[12px] font-bold text-center cursor-pointer mt-1.5"
              >
                Clear
              </div>
              <div
                class="bg-[#4d3bdb] rounded-full w-[100px] h-[30px] cursor-pointer align-middle"
              >
                <div
                  class="text-[#fff] text-[12px] font-bold text-center mt-1.5"
                >
                  Show Results
                </div>
              </div>
            </div>
          
    `
  });
}

const dropDown = () => {
  console.log('clicked')

  if(dropDownMenu.classList.contains('hidden')){
    dropDownMenu.classList.remove('hidden')
    dropDownMenu.classList.add('block')
  } else {
    dropDownMenu.classList.add('hidden')
    dropDownMenu.classList.remove('block')
  }
}

dropDownBtn.addEventListener('click',dropDown)

