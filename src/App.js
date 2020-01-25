import React from 'react';
import logo from './logo.svg';
import './App.css';

const SHEET_ID = '1hYCZ4SXgisshcS5e-JU3NX4D9v4LOROUIb3PqUBwyiY';
const ACCESS_TOKEN = 'ya29.Il-7B7DC4QIYx0Rexh7sTk8CW9KdqH5FLanzbNZLbwN5Gorb1O71lmTEsLMqmqB2FsmzocyW-Xou1H6S8BB2vkaRnM9mtvZdoOVqaud-Jao71FVTmnOkhd0gSrnL0q7AmQ';

class App extends React.Component {
  updateSheetValues = () => {
    fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}:batchUpdate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //update this token with yours. 
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
      body: JSON.stringify({

        requests: [{
          repeatCell: {
            range: {
              startColumnIndex: 0,
              endColumnIndex: 1,
              startRowIndex: 0,
              endRowIndex: 1,
              sheetId: 0
            },
            cell: {
              userEnteredValue: {
                 "stringValue":'hello world'
              },
            },
            fields: "*"
          }
        }]

      })
    })
  }
  render() {
    return ( 
      <div className = "App" >
        hello world 
        <button onClick={this.updateSheetValues}>Submit</button>
      </div>
    );

  }
}

export default App;
