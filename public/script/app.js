// Wait until the page (DOM) is fully loaded
document.addEventListener('DOMContentLoaded', () => {

    // Find all status dropdowns for assignments/tasks
    const assignmentSelects = document.querySelectorAll('.status-select');

    assignmentSelects.forEach(assignmentSelect => {

        // Function to update the color of the dropdown based on the task status
        function updateStatusColor() {
            const status = assignmentSelect.value;

            // Remove any previous color classes
            assignmentSelect.classList.remove('bg-danger', 'bg-warning', 'bg-success', 'text-white', 'text-dark');

            // Add color class based on current status
            if (status === 'Not Started') {
                assignmentSelect.classList.add('bg-danger', 'text-white');
            } else if (status === 'In Progress') {
                assignmentSelect.classList.add('bg-warning', 'text-dark');
            } else if (status === 'Completed') {
                assignmentSelect.classList.add('bg-success', 'text-white');
            }
        }

        // Update color when the dropdown value changes
        assignmentSelect.addEventListener('change', updateStatusColor);

        // Set initial color on page load
        updateStatusColor();
    });
});