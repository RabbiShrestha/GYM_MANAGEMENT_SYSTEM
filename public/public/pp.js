document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.querySelector('.sidebar');
    const toggleButton = document.getElementById('toggleSidebar');
  
    toggleButton.addEventListener('click', function() {
      sidebar.classList.toggle('active');
    });
  });