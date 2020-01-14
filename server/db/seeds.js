use shares_portfolio;

db.dropDatabase()

db.shares.insertMany([
  {
  "ticker": "AAPL",
  "name": "Apple Inc.",
  "exchange": "NASDAQ",
  "quantity": 30
},
{
  "ticker": "GOOGL",
  "name": "Alphabet Inc.",
  "exchange": "NASDAQ",
  "quantity": 20
},
{
  "ticker": "ATVI",
  "name": "Activision Blizzard Inc.",
  "exchange": "NASDAQ",
  "quantity": 50
},
{
  "ticker": "AMZN",
  "name": "Amazon.com Inc.",
  "exchange": "NASDAQ",
  "quantity": 40
},
{
  "ticker": "NVDA",
  "name": "NVIDIA Corporation",
  "exchange": "NASDAQ",
  "quantity": 40
}
])
