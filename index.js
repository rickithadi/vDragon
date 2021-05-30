import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import ObjectSchema from "./model.js";
import parseErrors from "./parseError.js";
const isDev = process.env.NODE_ENV !== "production";
const PORT = process.env.PORT || 5000;

// should probably use env variable for this
const dbUrl =
    "mongodb+srv://admin:123@cluster0.amcwc.mongodb.net/keyValue?retryWrites=true&w=majority";
mongoose.set("useFindAndModify", false);
mongoose.set("useNewUrlParser", true);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);
mongoose.connect(dbUrl);

const app = express();
app.use(cors());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.get("/object/:key/:timestamp?", (req, res) => {
    //check timestamp is provided and valid
    if (req.query.timestamp) {

        const date = Date(req.query.timestamp)
        ObjectSchema.find({
                timestamp: {
                    $lte: date
                }
            })
            .sort({
                '_id': -1
            }).limit(1).then(data => res.json({
                data
            }))
            .catch(err => res.status(400).json({
                errors: parseErrors(err.errors)
            }));

    } else {
        //look for object with corresponding key and return latest
        ObjectSchema.find({
                key: req.params.key
            }).sort({
                '_id': -1
            }).limit(1).then(data => res.json({
                data
            }))
            .catch(err => res.status(400).json({
                errors: parseErrors(err.errors)
            }));
    }
});

app.post("/object", (req, res) => {
    //create object from schema and insert into db
    //return said object
    const key = Object.keys(req.body)[0];
    ObjectSchema.create({
            value: req.body[key],
            key
        })
        .then((object) => res.json({
            object
        }))
        .catch((err) =>
            res
            .status(400)
            .json({
                errors: parseErrors(err.errors)
            })
        );
});

app.listen(PORT, () =>
    console.log(`listening on port ${PORT}`)
);