/* ------------ Loader --------------*/
window.addEventListener("load", () => {
  document.querySelector(".main").classList.remove("hidden");
  document.querySelector(".home-section").classList.add("active");
  /* ------------ Page Loader --------------*/
  document.querySelector(".page-loader").classList.add("fade-out");
  setTimeout(() => {
    document.querySelector(".page-loader").style.display = "none";
  }, 600);
});

/* ------------ Toggler Navbar --------------*/
const navToggler = document.querySelector(".nav-toggler");
navToggler.addEventListener("click", () => {
  hideSection();
  toggleNavbar();
  document.body.classList.toggle("hide-scrolling");
});
function hideSection() {
  document.querySelector("section.active").classList.toggle("fade-out");
}
function toggleNavbar() {
  document.querySelector(".header").classList.toggle("active");
}

/* ------------ Active Section --------------*/
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("link-item") && e.target.hash != "") {
    // activate the overlay to prevent multiple clicks
    document.querySelector(".overlay").classList.add("active");
    navToggler.classList.add("hide");
    if (e.target.classList.contains("nav-item")) {
      toggleNavbar();
    } else {
      hideSection();
      document.body.classList.add("hide-scrolling");
    }
    setTimeout(() => {
      document.querySelector("section.active").classList.remove("active", "fade-out");
      document.querySelector(e.target.hash).classList.add("active");
      window.scrollTo(0, 0);
      document.body.classList.remove("hide-scrolling");
      navToggler.classList.remove("hide");
      document.querySelector(".overlay").classList.remove("active");
    }, 500);
  }
});

/* ------------ About Tabs --------------*/
const tabsContainer = document.querySelector(".about-tabs"),
  aboutSection = document.querySelector(".about-section");

tabsContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("tab-item") && !e.target.classList.contains("active")) {
    tabsContainer.querySelector(".active").classList.remove("active");
    e.target.classList.add("active");
    const target = e.target.getAttribute("data-target");
    aboutSection.querySelector(".tab-content.active").classList.remove("active");
    aboutSection.querySelector(target).classList.add("active");
  }
});

/* ------------ Portofolio Item Details PopUp --------------*/
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("view-project-btn")) {
    togglePortofolioPopup();
    document.querySelector(".portofolio-popup").scrollTo(0, 0);
    portofolioItemDetails(e.target.parentElement);
  }
});
function togglePortofolioPopup() {
  document.querySelector(".portofolio-popup").classList.toggle("open");
  document.body.classList.toggle("hide-scrolling");
  document.querySelector(".main").classList.toggle("fade-out");
}
document.querySelector(".pp-close").addEventListener("click", togglePortofolioPopup);

// hide popup when clicking  outside of it
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("pp-inner")) {
    togglePortofolioPopup();
  }
  // console.log(e.target);
});

function portofolioItemDetails(portofolioItem) {
  document.querySelector(".pp-thumbnail img").src = portofolioItem.querySelector(".portofolio-item-thumbnail img").src;
  document.querySelector(".pp-header h3").innerHTML = portofolioItem.querySelector(".portofolio-item-title").innerHTML;
  document.querySelector(".pp-body").innerHTML = portofolioItem.querySelector(".portofolio-item-details").innerHTML;
}

/* ------------ Submit Form to Google Sheet --------------*/
const scriptURL = "https://script.google.com/macros/s/AKfycbyQTW_t5qzLihLOD7SUHlapM3aqtCfq3fanK_GblyUC1yL5HtF_t4PnZ4n00X6NIjdi/exec";
const form = document.forms["my-portofolio-contact-form"];
// make popUp  (variable)
const btnKirim = document.querySelector(".btn-send");
const btnLoading = document.querySelector(".btn-loading");
const myAlert = document.querySelector(".my-alert");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  // (action use Toggle) if submit button have click, do loading, and remove submit button
  btnLoading.classList.toggle("d-none");
  btnKirim.classList.toggle("d-none");
  fetch(scriptURL, { method: "POST", body: new FormData(form) })
    .then((response) => {
      // (action use Toggle) tampilkan submit button, remove loading button
      btnLoading.classList.toggle("d-none");
      btnKirim.classList.toggle("d-none");
      // (action use Toggle) tampilkan alert
      myAlert.classList.toggle("d-none");
      // reset form
      form.reset();
      console.log("Success!", response);
    })
    .catch((error) => console.error("Error!", error.message));
});
