   export default class AccountsService {
  #database;
  constructor(mongoConnection){
    this.#database = mongoConnection;
  }
    async updatePassword(accountId,oldPassword,newPassword){
        const account = await database.findAccountById(accountId);
        if(!account){
            throw { status: 404, message: "Account not found"};
        }
        if(account.password !== oldPassword) {
            throw { status : 400, message:"Old password is incorrect"};
        }
        if( newPassword.length < 6) {
            throw { status: 400, message : "New password must be at least 6 characters long."}
        }
        account.password = newPassword;
        await database.updatePassword(account);
    }
    async getAccount(accountId){
        return await database.findAccountById(accountId);
    }

    async deleteAccount(accountId){
        const account = await database.findAccountById(accountId);
        if(!account) {
            throw { status: 404, message: "Account not found"};
        }
        await database.deleteAccount(accountId);
    }
  }
  