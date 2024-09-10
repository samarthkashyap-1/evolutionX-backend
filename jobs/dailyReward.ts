import cron from 'node-cron';

import User from '../models/userModel';


// Function to cook a meal
const dailyReward = async (userId: string) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      return;
    }

    
      user.coins += 2;
      await user.save();
    
  } catch (error) {
    console.error(`Failed to Load daily reward for user ${userId}:`, error);
  }
};

// Schedule a cron job to run every 1 day
cron.schedule('0 0 * * *', async () => {
  try {
    console.log('Cron job for daily reward running...');
    const allUsers = await User.find({ });
    // console.log(allUsers);

    // Using for...of loop to handle async operations correctly
    for (const user of allUsers) {
      await dailyReward(user.id);
    }
  } catch (error) {
    console.error('Error running cron job:', error);
  }
});
