import React from 'react';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import moment from 'moment';
import './App.css';
import Dropdown from './Components/Dropdown'
const SHEET_ID = '1hYCZ4SXgisshcS5e-JU3NX4D9v4LOROUIb3PqUBwyiY';
const ACCESS_TOKEN = 'ya29.Il-7B7DC4QIYx0Rexh7sTk8CW9KdqH5FLanzbNZLbwN5Gorb1O71lmTEsLMqmqB2FsmzocyW-Xou1H6S8BB2vkaRnM9mtvZdoOVqaud-Jao71FVTmnOkhd0gSrnL0q7AmQ';

const format = 'h:mm a';

const now = moment()
  .hour(0)
  .minute(0);

function onChange(value) {
  console.log(value && value.format(format));
} 

class App extends React.Component {

  constructor(){
    super()
    this.state = {
      HouseId: [
        {
          id: 0,
          title: 'House 1',
          selected: false,
          key: 'HouseId'
        },
        {
          id: 1,
          title: 'House 2',
          selected: false,
          key: 'HouseId'
        },
        {
          id: 2,
          title: 'House 3',
          selected: false,
          key: 'HouseId'
        },
        {
          id: 3,
          title: 'House 4',
          selected: false,
          key: 'HouseId'
        },
        {
          id: 4,
          title: 'House 5',
          selected: false,
          key: 'HouseId'
        },
        {
          id: 5,
          title: 'House 6',
          selected: false,
          key: 'HouseId'
        },
        {
          id: 6,
          title: 'House 7',
          selected: false,
          key: 'HouseId'
        }
      ],
      Task: [
        {
          id: 0,
          title: 'Task 1',
          selected: false,
          key: 'Task'
        },
        {
          id: 1,
          title: 'Task 2',
          selected: false,
          key: 'Task'
        },
        {
          id: 2,
          title: 'Task 3',
          selected: false,
          key: 'Task'
        }
      ]
    }
  }

// Changes state of dropdown when user picks
  toggleSelected = (id, key) => {
    let temp = JSON.parse(JSON.stringify(this.state[key]))
    temp[id].selected = !temp[id].selected
    this.setState({
      [key]: temp
    })
  }
// Resets the state for Dropdown Menus
  resetThenSet = (id, key) => {
    let temp = JSON.parse(JSON.stringify(this.state[key]))
    temp.forEach(item => item.selected = false);
    temp[id].selected = true;
    this.setState({
      [key]: temp
    })
  }

// For timepicker initialization


  // For writing into Google Sheetsn
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

      <div className = "App">
        hello world 

      
        <button onClick={this.updateSheetValues}>Submit</button>

        <div className = "wrapper">
        <Dropdown
            title="Select HouseId"
            list={this.state.HouseId}
            resetThenSet={this.resetThenSet}
        />

        <Dropdown
            title="Select Task"
            list={this.state.Task}
            resetThenSet={this.resetThenSet}
        />

        <TimePicker
            showSecond={false}
            defaultValue={now}
            className="xxx"
            onChange={onChange}
            format={format}
            allowEmpty={false}
            use12Hours
            inputReadOnly
        />

        <TimePicker
            showSecond={false}
            defaultValue={now}
            className="xxx"
            onChange={onChange}
            format={format}
            allowEmpty={false}
            use12Hours
            inputReadOnly
        />
      </div>
      </div>
    );

  }
}

export default App;



