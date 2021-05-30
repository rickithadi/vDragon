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
        //https://www.delftstack.com/howto/javascript/javascript-convert-timestamp-to-date/
        const parseDate = new Date(req.query.timestamp * 1000)
        console.log('before', parseDate)
        ObjectSchema.find({
                timestamp: {
                    $lte: parseDate
                },
                key: req.params.key,
            }, {
                _id: 0
            })
            .sort({
                "timestamp": -1
            })
            .then(data => res.send({
                [data[0].key]: data[0].value
            }))
            .catch(err => res.status(400).json({
                err
            }));

    } else {
        //look for object with corresponding key and return latest
        ObjectSchema.findOne({
                key: req.params.key
            }, {
                _id: 0
            }).sort({
                '_id': -1
            }).then(data =>
                res.send({
                    [data.key]: data.value
                })
            )
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
        .then((object) => res.json(
            object
        ))
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