import bcrypt from 'bcryptjs'
import User from '../models/User.js'
import Project from '../models/Project.js'
const userSeeds = [
  ['Sandeep','Kumar','Metta','Senior Product Manager','Engineering','sandeep@example.com'],
  ['Renil','','Komtila','Technical Lead','Platform','renil@example.com'],
  ['Ajay','Kumar','Kalicheti','Delivery Manager','Operations','ajay@example.com'],
  ['Lina','','Dsouza','Business Analyst','Strategy','lina@example.com'],
  ['Nisha','V','Iyer','UX Designer','Design','nisha@example.com'],
]
export default async function seedInitialData() {
  const passwordHash = await bcrypt.hash(process.env.SEED_PASSWORD || 'ajay@123', 10)
  const users = []
  for (const [firstName,middleName,lastName,role,branch,email] of userSeeds) {
    const user = await User.findOneAndUpdate({ email }, { $setOnInsert: { firstName,middleName,lastName,role,branch,email,passwordHash } }, { upsert: true, new: true, setDefaultsOnInsert: true })
    users.push(user)
  }
  if (await Project.countDocuments() === 0) {
    const rows = [
      ['GIIS Project','Singapore Government',0,'2022-01-01','2028-12-31',5000,'In Progress',120],
      ['BlazeUP Project','TerraLogic Software Solutions',1,'2024-02-15','2027-08-30',8000,'Completed',200],
      ['Lollipop Project','TerraLogic Software Solutions',2,'2023-04-01','2026-10-15',6200,'In Progress',140],
      ['Caramelo Project','TerraLogic Software Solutions',3,'2024-01-10','2027-06-20',7100,'Completed',180],
    ]
    await Project.insertMany(rows.map(([name,client,owner,startDate,endDate,estimatedCost,status,estimatedHours]) => ({ name,client,owner: users[owner]._id,startDate,endDate,estimatedCost,status,estimatedHours })))
  }
  console.log('Seed check complete; existing project data preserved')
}
