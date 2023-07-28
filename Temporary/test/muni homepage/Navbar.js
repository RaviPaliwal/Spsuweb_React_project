      const searchBox = document.querySelector(".search-box");
      const searchBtn = document.querySelector(".search-icon");
      const cancelBtn = document.querySelector(".cancel-icon");
      const searchInput = document.querySelector("input");
      const searchData = document.querySelector(".search-data");
      searchBtn.onclick =()=>{
        searchBox.classList.add("active");
        searchBtn.classList.add("active");
        searchInput.classList.add("active");
        cancelBtn.classList.add("active");
        searchInput.focus();
        if(searchInput.value != ""){
          var values = searchInput.value;
          searchData.classList.remove("active");
          // searchData.innerHTML = "You just typed " + "<span style='font-weight: 500;'>" + values + "</span>";
        }else{
          searchData.textContent = "";
        }
      }
      cancelBtn.onclick =()=>{
        searchBox.classList.remove("active");
        searchBtn.classList.remove("active");
        searchInput.classList.remove("active");
        cancelBtn.classList.remove("active");
        searchData.classList.toggle("active");
        searchInput.value = "";
      }  



      // pop recent annoucement


  var popup_login = document.getElementById('popup_form');
	var close = document.getElementById('close_btn');

	window.addEventListener("load", function(){

		setTimeout(function(){

			popup_login.classList.add('anyname');

		 },4000) // 1 secon is 1000ms so 5 second is = to 5000ms.


	}) // 5 second popup are working count our time and check it now 
	// create close btn event
  close.addEventListener("click", function(){
			popup_login.classList.remove('anyname');
		 }) //friends create 5 second popup form you are check for pouse video check the and after i am close btn is work properly 
	// now add transition 




  // reloader
const preloaderWrapper = document.querySelector('.preloader-wrapper');
let reload_hide=document.getElementById("reload_hide"); 
let MHome=document.getElementById("Home");
window.addEventListener('load', function() {
    preloaderWrapper.classList.add('fade-out-animation');   
    MHome.classList.add("d-none");

    
});
   
