////// INDEX JS JAVASCRIPT FOR HOMEPAGE
 
$.getJSON("/articles", function (data) {
    if (data.length == 0) {
        displayNoDataCard()
        return;
    } else {
        $(".index-body").append(`<div class="mt-5 mb-5 Lobster text-center">
    <h1 style="font-size: 4em">Top Stories</h1>
    <div>`)
        for (i = 0; i < data.length; i++) {
            $('.index-body').append(`
        

        <div class="card articleCard mt-4 mb-4" >
<div class="card-header">
<h5>
<a class="text-wrap text-break" id="scrapedTitle">${data[i].title}</a>

<a class="btn btn-success float-right shadow-buttons saveArticle" data-id="${data[i]._id}">Save Article</a>

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


    console.log('hello')
    //// GRABS ID FROM DATA
    let thisId = $(this).attr("data-id");


   

    function displayNoDataCard() {
        $(".index-body").prepend(`
    <div class="container mt-5 mb-5 text-center">
    <div class="alert alert-warning p-3 noArticles" role="alert">
  You don't appear to have any scraped articles yet! Click <a href="/scrape" class="alert-link">here</a> to add articles
  or click <a href="/saved" class="alert-link">here</a> to visit your saved articles
</div></div> `)
    }

    $("#scrapeArticlesButton").on("click", function scrapeArticles(event) {
        event.preventDefault();
        window.location.href = "/scrape"
    })

    $(".saveArticle").on("click", function saveOneArticle(event) {
        console.log('clicked the button')
        event.preventDefault();
        let thisId = $(this).attr("data-id");
        console.log(thisId)
    })















