/*!
 * node-feedparser
 * Copyright(c) 2013 Dan MacTough <danmactough@gmail.com>
 * MIT Licensed
 */

var FeedParser = require('/usr/local/lib/node_modules/feedparser')
    , request = require('/usr/local/lib/node_modules/request')
     , feed = 'http://rutor.org/rss.php?full=1';

     var req = request(feed)
       , feedparser = new FeedParser(); //[options]);


       req.on('error', function (error) {
         // handle any request errors
         console.error(error);
       });
       req.on('response', function (res) {
         var stream = this;

         if (res.statusCode != 200) return this.emit('error', new Error('Bad status code'));

         stream.pipe(feedparser);
       });

       feedparser.on('error', function(error) {
         // always handle errors
         console.error(error);
       });
       feedparser.on('readable', function() {
         // This is where the action is!
         var stream = this
//           , meta = this.meta // **NOTE** the "meta" is always available in the context of the feedparser instance
           , item;
           var reg = /.+\/.+\(\d\d\d\d\)/g;

         while (item = stream.read()) {
           // console.log(item);
           console.log('%s', item.title.match(reg));// || item.description);

         }
       });