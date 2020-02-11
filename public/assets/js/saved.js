$.getJSON("/articles/saved", function (data) {
    if (data.length == 0) {
        displayNoSavedArticlesCard()
        return;
    } else {
        console.log("WE GOT SAVED ARTICLES")
        for (i = 0; i < data.length; i++) {
            $(".saved-body").append(`
            <div class="card articleCard mt-4 mb-4" >
            <div class="card-header">
            <h5>
            <a class="text-wrap text-break" id="scrapedTitle">${data[i].title}</a>

        
            <button class="btn btn-danger float-right shadow-buttons ml-2" data-id="${data[i]._id}">Delete From Saved</button>
            <button class="btn btn-primary float-right shadow-buttons">Article Notes</button>
           

            </h5>

            </div>
            <div class="card-body">
            <h5 class="card-title">${data[i].title}</h5>
            <p class="card-text">${data[i].blurb}</p>
            <a class="card-text mr-2" href="${data[i].articleURL}"> View Article</a>
            <a class="card-text ml-2" href="${data[i].image}"> View Photo</a>
            </div>
            </div>

            `)
        }
    }
});

function displayNoSavedArticlesCard(){
 $(".saved-body").prepend( `  
     <div class="container mt-5 mb-5 text-center">
    <div class="alert alert-warning p-3 noArticles" role="alert">
    Mmmm ... you don't have any saved articles yet! Click <a href="/" class="alert-link">here</a> to browse through articles
    </div>
    </div>
 `)
}






/////// SCRAPE BUTTON
$("#scrapeArticlesButton").on("click", function scrapeArticles(event) {
    event.preventDefault();
    
    window.location.href = "/scrape"
    
})

///// CLEAR ARTICLES
$("#clearArticlesButton").on("click", function clearArticles(event) {
    event.preventDefault();
    $(".index-body").empty();
    $.ajax({
        method: "DELETE",
        url: "/articles"
    }).then(
        window.location.reload()
    )
    
})