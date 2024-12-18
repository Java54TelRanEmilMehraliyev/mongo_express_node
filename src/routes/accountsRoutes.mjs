import express from 'express';

import AccountsService from '../service/accountsService.mjs';

const router = express.Router();

router.put("/:accountId/password", async (req, res) => {
    const { accountId } = req.params;
    const { oldPassword, newPassword } = req.body;
  
    if (!oldPassword || !newPassword) {
      return res.status(400).json({ error: "Old and new passwords are required." });
    }
  
    try {
      await AccountsService.updatePassword(accountId, oldPassword, newPassword);
      res.status(200).json({ message: "Password updated successfully." });
    } catch (error) {
      res.status(error.status || 500).json({ error: error.message });
    }
  });
  router.get("/:accountId", async (req, res) => {
    const {accountId} = req.params;

    try{
        const account = await AccountsService.getAccount(accountId);
        if(!account){
            return res.status(404).json({ error: "Account not found."});
        }
        res.status(200).json(account);
    } catch (error) {
        res.status(error.status || 500).json({error: error.message});
    }
  })

  router.delete("/:accountId", async (req,res) => {
    const { accountId } = req.params;

    try {
        await AccountsService.deleteAccount(accountId);
        res.status(200).json({ message: "Account deleted successfully."});
    } catch (error) {
        res.status(error.status || 500).json({error: error.message});
    }
  });

  
   
export default router;