import cron from 'node-cron';
import User from '../models/userModel';

// Function to cook a meal
const cookMeal = async (userId: string) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      return;
    }

    if (user.meals < 5) {
      user.meals += 1;
      console.log("Cooked a meal for", user.name);
      await user.save();
    }
  } catch (error) {
    console.error(`Failed to cook meal for user ${userId}:`, error);
  }
};

// Schedule a cron job to run every 10 min
cron.schedule('*/10 * * * *', async () => {
  try {
    console.log('Cron job for cooking meals running...');
    const allUsers = await User.find({ meals: { $lt: 5 } });

    for (const user of allUsers) {
      await cookMeal(user.id);
    }
  } catch (error) {
    console.error('Error running cron job:', error);
  }
});
