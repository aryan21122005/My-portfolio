const express=require("express");
const app=express();

let port=8080;


app.listen(port,()=>{
    console.log(`app listening to port: ${port}`);
});

app.set("view engine", "ejs");

app.use(express.static('public'));

app.get("/",(req,res)=>{
    console.log("request recieved");
});

app.get("/search",(req,res)=>{
    let {search}=req.query;
    if (!search) {
        return res.status(400).send("Please provide a search query (e.g., /search?search=flipkart).");
    }

    // Attempt to render the EJS file
    res.render(search, (err,html) => {
        if (err) {
            console.error(err.message);
            // If the EJS file doesn't exist, send a custom 404 error page
            return res.status(404).render("404", { error: err.message });
        }
        res.send(html);
    });
});