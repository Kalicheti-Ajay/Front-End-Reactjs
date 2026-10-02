import 'dotenv/config'
import connectDatabase from '../config/db.js'
import seedInitialData from './seedData.js'
try { await connectDatabase(); await seedInitialData(); process.exit(0) } catch (error) { console.error(error); process.exit(1) }
