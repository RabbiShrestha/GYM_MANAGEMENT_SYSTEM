document.addEventListener("DOMContentLoaded", function () {
    const sidebarLinks = document.querySelectorAll(".sidebar a");
    const dynamicContent = document.getElementById("dynamic-content");
  
    // Function to handle click on sidebar links
    function handleSidebarLinkClick(event) {
      event.preventDefault();
      const sectionId = event.target.getAttribute("data-section");
      loadSectionContent(sectionId);
    }
  
    // Function to load section content
    function loadSectionContent(sectionId) {
      // Replace the following lines with your own logic to load dynamic content
      let content = "";
      switch (sectionId) {
        case "trainers":
          // No need to add any specific content here. The HTML for the Trainers panel will be added in the HTML file.
          break;
        case "members":
          content = "<h2>Members Panel</h2><p>Content for members panel goes here.</p>";
          break;
        case "payments":
          content = "<h2>Payments Panel</h2><p>Content for payments panel goes here.</p>";
          break;
        default:
          content = "<h2>Default Panel</h2><p>This is the default panel content.</p>";
          break;
      }
      dynamicContent.innerHTML = content;
    }
  
    // Add click event listener to each sidebar link
    sidebarLinks.forEach(link => {
      link.addEventListener("click", handleSidebarLinkClick);
    });
  
    // Initially load the Trainer panel content
    loadSectionContent("trainers");
  });