# Roadmap
A lightweight jQuery plugin to create a visual roadmap of events. 

### What you need 
* jQuery 1.5.1 or above
* A formatted JSON file with the events

### How to use
Roadmap is very straight forward to use. Simply provide a selector, which will be the outer-wrap for the roadmap, provide a JSON dataset and some optional option parameters. Like so:

```javascript
$('#selector').roadmap(json);
$('#selector').roadmap(json, {sGroupBy: "m"});

//Using with getJSON()
var json;
$.getJSON("path/to/json.json", function(d){
  json = d;
}).done(function(){
  $('#selector').roadmap(json, {});
});
```

### Example JSON data

```json
{
  "events":[
    {
      "datetime": "2016-09-22 16:32:51",
      "title": "Roadmap joins GitHub",
      "content": "Roadmap has just been put up on GitHub. Check it out at this link: https://github.com/ImClarky/Roadmap"
    },
    {
      "More Events..."
    }
  ]
}
```
