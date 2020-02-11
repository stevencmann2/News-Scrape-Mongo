$(document).ready(showSavedArticles());

function showSavedArticles(){
$.getJSON("/articles/saved", function (data) {
    $(".saved-body").empty();
    if (data.length == 0) {
        displayNoSavedArticlesCard();
    } else {
        
        for (i = 0; i < data.length; i++) {
            $(".saved-body").append(`
            <div class="card articleCard mt-4 mb-4" >
            <div class="card-header">
            <h5>
            <a class="text-wrap text-break" id="scrapedTitle">${data[i].title}</a>

        
            <button class="btn btn-danger float-right shadow-buttons ml-2" id="unsave" data-id="${data[i]._id}">Delete From Saved</button>
            <button class="btn btn-primary float-right shadow-buttons" id="articleButton" data-id="${data[i]._id}">Article Notes</button>

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
}

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
        showSavedArticles()
    )
    
})

$(".saved-body").on("click", "#unsave", function unsaveArticle(event) {
    
    event.preventDefault();
    let thisId = $(this).attr("data-id");
    

    $.ajax({
        method: "PUT",
        url: `/articles/unsave/${thisId}`
    }).then(
             showSavedArticles()
    )
})




$(".saved-body").on("click", "#articleButton", function NotesModal(){
    event.preventDefault();
    // $("#addNotesModal").modal('show')
    let thisId = $(this).attr("data-id");
    $("#addNotesModal").modal('show');
    $("#modalTitle").text(`${thisId}`)


console.log(thisId)
$.ajax({
    method: "GET",
    url: `/articles/${thisId}`,
  })
    // With that done
    .then(function(data) {
        console.log(data.note)
        $("#savedNotes").empty()
        if(data){
            console.log(data)
            $("#savedNotes").append(`
            <li class="text-center mr-5 mb-2">
            <h6>
            ${data.note.title}
            </h6>
            <p>
            ${data.note.body}
            </p>
            <button type="button" class="btn btn-danger deleteNote" data-id="${data.note._id}">
            Delete Note
            </button>
            </li>
            `)   
       
}
})
    
});

$("#noteToDb").on("click", function saveNotetoArticle(){
    let thisId = $("#modalTitle").text();

    const noteBox= $("#noteBox").val().trim();
    const noteTitle=$("#noteTitle").val().trim();



$.ajax({
    method: "POST",
    url: `/articles/${thisId}`,
    data: {
      title: noteTitle,
      body: noteBox,
    }
  })
    // With that done
    .then(function(data) {
      // Log the response
      window.location.href="/saved"
      
    });
console.log('addind data')
})

$(document).on("click", ".deleteNote", function eraseNote(){
    event.preventDefault();
    const buttonId = $(this).attr("data-id")
    console.log("delete button clicked")
    console.log(buttonId)
    $.ajax({
        method: "DELETE",
        url: `/note/${buttonId}`,
      }).then(
        window.location.href = "/saved"
      )

})












