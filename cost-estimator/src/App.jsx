import React, { Component } from 'react';
class App extends Component {
  constructor() {
    super();
    this.state = {
      data: 
        [
          {
            "name": "GIIS Project",
            "client": "Singpoore Government",
            "statusBadge": "In Progress",
            "owner": "Sandeep Metta",
            "dateRange": "2022-01-01 to 2028-12-31",
            "hours": 120,
            "cost": 5000
          },
          {
            "name": "BlazeUP Project",
            "client": "TerraLogic Software Solutions",
            "statusBadge": "Completed",
            "owner": "Renil Komitla",
            "dateRange": "2024-02-15 to 2027-08-30",
            "hours": 200,
            "cost": 8000
          },
          {
            "name": "Lollipop Project",
            "client": "TerraLogic Software Solutions",
            "statusBadge": "In Progress",
            "owner": "Ajay Kumar",
            "dateRange": "2023-05-10 to 2026-11-20",
            "hours": 150,
            "cost": 6000
          },
          {
            "name": "Caramelo Project",
            "client": "TerraLogic Software Solutions",
            "statusBadge": "Completed",
            "owner": "Sandeep Metta",
            "dateRange": "2022-09-01 to 2025-03-15",
            "hours": 180,
            "cost": 7000
          }
        ]
      // [
      //   {
      //     "name": "John Doe",
      //   },
      //   {
      //     "name": "Jane Danial"
      //   },
      //   {
      //     "name": "John Smith"
      //   }
      // ]
    }
  }
  render() {
    return (
      <div>

        <ProjectSDetailsPage />
        {this.state.data.map((item) => <Project data = {item} />)}
        {/* <StudentName/>
        <ul>
          {this.state.data.map((item) => <List data = {item} />)}
        </ul> */}
      </div>
    );
  }
}

class StudentName extends React.Component {
  render() {
    return (
      <div>
        <h1>Student Name Detail</h1>
      </div>
    );
  }
}

class List extends React.Component {
  render() {
    return (
      <ul>
        <li>{this.props.data.name}</li>
      </ul>
    );
  }
}

class ProjectSDetailsPage extends React.Component {
  render() {
    return (
      <div>
        <h1 style={{ margin: 100 }}>Project Details Page</h1>
        {/* <Project data = {this.props.data} /> */}
      </div>
    );
  }
}


class Project extends React.Component {
  render() {
    return (
      <div style={{ margin: 100, border: '1px solid gray', padding: 20 }}>
        <h2>Project Name: {this.props.data.name}</h2>
        <h3>Client: {this.props.data.client}</h3>
        <h3>Status Badge: {this.props.data.statusBadge}</h3>
        <h3>Owner: {this.props.data.owner}</h3>
        <h3>Date Range: {this.props.data.dateRange}</h3>
        <h3>Hours: {calculateTotalHours(calculateNoOfWorkingDays(this.props.data.dateRange))}</h3>
        <h3>Cost: {calculateTotalCost(this.props.data.dateRange)}</h3>
      </div>
    );
  }
}


function calculateNoOfWorkingDays(dateRange) {



const [startDate, endDate] = dateRange.split(' to ').map(date => new Date(date));

const totalWeeks = Math.floor((endDate - startDate) / (7 * 24 * 60 * 60 * 1000));
const totalDays = totalWeeks * 5; // 5 working days in a week

//this function returns number of working days
return totalDays;
}

function calculateTotalHours(days) {

  const totalHours = days * 8; // Assuming 8 working hours in a day
  // this calls the calculateNoOfWorkingDays function
  return totalHours;
}

function calculateTotalCost(dateRange) {

  const hourlyPay = 40;

  const totalHours = calculateTotalHours(calculateNoOfWorkingDays(dateRange));
  const cost = totalHours * hourlyPay; // Assuming $40 per hour

  // this calls the calculateTotalHours function
  return cost;
}


export default App;






// import { useState } from 'react'
// import heroImg from './assets/hero.png'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <section id="center">
//         <div className="hero">
//           <img src={heroImg} className="base" width="170" height="179" alt="" />
//           <img src={reactLogo} className="framework" alt="React logo" />
//           <img src={viteLogo} className="vite" alt="Vite logo" />
//         </div>
//         <div>
//           <h1>Get started</h1>
//           <p>
//             Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
//           </p>
//         </div>
//         <button
//           type="button"
//           className="counter"
//           onClick={() => setCount((count) => count + 1)}
//         >
//           Count is {count}
//         </button>
//       </section>

//       <div className="ticks"></div>

//       <section id="next-steps">
//         <div id="docs">
//           <svg className="icon" role="presentation" aria-hidden="true">
//             <use href="/icons.svg#documentation-icon"></use>
//           </svg>
//           <h2>Documentation</h2>
//           <p>Your questions, answered</p>
//           <ul>
//             <li>
//               <a href="https://vite.dev/" target="_blank">
//                 <img className="logo" src={viteLogo} alt="" />
//                 Explore Vite
//               </a>
//             </li>
//             <li>
//               <a href="https://react.dev/" target="_blank">
//                 <img className="button-icon" src={reactLogo} alt="" />
//                 Learn more
//               </a>
//             </li>
//           </ul>
//         </div>
//         <div id="social">
//           <svg className="icon" role="presentation" aria-hidden="true">
//             <use href="/icons.svg#social-icon"></use>
//           </svg>
//           <h2>Connect with us</h2>
//           <p>Join the Vite community</p>
//           <ul>
//             <li>
//               <a href="https://github.com/vitejs/vite" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#github-icon"></use>
//                 </svg>
//                 GitHub
//               </a>
//             </li>
//             <li>
//               <a href="https://chat.vite.dev/" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#discord-icon"></use>
//                 </svg>
//                 Discord
//               </a>
//             </li>
//             <li>
//               <a href="https://x.com/vite_js" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#x-icon"></use>
//                 </svg>
//                 X.com
//               </a>
//             </li>
//             <li>
//               <a href="https://bsky.app/profile/vite.dev" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#bluesky-icon"></use>
//                 </svg>
//                 Bluesky
//               </a>
//             </li>
//           </ul>
//         </div>
//       </section>

//       <div className="ticks"></div>
//       <section id="spacer"></section>
//     </>
//   )
// }

// export default App
