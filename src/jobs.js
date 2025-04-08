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
