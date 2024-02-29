const express = require("express")
const os = require("os")
const osu = require("node-os-utils")
require("dotenv").config()
var cpu = osu.cpu


const app = express()
const PORT = process.env.port || 7679

app.use(express.static("public"))

app.get("/systemInfo", async (req, res) => {
	const totalMemory = os.totalmem();
	const freeMemory = os.freemem();
	const usedMemory = totalMemory - freeMemory;
	const memoryUsagePercentage = ((usedMemory / totalMemory) * 100).toFixed(2);
	cpu.usage().then(cpuPercentage => {
		let cpuUsage = cpuPercentage
		res.json({ cpuUsage, memoryUsagePercentage, totalMemory });
	})
})

app.listen(PORT, () => {
	console.log(`Server on http://localhost:${PORT}\n\nProc PID: ${process.pid}`)
})
