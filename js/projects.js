$(function () {
  const projectList = $("#project-list");

  // AJAX: request project information from the JSON file asynchronously.
  $.ajax({
    url: "data/projects.json",
    method: "GET",
    dataType: "json",
    success: function (projects) {
      projectList.empty();

      if (!Array.isArray(projects) || projects.length === 0) {
        projectList.html('<div class="panel empty-state">No project records found in the JSON file.</div>');
        return;
      }

      projects.forEach(function (project) {
        const card = $("<article>").addClass("panel project-card");
        card.append($("<span>").addClass("project-category").text(project.category));
        card.append($("<h3>").text(project.title));
        card.append($("<p>").text(project.description));

        const tagList = $("<div>").addClass("tag-list");
        (project.technologies || []).forEach(function (technology) {
          tagList.append($("<span>").text(technology));
        });
        card.append(tagList);

        if (project.link) {
          card.append($("<a>").addClass("text-link")
            .attr({ href: project.link, target: "_blank", rel: "noopener" })
            .text("View project ↗"));
        }
        projectList.append(card);
      });
    },
    error: function () {
      projectList.html('<div class="panel empty-state">Project data could not be loaded. Run the site with VS Code Live Server and confirm that data/projects.json exists.</div>');
    }
  });
});
