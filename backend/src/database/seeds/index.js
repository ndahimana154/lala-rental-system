import { connectDB } from '../config/db.js';
import seedUsers from './users.seeds.js';

connectDB().then(async () => {
    await seedUsers();
    process.exit()
})
