let api = async (jobLimits = 8) => {
  try {
    const response = await fetch(
      `https://hiringmine-railway-production.up.railway.app/api/jobAds/all?limit=${jobLimits}&pageNo=1&keyWord=&category=&isPending=false`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const JSONresponse = await response.json();
    console.log("call api ====>", JSONresponse);
    card(JSONresponse.data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const cardContainer = document.getElementById("job-container");

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

const leftArrow = document.getElementById("leftArrow");
const rightArrow = document.getElementById("rightArrow");

const cardWidth = 320; // Width of one card
let currentIndex = 0; // Track current scroll position
let totalCards = 0; // Will update dynamically

const card = (jobsCard) => {
  console.log(jobsCard);

  totalCards = jobsCard.length; // Update total cards

  cardContainer.innerHTML = jobsCard
    .map((job) => {
      const timeAgo = getTimeAgo(job.updatedAt);
      return `
        <div class="job-card flex flex-col justify-between bg-white shadow-lg py-6 px-6 rounded-md border border-gray-200 cursor-pointer transition-all ease-linear duration-200 hover:translate-y-[-5px] max-lg:min-w-[330px] max-lg:px-4 max-lg:py-4 max-md:min-w-[280px]">
          <div>
            <div class="flex justify-between items-start">
              <h3 class="text-black font-medium text-base max-lg:text-sm">${job.companyName || "Anonymous"}</h3>
              <img src="../assets/logo.png" alt="Company Logo" class="w-10 h-auto max-lg:w-8" />
            </div>
            <h3 class="font-bold text-base text-black mt-1 max-lg:text-sm">${job.designation}</h3>
            <h3 class="font-bold text-base text-[#4D3BDB] mt-1 max-lg:text-sm">
              ${
                job.payRangeStart && job.payRangeEnd
                  ? `RS ${job.payRangeStart} - ${job.payRangeEnd}`
                  : "No salary mentioned"
              }
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
        </div>`;
    })
    .join("");

  currentIndex = 0; // Reset to first card
};

// Fetch API
api(8);

setTimeout(() => {
  setInterval(() => {
    if (currentIndex == totalCards - 1) {
      currentIndex = 0;
    } else {
      currentIndex++;
    }
    cardContainer.scrollTo({
      left: currentIndex * cardWidth,
      behavior: "smooth",
    });
  }, 2000);
}, 1000);

// Scroll Event Handlers
leftArrow.addEventListener("click", () => {
  console.log("left");
  if (currentIndex === 0) {
    currentIndex = totalCards - 1;
  } else {
    currentIndex--;
  }
  cardContainer.scrollTo({
    left: currentIndex * cardWidth,
    behavior: "smooth",
  });
});

rightArrow.addEventListener("click", () => {
  console.log("right");
  if (currentIndex == totalCards - 1) {
    currentIndex = 0;
  } else {
    currentIndex++;
  }
  cardContainer.scrollTo({
    left: currentIndex * cardWidth,
    behavior: "smooth",
  });
});
