const API_KEY = "b245380784514a398771c2eb2dcff07c";
const newsContainer = document.getElementById("news-container");
const topics = document.getElementById("topics");
const searchInput = document.getElementById("searchInput");

async function fetchNews(topic) {
    try {
        let url;
        if (topic === "top headlines") {
            url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${API_KEY}`;
        } else {
            url = `https://newsapi.org/v2/everything?q=${topic}&apiKey=${API_KEY}`;
        }

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        const articles = data.articles;

        newsContainer.innerHTML = "";

        articles.forEach(article => {
            const newsCard = createNewsCard(article);
            newsContainer.appendChild(newsCard);
        });
    } catch (error) {
        console.error("Error fetching news:", error);
    }
}

function createNewsCard(article) {
    const newsCard = document.createElement("div");
    newsCard.classList.add("news-card");

    const image = document.createElement("img");
    image.src = article.urlToImage || "placeholder-image-url";
    image.alt = article.title;
    newsCard.appendChild(image);

    const content = document.createElement("div");
    content.classList.add("news-card-content");

    const title = document.createElement("h2");
    title.textContent = article.title;
    content.appendChild(title);

    const description = document.createElement("p");
    description.textContent = article.description || "No description available";
    content.appendChild(description);

    const readMoreLink = document.createElement("a");
    readMoreLink.href = article.url;
    readMoreLink.textContent = "Read more";
    content.appendChild(readMoreLink);

    newsCard.appendChild(content);

    return newsCard;
}

topics.addEventListener("click", async (event) => {
  if (event.target.tagName === "LI") {
      const topic = event.target.textContent.toLowerCase();
      await fetchNews(topic);
  }
});
function displayNewsCategory(category) {
    const content = document.querySelector(".content h2");
    content.textContent = `Latest ${category} Updates`;
}

topics.addEventListener("click", async (event) => {
    if (event.target.tagName === "LI") {
        const topic = event.target.textContent.toLowerCase();
        await fetchNews(topic);
        displayNewsCategory(topic.charAt(0).toUpperCase() + topic.slice(1));
    }
});

searchInput.addEventListener("input", (event) => {
    const searchTerm = event.target.value;
    if (searchTerm) {
        fetchNews(searchTerm);
    }
});

// Fetch top headlines on page load
fetchNews("top headlines");

