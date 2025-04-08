const cardContainer = document.getElementById("job-container");

let api = async (jobLimits = 10) => {
  try {
    const response = await fetch(
      `https://hiringmine-railway-production.up.railway.app/api/jobAds/all?limit=${jobLimits}&pageNo=1&keyWord=&category=&isPending=false`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const JSONresponse = await response.json();
    card(JSONresponse.data);
    console.log("call api ====>", JSONresponse);
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
