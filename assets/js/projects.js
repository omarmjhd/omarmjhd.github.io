//To add projects to the auto scraper, add their repo names here
var repos = ['greater-than', 'codr', 'archer'];

function getRepoData(param) {
    for (var i = 0; i < param.length; i++) {
        var fileUri = generateFileURI(param[i]);

        $.ajax({
            dataType: "json",
            url: fileUri,
            success: function(data) {
                //console.log(data);

                createProjectDisplay(data);
            }
        })
    }
}

function createProjectDisplay(projectData) {

    var div = $('<div></div>', {'class': '4u 12u$(medium)'})
        .appendTo('#projects');

    div.append($('<span></span>', {'class': 'image fit'})
            .append($('<img />')
                .attr({
                    'src': projectData.image,
                    'alt': projectData.name +' image'
                })
            ))
        .append($('<h3></h3>', {text: projectData.name}))
        .append($('<p></p>', {text: projectData.info}))
        .append($('<ul></ul>', {'class': 'actions'})
            .append($('<li></li>')
                .append($('<a></a>', {text: 'more'})
                    .attr({
                        'class': 'button',
                        'href': projectData.repo
                    })
                )
            )
        );
}

function generateFileURI(repoName) {
    var uri = "https://raw.githubusercontent.com/omarmjhd/" + repoName + "/master/website-display/info.json";
    uri = addAccessToken(uri);
    return uri;
}

function addAccessToken(uri) {
    return uri + "?access_token=873f6b3a59819392ef69d22412f749d0cace5982";
}

getRepoData(repos);