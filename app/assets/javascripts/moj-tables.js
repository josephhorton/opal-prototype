document.addEventListener('DOMContentLoaded', function () {
  const table = document.getElementById('multiSortableTable');
  if (table && window.MOJFrontend) {
    new MOJFrontend.SortableTable({ table });
    new MOJFrontend.MultiSelect({ table });
  }
});
