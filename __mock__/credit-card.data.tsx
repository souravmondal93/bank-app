export const MOCK_CREDIT_CARD_DATA = {
  "data": {
    "CreditCarTransactionsByCurrentUser": [
      {
        "_id": "63f96600525b1fda1a08ebb1",
        "type": "NORMAL",
        "payeeName": "Payment Insurance",
        "date": 1678416352354,
        "amount": 20.22,
        "status": "SCHEDULED",
        "reference": "PYMNT-INSRN/2424",
        "sourceAccountId": "63f95dc39f712e123d2cd770",
        "senderId": "63ee919e986c94bbbf9da9bf",
        "recipientId": "63e6c36c7da9cb2c5d50c8e2"
      },
      {
        "_id": "63f96600525b1fda1a08ebb6",
        "type": "NORMAL",
        "payeeName": "Amazon",
        "date": 1675997152354,
        "amount": 150.87,
        "status": "DONE",
        "reference": "AMZN/PAYMNT/2424",
        "sourceAccountId": "63f95dc39f712e123d2cd770",
        "senderId": "63ee919e986c94bbbf9da9bf",
        "recipientId": "63e6c36c7da9cb2c5d50c8e2"
      },
      {
        "_id": "63f96600525b1fda1a08ebb4",
        "type": "NORMAL",
        "payeeName": "Payment Feb",
        "date": 1675889092354,
        "amount": 535.65,
        "status": "DONE",
        "reference": "Payment Feb",
        "sourceAccountId": "63ee919e986c94bbbf9da9c1",
        "senderId": "63ee919e986c94bbbf9da9bf",
        "recipientId": "63ee919e986c94bbbf9da9bf"
      },
    ],
    "getMyCreditCardAccount": {
      "_id": "63f95dc39f712e123d2cd770",
      "type": "CREDIT_CARD_ACCOUNT",
      "isActive": true,
      "owner": "63ee919e986c94bbbf9da9bf",
      "sortCode": 223344,
      "accountNumber": 585541728,
      "currency": "GBP",
      "balance": 42845.98
    }
  }
}