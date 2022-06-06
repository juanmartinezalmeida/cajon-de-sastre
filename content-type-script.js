// Return the first few bytes of the file as a hex string
function getBLOBFileHeader(url, blob, callback) {
  var fileReader = new FileReader();
  fileReader.onloadend = function(e) {
    var arr = (new Uint8Array(e.target.result)).subarray(0, 4);
    var header = "";
    for (var i = 0; i < arr.length; i++) {
      header += arr[i].toString(16);
    }
    callback(url, header);
  };
  fileReader.readAsArrayBuffer(blob);
}

function getRemoteFileHeader(url, callback) {
  var xhr = new XMLHttpRequest();
  // Bypass CORS for this demo
 // xhr.open('GET', '//cors-anywhere.herokuapp.com/' + url);
  xhr.responseType = "blob";
  xhr.onload = function() {
    callback(url, xhr.response);
  };
  xhr.onerror = function() {
    alert('A network error occurred!');
  };
  xhr.send();
}

function headerCallback(url, headerString) {
  printHeaderInfo(url, headerString);
}

function remoteCallback(url, blob) {
  printImage(blob);
  getBLOBFileHeader(url, blob, headerCallback);
}

function printImage(blob) {
  // Add this image to the document body for proof of GET success
  var fr = new FileReader();
  fr.onloadend = function() {
    $("hr").after($("<img>").attr("src", fr.result))
      .after($("<div>").text("Blob MIME type: " + blob.type));
  };
  fr.readAsDataURL(blob);
}

// Add more from http://en.wikipedia.org/wiki/List_of_file_signatures
function mimeType(headerString) {
  switch (headerString) {
    case "89504e47":
      type = "image/png";
      break;
    case "47494638":
      type = "image/gif";
      break;
    case "ffd8ffe0":
    case "ffd8ffe1":
    case "ffd8ffe2":
      type = "image/jpeg";
      break;
    default:
      type = "unknown";
      break;
  }

  //if type in list, send file to javascriptToBubble
  if ( headerString.type != "unknown") {
      //do something
  }
    
  return type;
}

function printHeaderInfo(url, headerString) {
  $("hr").after($("<div>").text("Real MIME type: " + mimeType(headerString)))
    .after($("<div>").text("File header: 0x" + headerString))
    .after($("<div>").text(url));
}

// Check for FileReader support
if (window.FileReader && window.Blob) {

  /* Handle local files */
  $("input").on('change', function(event) {
    var file = event.target.files[0];
    if (file.size >= 20 * 1024 * 1024) {
      alert("File size must be at most 20MB");
      return;
    }
    remoteCallback(escape(file.name), file);
  });

} else {
  // File and Blob are not supported
  $("hr").after( $("<div>").text("It seems your browser doesn't support FileReader") );
}