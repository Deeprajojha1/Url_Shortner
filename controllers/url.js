import { Url } from '../models/URl.js';
import shortid from 'shortid';
export const shortUrl = async (req, res) => {
    const longUrl = req.body.longUrl;
    const shortCode = shortid.generate();
   
    const shortUrl="http://localhost:1000/" + shortCode;
    //  Save to database
    const url = new Url({
        shortCode: shortCode,
        longUrl: longUrl
    });
    await url.save();
    console.log('URL saved:', url);

    // Render the response
    res.render('index.ejs', { shortenedUrl: shortUrl });
};

export const redirectUrl = async (req, res) => {
    const shortCode = req.params.shortCode;
    // Find the URL in the database
    const longUrl = await Url.findOne({ shortCode: shortCode });
    if (longUrl) {
        res.redirect(longUrl.longUrl);
    } else {
        res.status(404).send('URL not found');
    }
    // res.json({ longurl: longUrl });
};

// in our terminal install npm i shortid 