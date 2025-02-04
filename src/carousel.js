let api = async (jobLimits = 10) => {
    try {
        const response = await fetch(`https://backend-prod.app.hiringmine.com/api/jobAds/all?limit=${jobLimits}&pageNo=1&keyWord=&category=&isPending=false`);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const JSONresponse = await response.json();
        console.log('call api ====>', JSONresponse);
        card(JSONresponse.data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

const cardContainer = document.getElementById('job-container');

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
    console.log(jobsCard);

    cardContainer.innerHTML = jobsCard
        .map((job) => {
            const timeAgo = getTimeAgo(job.updatedAt); // Calculate time ago

            return `
                <div class="flex flex-col justify-between bg-white shadow-xl py-6 px-6 rounded-lg border border-gray-200 w-[330px] h-[38vh] cursor-pointer transition-all ease-linear duration-200 hover:translate-y-[-5px]">
                    <div>
                        <div class="flex justify-between items-start">
                            <h3 class="text-black font-medium text-base">${job.companyName || 'Anonymous'}</h3>
                            <img src="../assets/logo.png" alt="Company Logo" class="w-10 h-auto" />
                        </div>
                        <h3 class="font-bold text-base text-black mt-1">${job.designation}</h3>
                        <h3 class="font-bold text-base text-[#4D3BDB] mt-1">
                            ${
                                job.payRangeStart && job.payRangeEnd
                                    ? `RS ${job.payRangeStart} - ${job.payRangeEnd}`
                                    : "No salary mentioned"
                            }
                        </h3>
                    </div>
                    <div class="">
                        <div class="flex justify-between text-gray-600 text-base mt-2">
                            <h3 class="text-black">${job.city ? job.city + ", " : ""}${job.country || ""}</h3>
                            <h3 class="text-black">${job.views} views</h3>
                        </div>
                        <div class="flex justify-between text-base mt-2">
                            <h3 class="text-gray-500">${timeAgo}</h3>
                            <h3 class="text-[#3f3f3f] font-bold">
                                posted by <span class="text-[#4D3BDB] font-medium">${job.user.firstName || "Unknown"}</span>
                            </h3>
                        </div>
                    </div>
                </div>`;
        })
        .join("");
};

api(3);
