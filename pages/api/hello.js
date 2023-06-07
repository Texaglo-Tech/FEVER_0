import { dbConnect } from "../../src/util/index";

dbConnect();

export default function handler(req, res) {
    res.status(200).json({name: "Hi you have pinged our api please send a request"})
}