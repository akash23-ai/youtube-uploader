import express from "express"
import { handleRoute } from "../controller";

const router = express.Router();


router.route("/google").get(handleRoute)