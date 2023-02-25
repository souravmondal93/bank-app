export const MOCK_SAVINGS_ACCOUNT_DATA = {
  "data": {
    "transactionsByCurrentUser": [
      {
        "_id": "63f96600525b1fda1a08ebb2",
        "type": "NORMAL",
        "payeeName": "Disney Hotstar",
        "date": 1677992452354,
        "amount": 25.12,
        "status": "SCHEDULED",
        "reference": "DSNY-HTSTR/MNTHLY/4512",
        "sourceAccountId": "63f95dc39f712e123d2cd770",
        "senderId": "63ee919e986c94bbbf9da9bf",
        "recipientId": "63e6c36c7da9cb2c5d50c8e2"
      },
      {
        "_id": "63f935bb525b1fda1a08eba7",
        "type": "NORMAL",
        "payeeName": "House Rent",
        "date": 1677974400354,
        "amount": 1200,
        "status": "SCHEDULED",
        "reference": "Rent Monthly",
        "sourceAccountId": "63ee919e986c94bbbf9da9c1",
        "senderId": "63ee919e986c94bbbf9da9bf",
        "recipientId": "63e6c36c7da9cb2c5d50c8e2"
      },
      {
        "_id": "63f935bb525b1fda1a08eb9c",
        "type": "NORMAL",
        "payeeName": "Wise Transfer",
        "date": 1675288800354,
        "amount": 1000,
        "status": "DONE",
        "reference": "WISE/TRNSFR/4312",
        "sourceAccountId": "63ee919e986c94bbbf9da9c1",
        "senderId": "63ee919e986c94bbbf9da9bf",
        "recipientId": "63e6c36c7da9cb2c5d50c8e2"
      },
      {
        "_id": "63f95739525b1fda1a08ebac",
        "type": "NORMAL",
        "payeeName": "Salary",
        "date": 1675227652354,
        "amount": 7820.56,
        "status": "DONE",
        "reference": "SLRY/FEB/4334",
        "sourceAccountId": "63f3d7758d7b60591a81db7e",
        "senderId": "63e6c36c7da9cb2c5d50c8e2",
        "recipientId": "63ee919e986c94bbbf9da9bf"
      }
    ],
    "getMyAccount": {
      "_id": "63ee919e986c94bbbf9da9c1",
      "type": "SAVINGS_ACCOUNT",
      "isActive": true,
      "owner": "63ee919e986c94bbbf9da9bf",
      "sortCode": 223344,
      "accountNumber": 621029083,
      "currency": "GBP",
      "balance": 34523.86
    }
  }
}