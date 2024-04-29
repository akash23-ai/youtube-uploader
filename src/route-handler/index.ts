import express from "express"
import { firstRoute, handleRoute } from "../controller";

const router = express.Router();

router.route("/").get(firstRoute);



router.route("/google").get(handleRoute)