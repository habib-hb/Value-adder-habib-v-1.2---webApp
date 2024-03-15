const searchInput = document.getElementById("search");
const searchBtn = document.getElementById("search-btn");

searchBtn.addEventListener("click" , ()=>{
    const searchValue = searchInput.value;
    console.log("search value : " , searchValue);
    
    switch (searchValue){
        case "about":
        case "About":
            window.location.hash = "about";
            break;

        case "services":
        case "Services":
        case "service":
        case "Service":
            window.location.hash = "services";
            break;

        case "contact":
        case "Contact":
            window.location.hash = "contact";
            break;

        default:
            alert("Search Value Not Found. Try- 'about', 'services', 'contact'");
            break;
    
        }
})