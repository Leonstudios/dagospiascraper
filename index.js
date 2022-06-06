const axios = require('axios');
const fs = require('fs');
const server = require('./server.js');
const cheerio = require('cheerio');
const url = "https://dagospia.com";
const app = server.app;

async function getNewestPosts() {
    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);
        const posts = [];
        $('article').each((i, el) => {
            const post = {
                title: $(el).find('h2').text(),
                link: $(el).find('a').attr('href'),
                date: $(el).find('time').attr('datetime'),
                image: $(el).find('img').attr('src'),
            };
            posts.push(post);
        });
        return posts;
    }
    catch (error) {
        console.log(error);
    }
}

getNewestPosts().then(posts => {
    console.log(posts);
});

async function getPost(link) {
    try {
        const response = await axios.get(link);
        const $ = cheerio.load(response.data);
        const post = {
            title: $('h1').text(),
            content: $('article').html(),
            date: $('time').attr('datetime'),
        };
        return post;
    }
    catch (error) {
        console.log(error);
    }
}
getPost(url).then(post => {
    console.log(post);
    fs.writeFile('data.txt', post.title + post.content + post.date, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });
});