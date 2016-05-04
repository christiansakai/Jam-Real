////////
// This sample is published as part of the blog article at www.toptal.com/blog
// Visit www.toptal.com/blog and subscribe to our newsletter to read great posts
////////


const express = require('express');
const app = express();

app.use(express.static(__dirname + '/app'));
// app.use('/article', express.static(__dirname + '/article'));

app.use('/multi', (req, res, next) => {
	res.sendFile(__dirname + '/app/playwithfriend.html')
})

app.use('/solo',(req, res, next)=>{
	res.sendFile(__dirname + '/app/solo.html');
})

app.use('/room',(req, res, next)=>{
	res.sendFile(__dirname + '/app/room.html');
})

app.listen(process.env.PORT || 3000);
