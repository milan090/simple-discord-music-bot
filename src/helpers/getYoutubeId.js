module.exports.getYoutubeId = function (link) {
  var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = link.match(regExp);
  if (match && match[2].length == 11) {
    return match[2];
  } else {
    return false;
  }
};
