var busboy = require('connect-busboy');
module.exports = function(app){

    app.use(busboy());
    // ...
    app.use(function(req, res,next) {
      if (req.busboy) {
        req.files=[]
        req.busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
          file.on('data', function(data) {
            req.files.push({filename,file:data,encoding,mimetype})
          });
    
        });
        req.busboy.on('finish', function() {
          next()
        });
        req.pipe(req.busboy);
      }
    });
}